import { Link } from 'react-router-dom';
import { useCart } from '../hooks/useCart';

const Header = ({ onClickCart }) => {
    const { totalPrice } = useCart();

    return (
        <header className='d-flex justify-between align-center p-40'>
            <Link to='/'>
                <div className='d-flex align-center'>
                    <img
                        width={40}
                        height={40}
                        src='/img/logo.png'
                        alt='logo'
                    />
                    <div>
                        <h3 className='text-uppercase'>React Sneakers</h3>
                        <p className='opacity-5'>Магазин лучших кроссовок</p>
                    </div>
                </div>
            </Link>
            <ul className='d-flex'>
                <li className='mr-30 cart' onClick={onClickCart}>
                    <img
                        width={18}
                        height={18}
                        src='/img/cart.svg'
                        alt='cart'
                    />
                    <span>{totalPrice} руб.</span>
                </li>
                <Link to='/favorite'>
                    <li className='mr-20 cart'>
                        <img
                            width={18}
                            height={18}
                            src='/img/heart.svg'
                            alt='heart'
                        />
                    </li>
                </Link>
                <Link to='/orders'>
                    <img
                        width={18}
                        height={18}
                        src='/img/user.svg'
                        alt='user'
                    />
                </Link>
            </ul>
        </header>
    );
};

export default Header;
