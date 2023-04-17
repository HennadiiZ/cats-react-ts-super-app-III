import React from 'react';
import classes from './Card.module.scss';
import { CardProps } from '../../interfaces/interfaces';

function Card(props: CardProps) {
    return (
        <div className={classes.card}>
            <div className={classes.card__image}>
                <img src={props.image} alt="A cat" />
            </div>
            <div className={classes.card__info}>
                <div>Name: {props.name}</div>
                <hr className={classes.card__divider} />
                <div className={classes.card__info_descr}>
                    Description: {props.description}
                </div>
            </div>
        </div>
    );
}

export default Card;