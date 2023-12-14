import './Button.scss';
import React, {ReactNode} from 'react';
import * as classNames from "classnames";

type ButtonProps = {
    variant: 'orange' | 'transparent' | 'gray';
    icon?: ReactNode;
    text: string;
    fit?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ text, icon, variant, fit, ...props}: ButtonProps) {
    return (
        <button
            {...props}
            className={classNames({
                'button': true,
                'orange': variant === 'orange',
                'transparent': variant === 'transparent',
                'gray': variant === 'gray',
                'fit': fit === true,
            })}>
            {icon !== null && icon}
            {text}
        </button>
    )
}

export default Button;