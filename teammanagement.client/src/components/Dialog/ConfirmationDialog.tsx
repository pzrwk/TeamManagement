import "./ConfirmationDialog.scss";
import Button from "../Button/Button";
import { Dialog, DialogFooter, DialogProps } from "./Dialog";
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined";

type ConfirmationDialogProps = Omit<DialogProps, "title" | "subtitle">;

function ConfirmationDialog({
  children,
  open,
  closeDialog,
  ...props
}: ConfirmationDialogProps) {
  return (
    <Dialog
      open={open}
      title="Potwierdzenie"
      closeDialog={closeDialog}
      {...props}
    >
      <div className="confirmation-text-icon">
        <CheckCircleOutlinedIcon />
        {children}
      </div>
      <DialogFooter>
        <Button variant="orange" text="Ukryj" onClick={closeDialog} />
      </DialogFooter>
    </Dialog>
  );
}

export default ConfirmationDialog;
