import axios from 'axios';
import { useContext, useState } from 'react';
import AppContext from './context';
import Info from './Info';

function Drawer({ onRemove }) {
    const [isOrderComplite, setIsOrderComplite] = useState(false);
    const [orderId, setOrderId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const { onCloseCart, cartItems, setCartItems } = useContext(AppContext);

    const sendOrder = async () => {
        try {
            setIsLoading(true);
            const { data } = await axios.post(
                'https://6184d56923a2fe0017fff213.mockapi.io/orders',
                {
                    items: cartItems,
                }
            );
            setIsOrderComplite(true);
            setOrderId(data.orderId);
            setCartItems([]);

            for (let i = 0; i < cartItems.length; i++) {
                const item = cartItems[i];
                await axios.delete(
                    `https://6184d56923a2fe0017fff213.mockapi.io/cart/${item.id}`
                );
            }
        } catch (e) {
            console.log(e);
        }
        setIsLoading(false);
    };

    return (
        <div className='overlay'>
            <div className='drawer'>
                <h2 className='d-flex justify-between mb-30'>
                    Корзина{' '}
                    <img
                        className='cu-p'
                        src='/img/btn-remove.svg'
                        alt='Remove'
                        onClick={onCloseCart}
                    />
                </h2>

                {cartItems.length > 0 ? (
                    <div className='d-flex flex-column'>
                        <div className='items'>
                            {cartItems.map((items, index) => (
                                <div
                                    className='cartItem d-flex align-center mb-20'
                                    key={index}
                                >
                                    <div
                                        style={{
                                            backgroundImage: `url(${items.imgUrl})`,
                                        }}
                                        className='cartItemImg'
                                    ></div>

                                    <div className='mr-20 flex'>
                                        <p className='mb-5'>{items.title}</p>
                                        <b>{`${items.price} руб.`}</b>
                                    </div>
                                    <img
                                        className='removeBtn'
                                        src='/img/btn-remove.svg'
                                        alt='Remove'
                                        onClick={() => onRemove(items.id)}
                                    />
                                </div>
                            ))}
                        </div>

                        <div className='cartTotalBlock'>
                            <ul>
                                <li>
                                    <span>Итого:</span>
                                    <div></div>
                                    <b>21 498 руб. </b>
                                </li>
                                <li>
                                    <span>Налог 5%:</span>
                                    <div></div>
                                    <b>1074 руб. </b>
                                </li>
                            </ul>
                            <button
                                className='greenButton'
                                disabled={isLoading}
                                onClick={sendOrder}
                            >
                                Оформить заказ{' '}
                                <img src='/img/arrow.svg' alt='Arrow' />
                            </button>
                        </div>
                    </div>
                ) : (
                    <Info
                        title={
                            isOrderComplite
                                ? 'Заказ оформлен!'
                                : 'Корзина пустая'
                        }
                        description={
                            isOrderComplite
                                ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`
                                : 'Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ'
                        }
                        imgUrl={
                            isOrderComplite
                                ? '/img/order-complete.jpg'
                                : '/img/empty-cart.jpg'
                        }
                    />
                )}
            </div>
        </div>
    );
}

export default Drawer;
