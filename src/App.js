import { useState, useEffect } from 'react';
import Spinner from './components/Spinner';
import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

function App() {
    const [cartOpen, setCartOpen] = useState(false);
    const [search, setSearch] = useState('');
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        request();
    }, []);

    async function request() {
        await fetch('https://6184d56923a2fe0017fff213.mockapi.io/items')
            .then(res => res.json())
            .then(json => setItems(json))
            .catch(error => console.log(error));
    }

    function onAddToCart(obj) {
        setCartItems(state => [...state, obj]);
        console.log(cartItems);
    }

    function searchItems(e) {
        setSearch(e.target.value);
    }

    const loading = items.length === 0 ? <Spinner /> : null;

    return (
        <div className='wrapper clear'>
            {cartOpen && (
                <Drawer
                    onCloseCart={() => setCartOpen(false)}
                    cartItems={cartItems}
                />
            )}
            <Header
                onClickCart={() => {
                    setCartOpen(true);
                }}
            />
            <div className='content p-40'>
                <div className='d-flex align-center justify-between mb-40'>
                    <h1 className='mb-40'>Все кроссовки</h1>
                    <div className='search-block d-flex'>
                        <img src='/img/search.svg' alt='Search' />
                        {search && (
                            <img
                                className='clear cu-p'
                                src='/img/btn-remove.svg'
                                alt='Clear'
                                onClick={() => setSearch('')}
                            />
                        )}
                        <input
                            placeholder='Поиск...'
                            onChange={searchItems}
                            value={search}
                        />
                    </div>
                </div>
                <div className='d-flex flex-wrap'>
                    {loading}
                    {items
                        .filter(item =>
                            item.title
                                .toLowerCase()
                                .includes(search.toLowerCase())
                        )
                        .map((item, index) => (
                            <Card
                                data={item}
                                onAddToCart={onAddToCart}
                                key={index}
                            />
                        ))}
                </div>
            </div>
        </div>
    );
}

export default App;
