import classNames from "classnames";
import "./Input.scss";
import React from "react";

type InputProps = {
  labelText?: string | null;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({
  name,
  required,
  readOnly,
  labelText = null,
  ...props
}: InputProps) {
  const label =
    labelText !== null && required === true && readOnly !== true
      ? labelText.concat("*")
      : labelText;
  return (
    <div
      className={classNames({ inputBlock: true, editable: readOnly !== true })}
    >
      {label !== null && <label htmlFor={name}>{label}</label>}
      <input
        readOnly={readOnly}
        disabled={readOnly}
        name={name}
        required={required}
        {...props}
      ></input>
    </div>
  );
}

export default Input;
