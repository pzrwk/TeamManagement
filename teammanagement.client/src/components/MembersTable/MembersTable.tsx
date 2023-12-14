import _ from "lodash";
import { MemberData } from "../../App";
import "./MembersTable.scss";
import React, { useState } from "react";
import Badge from "../Badge/Badge";
import IconButton from "../IconButton/IconButton";
import MoreVertOutlinedIcon from "@mui/icons-material/MoreVertOutlined";
import axios from "axios";
import { baseAPIUri } from "../../const";
import { useDialogOpen } from "../../hooks/hooks";
import EditMemberDialog from "../EditMemberDialog/EditMemberDialog";
import classNames from "classnames";
import Button from "../Button/Button";

type TableProps = {
  data: Array<MemberData>;
  text?: string;
} & React.TableHTMLAttributes<HTMLTableElement>;

function MembersTable({ data, text, ...props }: TableProps) {
  const { isDialogOpen, openDialog, closeDialog } = useDialogOpen();
  const [memberId, setMemberId] = useState<number>(-1);
  const [actionsVisible, setActionsVisible] = useState<boolean>(false);
  const [memberIdWithOpenTooltip, setMemberIdWithOpenTooltip] = useState<number | null>(null);

  const keys = [
    "Nazwa",
    "Adres e-mail",
    "Numer telefonu",
    "Status",
    "Data utworzenia",
    "Akcje",
  ];

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
    axios.patch(`${baseAPIUri}/Member`, {id, isActive: !status})
  }

  return (
    <>
      <table className="table" {...props}>
        <thead>
          <tr>
            {keys.map((key) => {
              return <th>{key}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {_.orderBy(data, 'isActive', 'desc').map((member) => {
            return (
              <tr key={member.id}>
                <td onClick={() => openEditDialog(member.id)}>{member.name}</td>
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
                <td className="justify-content-center">
                  <IconButton
                    icon={<MoreVertOutlinedIcon />}
                    className="text-gray-600"
                    onClick={() => showActions(member.id)}
                  />
                  {actionsVisible && memberIdWithOpenTooltip === member.id && (
                    <div className={classNames("tooltip")}>
                      {member.isActive ? (
                        <Button
                          style={{ border: "none" }}
                          variant="transparent"
                          text="Zablokuj"
                          onClick={() => changeStatus(member.id, member.isActive)}
                        />
                      ) : (
                        <Button
                          style={{ border: "none" }}
                          variant="transparent"
                          text="Odblokuj"
                          onClick={() => changeStatus(member.id, member.isActive)}
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
    </>
  );
}

export default MembersTable;
