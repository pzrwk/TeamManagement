import "./Dialog.scss";
import React, { ReactNode } from "react";
import Button from "../Button/Button.tsx";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Badge from "../Badge/Badge.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import CheckIcon from "@mui/icons-material/Check";
import Input from "../Input/Input.tsx";
import CloseIcon from "@mui/icons-material/Close";

export type DialogProps = {
  title: string;
  subtitle?: string | null;
  closeDialog: () => void;
} & React.DialogHTMLAttributes<HTMLDialogElement>;

export function Dialog({
  title,
  subtitle,
  closeDialog,
  open,
  children,
  ...props
}: DialogProps) {
  return (
    <div className="dialog-mask">
      <dialog className="dialog" open={open} {...props}>
        <DialogHeader
          title={title}
          subtitle={subtitle}
          closeDialog={closeDialog}
        />
        {children}
      </dialog>
    </div>
  );
}

export function DialogHeader({
  title,
  subtitle,
  closeDialog,
}: {
  title: string;
  subtitle?: string | null;
  closeDialog: () => void;
}) {
  return (
    <>
      <div className="dialog-header">
        <h2>{title}</h2>
        <IconButton icon={<CloseIcon />} onClick={() => closeDialog()} />
      </div>
      {subtitle !== null && subtitle !== '' && subtitle !== undefined && <p className="description">{subtitle}</p>}
    </>
  );
}

export function DialogContent({ children }: { children: ReactNode }) {
  return <div className="dialog-content">{children}</div>;
}

export function DialogFooter({ children }: { children: ReactNode }) {
  return <div className="dialog-footer">{children}</div>;
}
