import { Link } from 'react-router-dom';

const Header = ({ onClickCart }) => {
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
                    <span>1205 руб.</span>
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
                <li>
                    <img
                        width={18}
                        height={18}
                        src='/img/user.svg'
                        alt='user'
                    />
                </li>
            </ul>
        </header>
    );
};

export default Header;
