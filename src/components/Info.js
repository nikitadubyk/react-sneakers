import React from 'react';
import { useContext } from 'react';
import AppContext from './context';

const Info = ({
    title,
    description,
    imgUrl,
    width = '120px',
    height = '120px',
    button = 'true',
}) => {
    const { onCloseCart } = useContext(AppContext);

    return (
        <div className='cartEmpty d-flex align-center justify-center flex-column flex'>
            <img
                className='mb-20'
                width={width}
                height={height}
                src={imgUrl}
                alt='Empty'
            />
            <h2>{title}</h2>
            <p className='opacity-6'>{description}</p>
            {button === 'true' && (
                <button onClick={onCloseCart} className='greenButton'>
                    <img src='/img/arrow.svg' alt='Arrow' />
                    Вернуться назад
                </button>
            )}
        </div>
    );
};

export default Info;
