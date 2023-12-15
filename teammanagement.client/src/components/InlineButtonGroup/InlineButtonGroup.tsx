import "./InlineButtonGroup.scss";
import * as classNames from "classnames";
import { ReactNode } from "react";

type InlineButtonGroupProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

function InlineButtonGroup({
  children,
  id,
  className,
}: InlineButtonGroupProps) {
  return (
    <div id={id} className={classNames("inlineButtonGroup", className)}>
      {children}
    </div>
  );
}

export default InlineButtonGroup;
