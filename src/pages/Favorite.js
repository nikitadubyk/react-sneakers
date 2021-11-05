import Card from '../components/Card';
import { Link } from 'react-router-dom';

const Favorite = ({ items, onAddToFavorite, onAddToCart }) => {
    return (
        <div className='content p-40'>
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

            <div className='d-flex flex-wrap'>
                {items.map((item, index) => (
                    <Card
                        key={index}
                        favorited={true}
                        onAddToFavorite={onAddToFavorite}
                        onAddToCart={onAddToCart}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Favorite;
