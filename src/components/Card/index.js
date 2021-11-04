import { useState } from 'react';
import styles from './Card.module.scss';

const Card = ({ data }) => {
    const { title, imgUrl, price } = data;
    const [isAdded, setIsAdded] = useState(false);

    const onClickPlus = () => {
        setIsAdded(!isAdded);
    };

    return (
        <div className={styles.card}>
            <div className={styles.favorite}>
                <img src='/img/like.svg' alt='Like' />
            </div>
            <img width={133} height={112} src={imgUrl} alt='Sneakers' />
            <h5>{title}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>Цена:</span>
                    <b>{`${price} руб.`}</b>
                </div>
                <img onClick={onClickPlus} src='/img/plus.svg' alt='Plus' />
            </div>
        </div>
    );
};

export default Card;
