import './Input.scss';
import React from "react";

type InputProps = {
    labelText?: string | null
} & React.InputHTMLAttributes<HTMLInputElement>

function Input({name, required, labelText = null, ...props}: InputProps) {

    const label = labelText !== null && required === true ?  labelText.concat('*') : labelText;
    return (
        <div className='inputBlock'>
            {label !== null &&
                <label htmlFor={name}>{label}</label>
            }
            <input name={name} required={required} {...props}></input>
        </div>
    )
}

export default Input;