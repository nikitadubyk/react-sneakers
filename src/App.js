import { useState } from 'react';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = [
    {
        title: 'Мужские Кроссовки Nike Blazer Mid Suede',
        imgUrl: '/img/sneakers/1.jpg',
        price: 12999,
    },
    {
        title: 'Мужские Кроссовки Nike Air Max 270',
        imgUrl: '/img/sneakers/2.jpg',
        price: 12999,
    },
    {
        title: 'Мужские Кроссовки Nike Blazer Mid Suede',
        imgUrl: '/img/sneakers/3.jpg',
        price: 8499,
    },
    {
        title: 'Кроссовки Puma X Aka Boku Future Rider',
        imgUrl: '/img/sneakers/4.jpg',
        price: 8999,
    },
    {
        title: 'Мужские Кроссовки Under Armour Curry 8',
        imgUrl: '/img/sneakers/5.jpg',
        price: 15199,
    },
    {
        title: 'Мужские Кроссовки Nike Kyrie 7',
        imgUrl: '/img/sneakers/6.jpg',
        price: 11299,
    },
    {
        title: 'Мужские Кроссовки Jordan Air Jordan 11',
        imgUrl: '/img/sneakers/7.jpg',
        price: 10799,
    },
    {
        title: 'Мужские Кроссовки Nike LeBron XVIII',
        imgUrl: '/img/sneakers/8.jpg',
        price: 16499,
    },
];

function App() {
    const [cartOpen, setCartOpen] = useState(false);

    return (
        <div className='wrapper clear'>
            {cartOpen && <Drawer onCloseCart={() => setCartOpen(false)} />}
            <Header
                onClickCart={() => {
                    setCartOpen(true);
                    console.log(cartOpen);
                }}
            />
            <div className='content p-40'>
                <h1 className='mb-40'>Все кроссовки</h1>
                <div className='d-flex flex-wrap'>
                    {arr.map(item => (
                        <Card data={item} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default App;
