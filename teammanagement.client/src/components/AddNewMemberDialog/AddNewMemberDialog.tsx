import "./AddNewMemberDialog.scss";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogProps,
} from "../Dialog/Dialog.tsx";
import Button from "../Button/Button.tsx";
import DownloadingOutlinedIcon from "@mui/icons-material/DownloadingOutlined";
import Input from "../Input/Input.tsx";
import { useImportMember, useSubmitData } from "../../hooks/hooks.ts";
import classNames from "classnames";

type AddNewMemberDialogProps = Omit<DialogProps, "title" | "subtitle">;

export type CreateMemberData = {
  name: string;
  email: string;
  phoneNumber: string;
  avatarUrl: string | null;
};

type Result = {
  name: {
    first: string;
    last: string;
  };
  email: string;
  phone: string;
  picture: {
    large: string;
  };
};

export type IncomingMemberData = {
  results: Array<Result>;
};

function AddNewMemberDialog({ open, closeDialog }: AddNewMemberDialogProps) {
  const { data, setData, fetchData } = useImportMember();
  const { submitData } = useSubmitData();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setData((prevData) => ({ ...prevData, [name]: value }));
  };

  return (
    <>
      <Dialog
        open={open}
        title="Dodawanie nowego członka zespołu"
        subtitle="Wypełnij wszystkie pola poniżej lub pobierz z internetu"
        closeDialog={closeDialog}
      >
        <DialogContent>
          <Button
            variant="gray"
            text="Wypełnij formularz automatycznie"
            icon={<DownloadingOutlinedIcon />}
            onClick={fetchData}
          />
          <p className="warning-text">
            Uwaga! Wszystkie pola formularza zostaną nadpisane danymi z
            internetu.{" "}
          </p>
          <div className="form-grid">
            <div className="avatar-box">
              <div
                className={classNames({
                  image: true,
                  "avatar-placeholder": data.avatarUrl === null,
                })}
              >
                {data.avatarUrl === null ? (
                  <>
                    <img src={"/avatar.jpeg"} alt="avatar" />
                    <p className="description">Wybierz awatar</p>
                  </>
                ) : (
                  <img src={data.avatarUrl} alt="avatar" />
                )}
              </div>
            </div>
            <div>
              <Input
                name="name"
                required
                labelText="Nazwa"
                value={data.name}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                type="email"
                name="email"
                required
                labelText="Adres e-mail"
                value={data.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                type="phone"
                name="phone"
                required
                labelText="Numer telefonu"
                value={data.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </DialogContent>
        <DialogFooter>
          <Button
            variant="transparent"
            text="Anuluj"
            onClick={() => closeDialog()}
          />
          <Button
            type="submit"
            variant="orange"
            text="Potwierdź"
            onClick={() => submitData(data)}
          />
        </DialogFooter>
      </Dialog>
    </>
  );
}

export default AddNewMemberDialog;
