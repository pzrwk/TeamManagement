import _ from "lodash";
import { MemberData } from "../../App";
import "./MembersTable.scss";
import React, { useState } from "react";
import Badge from "../Badge/Badge";
import IconButton from "../IconButton/IconButton";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import axios, { AxiosResponse } from "axios";
import { baseAPIUri } from "../../const";
import { useDialogOpen } from "../../hooks/hooks";
import EditMemberDialog from "../Dialog/EditMemberDialog";
import classNames from "classnames";
import Button from "../Button/Button";
import ConfirmationDialog from "../Dialog/ConfirmationDialog";
import { useDispatch, useSelector } from "react-redux";
import {
  Sort,
  TeamManagementState,
  sortMembers,
  updateMember,
} from "../../store/store";
import ArrowDownwardOutlinedIcon from "@mui/icons-material/ArrowDownwardOutlined";
import ArrowUpwardOutlinedIcon from "@mui/icons-material/ArrowUpwardOutlined";

type TableProps = React.TableHTMLAttributes<HTMLTableElement>;

const keys = [
  { name: "name", value: "Nazwa" },
  { name: "email", value: "Adres e-mail" },
  { name: "phoneNumber", value: "Numer telefonu" },
  { name: "isActive", value: "Status" },
  { name: "createdAt", value: "Data utworzenia" },
  { name: "action", value: "Akcja" },
];

function MembersTable({ ...props }: TableProps) {
  const [memberId, setMemberId] = useState<number>(-1);
  const [actionsVisible, setActionsVisible] = useState<boolean>(false);
  const [memberIdWithOpenTooltip, setMemberIdWithOpenTooltip] = useState<
  number | null
  >(null);
  const [confirmationDialogMessage, setConfirmationDialogMessage] =
    useState<string>("");
  
  const { isDialogOpen, openDialog, closeDialog } = useDialogOpen();
  const {
    isDialogOpen: isConfirmationDialogOpen,
    openDialog: openConfirmationDialog,
    closeDialog: closeConfirmationDialog,
  } = useDialogOpen();

  const dispatch = useDispatch();
  const data = useSelector((state: TeamManagementState) => state.membersData);
  const sorting: Sort = useSelector((state: TeamManagementState) => state.sort);
  
  const openEditDialog = (id: number) => {
    setMemberId(id);
    openDialog();
  };

  const showActions = (id: number) => {
    setMemberId(id);
    setActionsVisible((prevValue) => !prevValue);
    setMemberIdWithOpenTooltip(id);
  };

  const changeStatus = (id: number, status: boolean) => {
    axios
      .patch(`${baseAPIUri}/Member`, { id, isActive: !status })
      .then((res: AxiosResponse) => {
        dispatch(updateMember(res.data as MemberData));
        setActionsVisible(false);
        setConfirmationDialogMessage(
          `Członek zespołu został ${
            (res.data as MemberData).isActive == true
              ? "odblokowany"
              : "zablokowany"
          }`
        );
        openConfirmationDialog();
      })
      .catch((err: AxiosResponse) => {
        console.log(err);
      });
  };

  const showSortIcon = (order: "asc" | "desc") => {
    return order === "asc" ? (
      <ArrowUpwardOutlinedIcon
        style={{ fontSize: "16px", marginLeft: "4px" }}
      />
    ) : (
      <ArrowDownwardOutlinedIcon
        style={{ fontSize: "16px", marginLeft: "4px" }}
      />
    );
  };

  return (
    <>
      <table className="table" {...props}>
        <thead>
          <tr>
            {keys.map((key) => {
              return (
                <th
                  onClick={() => {
                    if (key.name === "action") return;
                    dispatch(sortMembers(key.name as keyof MemberData));
                  }}
                >
                  <div
                    className={classNames({
                      "align-items-center": true,
                      "justify-content-center": key.name === "action",
                    })}
                  >
                    {key.value}
                    {key.name === sorting.key && showSortIcon(sorting.order)}
                  </div>
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {_.isEmpty(data) && (
            <tr>
              <td colSpan={6}>
                <div className="empty-table">Brak danych</div>
              </td>
            </tr>
          )}
          {_.orderBy(data, sorting.key, sorting.order).map((member) => {
            return (
              <tr key={member.id}>
                <td onClick={() => openEditDialog(member.id)}>
                  <div className="align-items-center gap-8">
                    <img
                      className="avatar-small"
                      src={
                        member.avatarUrl !== null
                          ? member.avatarUrl
                          : "/avatar.jpeg"
                      }
                      alt="avatar"
                    />
                    {member.name}
                  </div>
                </td>
                <td onClick={() => openEditDialog(member.id)}>
                  {member.email}
                </td>
                <td onClick={() => openEditDialog(member.id)}>
                  {member.phoneNumber}
                </td>
                <td onClick={() => openEditDialog(member.id)}>
                  <Badge
                    variant={member.isActive === true ? "success" : "danger"}
                  />
                </td>
                <td
                  className="text-gray-600"
                  onClick={() => openEditDialog(member.id)}
                >
                  {new Date(Date.parse(member.createdAt)).toLocaleDateString()}
                </td>
                <td>
                  <div className="justify-content-center">
                    <IconButton
                      icon={<MoreVertOutlinedIcon />}
                      className="text-gray-600"
                      onClick={() => showActions(member.id)}
                    />
                  </div>
                  {actionsVisible && memberIdWithOpenTooltip === member.id && (
                    <div className={classNames("tooltip")}>
                      {member.isActive ? (
                        <Button
                          style={{ border: "none" }}
                          variant="transparent"
                          text="Zablokuj"
                          onClick={() =>
                            changeStatus(member.id, member.isActive)
                          }
                        />
                      ) : (
                        <Button
                          style={{ border: "none" }}
                          variant="transparent"
                          text="Odblokuj"
                          onClick={() =>
                            changeStatus(member.id, member.isActive)
                          }
                        />
                      )}
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {isDialogOpen && (
        <EditMemberDialog
          closeDialog={closeDialog}
          memberId={memberId}
          open={isDialogOpen}
          onClose={() => setMemberId(-1)}
        />
      )}
      {isConfirmationDialogOpen && (
        <ConfirmationDialog
          closeDialog={() => {
            setActionsVisible(false);
            setMemberIdWithOpenTooltip(null);
            closeConfirmationDialog();
          }}
          open={isConfirmationDialogOpen}
        >
          {confirmationDialogMessage}
        </ConfirmationDialog>
      )}
    </>
  );
}

export default MembersTable;
