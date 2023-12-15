import "./Dialog.scss";
import React, { ReactNode } from "react";
import IconButton from "../IconButton/IconButton.tsx";
import CloseIcon from "@mui/icons-material/Close";
import classNames from "classnames";

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
  const handleMaskClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      closeDialog();
    }
  };

  return (
    <div
      className={classNames("dialog-mask", { invisible: !open, visible: open })}
      onClick={handleMaskClick}
    >
      <dialog className="dialog" open={open} {...props}>
        <>
          <div className="dialog-header">
            <h2>{title}</h2>
            <IconButton icon={<CloseIcon />} onClick={closeDialog} />
          </div>
          {subtitle && <p className="description">{subtitle}</p>}
          {children}
        </>
      </dialog>
    </div>
  );
}

export function DialogContent({ children }: { children: ReactNode }) {
  return <div className="dialog-content">{children}</div>;
}

export function DialogFooter({ children }: { children: ReactNode }) {
  return <div className="dialog-footer">{children}</div>;
}
