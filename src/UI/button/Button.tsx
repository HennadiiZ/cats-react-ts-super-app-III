import React, { FC } from 'react';
import { ButtonProps } from '../../interfaces/interfaces';
import classes from './Button.module.scss';

const Button: FC<ButtonProps> = ({ label, onClick, type = 'button' }) => {
    return (
        <button className={classes.button} type={type} onClick={onClick}>
            {label}
        </button>
    );
};

export default Button;