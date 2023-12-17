import { useEffect, useState } from "react";
import "../AddNewMemberDialog/AddNewMemberDialog.scss";
import Button from "../Button/Button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogProps,
} from "../Dialog/Dialog";
import Input from "../Input/Input";
import Badge from "../Badge/Badge";
import EditableField from "../Input/EditableField";
import { TeamManagementState } from "../../store/store";
import { useSelector } from "react-redux";

type EditMemberDialogProps = { memberId: number } & Omit<
  DialogProps,
  "title" | "subtitle"
>;

function EditMemberDialog({
  memberId,
  open,
  closeDialog,
}: EditMemberDialogProps) {
  const memberData = useSelector((state: TeamManagementState) => {
    return state.membersData.find((member) => member.id === memberId);
  });

  const [editingField, setEditingField] = useState<string>("");

  useEffect(() => {}, [editingField]);

  const toTimeAndDate = (date: string) => {
    const parsedDate = Date.parse(date);
    const dateObj = new Date(parsedDate);
    const minutes =
      dateObj.getMinutes() < 10
        ? `0${dateObj.getMinutes()}`
        : dateObj.getMinutes().toLocaleString();

    return `${dateObj.getHours()}:${minutes} ${dateObj.toLocaleDateString()}`;
  };

  console.log(memberData?.avatarUrl);
  return (
    <>
      <Dialog
        open={open}
        title="Dodawanie nowego członka zespołu"
        closeDialog={closeDialog}
      >
        <DialogContent>
          <div className="form-grid edit">
            <div className="avatar-box">
              <div className="image">
                {memberData?.avatarUrl === null ? (
                  <img
                    className="avatar-placeholder"
                    src={"/avatar.jpeg"}
                    alt="avatar"
                  />
                ) : (
                  <img src={memberData?.avatarUrl} alt="avatar" />
                )}
              </div>
              <Badge variant={memberData?.isActive ? "success" : "danger"} />
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: 'center',
                height: 'fit-content'
              }}
            >
              <EditableField
                memberId={memberData?.id}
                labelText="Nazwa"
                name="name"
                value={memberData?.name}
                readOnly={editingField !== "name"}
                disabled={editingField !== "name" && editingField !== ""}
                updateEditingField={setEditingField}
                required={true}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: 'center',
                height: 'fit-content'
              }}
            >
              <EditableField
                memberId={memberData?.id}
                labelText="Adres e-mail"
                name="email"
                value={memberData?.email}
                readOnly={editingField !== "email"}
                disabled={editingField !== "email" && editingField !== ""}
                updateEditingField={setEditingField}
                required={true}
              />
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: 'center',
                height: 'fit-content'
              }}
            >
              <EditableField
                memberId={memberData?.id}
                labelText="Numer telefonu"
                name="phone"
                value={memberData?.phoneNumber}
                readOnly={editingField !== "phone"}
                disabled={editingField !== "phone" && editingField !== ""}
                updateEditingField={setEditingField}
                required={true}
              />
            </div>
            <div>
              <div>
                <Input
                  name="createdAt"
                  required
                  readOnly
                  labelText="Data utworzenia"
                  value={toTimeAndDate(memberData?.createdAt as string)}
                />
              </div>
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button
            variant="transparent"
            text="Zamknij"
            onClick={() => closeDialog()}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default EditMemberDialog;
