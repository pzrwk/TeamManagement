import './Input.scss';
import React from "react";

type InputProps = {
    labelText?: string | null
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({name, labelText = null, ...props}: InputProps) {
    return (
        <div>
            {labelText !== null &&
                <label htmlFor={name}>{labelText}</label>
            }
            <input name={name} {...props}></input>
        </div>
    )
}

export default Input;