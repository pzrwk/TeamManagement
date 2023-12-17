import classNames from "classnames";
import "./Badge.scss";

type BadgeProps = {
  variant: "success" | "danger";
};

function Badge({ variant }: BadgeProps) {
  const message: string = variant === "success" ? "Aktywny" : "Blokada";
  
  return <span className={classNames("badge", variant)}>{message}</span>;
}

export default Badge;
