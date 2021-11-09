import { useState, useContext } from 'react';
import AppContext from '../context';
import ContentLoader from 'react-content-loader';
import styles from './Card.module.scss';

const Card = ({
    title,
    imgUrl,
    price,
    id,
    onAddToCart,
    onAddToFavorite,
    loading = false,
    favorited = false,
}) => {
    const { isItemAdded } = useContext(AppContext);
    const [isFavorite, setIsFavorite] = useState(favorited);

    const onClickFavorite = () => {
        onAddToFavorite({ id, title, imgUrl, price });
        setIsFavorite(!isFavorite);
    };

    const onClickPlus = () => {
        onAddToCart({ id, title, imgUrl, price });
    };

    return (
        <div className={styles.card}>
            {loading ? (
                <MyLoader />
            ) : (
                <>
                    <div className={styles.favorite}>
                        <img
                            src={
                                isFavorite
                                    ? '/img/like-active.svg'
                                    : '/img/like.svg'
                            }
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
                            className={styles.plus}
                            onClick={onClickPlus}
                            src={
                                isItemAdded(id)
                                    ? '/img/plus-active.png'
                                    : '/img/plus.svg'
                            }
                            alt='Plus'
                        />
                    </div>
                </>
            )}
        </div>
    );
};

const MyLoader = () => (
    <ContentLoader
        speed={1}
        width={210}
        height={230}
        viewBox='0 0 210 260'
        backgroundColor='#f2f2f2'
        foregroundColor='#e6e6e6'
    >
        <rect x='0' y='0' rx='10' ry='10' width='150' height='114' />
        <rect x='0' y='136' rx='0' ry='0' width='150' height='8' />
        <rect x='0' y='156' rx='0' ry='0' width='150' height='8' />
        <rect x='1' y='175' rx='0' ry='0' width='150' height='8' />
        <rect x='0' y='222' rx='0' ry='0' width='50' height='8' />
        <rect x='100' y='201' rx='9' ry='9' width='49' height='35' />
        <rect x='1' y='207' rx='0' ry='0' width='50' height='8' />
    </ContentLoader>
);

export default Card;
