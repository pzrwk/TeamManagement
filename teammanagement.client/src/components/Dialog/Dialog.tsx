import React from "react";
import Button from "../Button/Button.tsx";
import AccessAlarmIcon from "@mui/icons-material/AccessAlarm";
import Badge from "../Badge/Badge.tsx";
import IconButton from "../IconButton/IconButton.tsx";
import CheckIcon from '@mui/icons-material/Check';
import Input from "../Input/Input.tsx";

type DialogProps = React.DialogHTMLAttributes<HTMLDialogElement>;

function Dialog({onClose, open}: DialogProps) {
    return (
        <dialog open={open} onClose={onClose}>
            Tekst
            <div style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '12px'
            }}>
                <Button variant='orange' icon={<AccessAlarmIcon />}>
                    Duparyba123
                </Button>
                <Button variant='transparent' icon={<AccessAlarmIcon />}>
                    Test123
                </Button>

                <Badge variant='danger' />
                <Badge variant='success' />

                <IconButton icon={<CheckIcon />} />
                <IconButton disabled icon={<CheckIcon />} />

                <Input labelText={'Duparyba123'}/>
            </div>
        </dialog>
    )
}

export default Dialog;
