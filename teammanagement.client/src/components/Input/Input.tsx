import classNames from "classnames";
import "./Input.scss";
import React from "react";
import _ from "lodash";

type InputProps = {
  labelText?: string | null;
  error?: Array<string> | null;
} & React.InputHTMLAttributes<HTMLInputElement>;

function Input({
  name,
  required,
  readOnly,
  labelText = null,
  error = null,
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
      />
      {error && <p className="description error">{_.join(error, "\n")}</p>}
    </div>
  );
}

export default Input;
