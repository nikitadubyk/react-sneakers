import { useContext } from 'react';
import { Helmet } from 'react-helmet';
import Card from '../components/Card';
import { Link } from 'react-router-dom';
import AppContext from '../components/context';
import Info from '../components/Info';

const Favorite = () => {
    const { favorite, onAddToFavorite, onAddToCart } = useContext(AppContext);
    return (
        <div className='content p-40'>
            <Helmet>
                <title>Закладки</title>
                <meta name='description' content='Закладки' />
            </Helmet>
            <div className='d-flex align-center mb-40'>
                <Link to='/'>
                    <img
                        src='/img/back-arrow.svg'
                        alt='back arrow'
                        className='mr-20'
                    />{' '}
                </Link>
                <h1>Мои закладки</h1>
            </div>

            {favorite.length > 0 ? (
                <div className='d-flex flex-wrap'>
                    {favorite.map((item, index) => (
                        <Card
                            key={index}
                            favorited={true}
                            onAddToFavorite={onAddToFavorite}
                            onAddToCart={onAddToCart}
                            {...item}
                        />
                    ))}
                </div>
            ) : (
                <Info
                    imgUrl='/img/sad-smile.png'
                    title='Закладок нет :('
                    description='Вы ничего не добавляли в закладки'
                    width='70px'
                    height='70px'
                    button='false'
                />
            )}
        </div>
    );
};

export default Favorite;
