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
import axios, { AxiosResponse } from "axios";
import { baseAPIUri } from "../../const";
import { MemberData } from "../../App";
import IconButton from "../IconButton/IconButton";
import Badge from "../Badge/Badge";

type EditMemberDialogProps = { memberId: number } & Omit<
  DialogProps,
  "title" | "subtitle"
>;

function EditMemberDialog({
  memberId,
  open,
  closeDialog,
}: EditMemberDialogProps) {
  const [memberData, setMemberData] = useState<MemberData | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setMemberData((prevData) => {
      return { ...prevData, [name]: value };
    });
  };

  useEffect(() => {
    axios
      .get(`${baseAPIUri}/Member/${memberId}`)
      .then((res: AxiosResponse) => setMemberData(res.data));
  }, []);

  return (
    <>
      <Dialog
        open={open}
        title="Dodawanie nowego członka zespołu"
        closeDialog={closeDialog}
      >
        <DialogContent>
          <div className="form-grid">
            <div className="avatar-box">
              <div className="image">TEST</div>
              <Badge variant={memberData?.isActive ? "success" : "danger"} />
            </div>
            <div>
              <Input
                name="name"
                required
                labelText="Nazwa"
                value={memberData?.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                type="email"
                name="email"
                required
                labelText="Adres e-mail"
                value={memberData?.email}
                onChange={handleChange}
              />
              {/* <IconButton /> */}
            </div>
            <div>
              <Input
                type="phone"
                name="phone"
                required
                labelText="Numer telefonu"
                value={memberData?.phoneNumber}
                onChange={handleChange}
              />
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
