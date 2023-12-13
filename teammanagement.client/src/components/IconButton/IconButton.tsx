import './IconButton.scss';
import React, {ReactNode} from "react";

type IconButtonProps = {
    icon: ReactNode,
    disabled?: boolean
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

function IconButton({icon, disabled = false, ...props}: IconButtonProps) {
    return (
        <button className={'iconButton'} disabled={disabled} {...props}>
            <span className={disabled ? 'disabled' : ''}>{icon}</span>
        </button>
    )
}

export default IconButton;