import classNames from 'classnames';
import './IconButton.scss';
import React, {ReactNode} from "react";

type IconButtonProps = {
    icon: ReactNode,
    disabled?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function IconButton({icon, className, disabled = false, ...props}: IconButtonProps) {
    return (
        <button className={classNames('iconButton', className)} disabled={disabled} {...props}>
            <span className={disabled ? 'disabled' : ''}>{icon}</span>
        </button>
    )
}

export default IconButton;