import { useState } from 'react';
import styles from './Card.module.scss';

const Card = ({ data, onAddToCart }) => {
    const { title, imgUrl, price, key } = data;
    const [isAdded, setIsAdded] = useState(false);
    const [isFavorite, setIsFavorite] = useState(false);

    const onClickFavorite = () => {
        setIsFavorite(!isFavorite);
    };

    const onClickPlus = () => {
        onAddToCart({ title, imgUrl, price });
        setIsAdded(!isAdded);
    };

    return (
        <div className={styles.card}>
            <div className={styles.favorite} key={key}>
                <img
                    src={isFavorite ? '/img/like-active.svg' : '/img/like.svg'}
                    alt='Like'
                    onClick={onClickFavorite}
                />
            </div>
            <img width={133} height={112} src={imgUrl} alt='Sneakers' />
            <h5>{title}</h5>
            <div className='d-flex justify-between align-center'>
                <div className='d-flex flex-column'>
                    <span>Цена:</span>
                    <b>{`${price} руб.`}</b>
                </div>
                <img
                    onClick={onClickPlus}
                    src={isAdded ? '/img/plus-active.png' : '/img/plus.svg'}
                    alt='Plus'
                />
            </div>
        </div>
    );
};

export default Card;
