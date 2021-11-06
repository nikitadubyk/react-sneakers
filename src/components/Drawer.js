function Drawer({ onCloseCart, cartItems = [], onRemove }) {
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
                    <div>
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
                            <button className='greenButton'>
                                Оформить заказ{' '}
                                <img src='/img/arrow.svg' alt='Arrow' />
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
                        <img
                            className='mb-20'
                            width='120px'
                            height='120px'
                            src='/img/empty-cart.jpg'
                            alt='Empty'
                        />
                        <h2>Корзина пустая</h2>
                        <p className='opacity-6'>
                            Добавьте хотя бы одну пару кроссовок, чтобы сделать
                            заказ.
                        </p>
                        <button onClick={onCloseCart} className='greenButton'>
                            <img src='/img/arrow.svg' alt='Arrow' />
                            Вернуться назад
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default Drawer;
