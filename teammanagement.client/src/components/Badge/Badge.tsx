import './Badge.scss';

type BadgeProps = {
    variant: 'success' | 'danger'
}

function Badge({variant}: BadgeProps) {
    const message : string = variant === 'success' ? 'Aktywny' : 'Blokada';
    return (
        <span className={variant}>
            {message}
        </span>
    )
}

export default Badge;