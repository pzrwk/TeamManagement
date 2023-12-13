import './Button.scss';
import React, {ReactNode} from 'react';
import * as classNames from "classnames";

type ButtonProps = {
    variant: 'orange' | 'transparent';
    icon?: ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, icon, variant, ...props}: ButtonProps) {
    return (
        <button {...props} className={classNames('button', variant === 'orange' ? 'orange' : 'transparent')}>
            {icon !== null && icon}
            {children}
        </button>
    )
}

export default Button;