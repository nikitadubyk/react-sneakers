import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import Spinner from './components/Spinner';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorite from './pages/Favorite';

function App() {
    const [cartOpen, setCartOpen] = useState(false); // открыта/закрыта корзина
    const [search, setSearch] = useState(''); // поиск, строка
    const [items, setItems] = useState([]); // все кроссовки
    const [cartItems, setCartItems] = useState([]); // корзина, массив
    const [favorite, setFavorite] = useState([]); // фавориты, массив

    useEffect(() => {
        getAllSneakers();
        getFavoriteSneakers();
        getCartSneakers();
    }, []);

    const getAllSneakers = () => {
        axios
            .get('https://6184d56923a2fe0017fff213.mockapi.io/items')
            .then(res => setItems(res.data));
    };

    const getFavoriteSneakers = () => {
        axios
            .get('https://6184d56923a2fe0017fff213.mockapi.io/favorite')
            .then(res => setFavorite(res.data));
    };

    const getCartSneakers = () => {
        axios
            .get('https://6184d56923a2fe0017fff213.mockapi.io/cart')
            .then(res => setCartItems(res.data));
    };

    const onAddToCart = obj => {
        axios.post('https://6184d56923a2fe0017fff213.mockapi.io/cart', obj);
        setCartItems(state => [...state, obj]);
    };

    const searchItems = e => {
        setSearch(e.target.value);
    };

    const onAddToFavorite = async obj => {
        try {
            if (favorite.find(favObj => favObj.id === obj.id)) {
                axios.delete(
                    `https://6184d56923a2fe0017fff213.mockapi.io/favorite/${obj.id}`
                );
            } else {
                const { data } = await axios.post(
                    'https://6184d56923a2fe0017fff213.mockapi.io/favorite',
                    obj
                );
                setFavorite(prev => [...prev, data]);
            }
        } catch (error) {
            alert('Не удалось добавить в фавориты');
        }
    };

    const onRemoveItem = id => {
        axios.delete(`https://6184d56923a2fe0017fff213.mockapi.io/cart/${id}`);
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const loading = items.length === 0 ? <Spinner /> : null;

    return (
        <Router>
            <div className='wrapper clear'>
                {cartOpen && (
                    <Drawer
                        onCloseCart={() => setCartOpen(false)}
                        cartItems={cartItems}
                        onRemove={onRemoveItem}
                    />
                )}
                <Header
                    onClickCart={() => {
                        setCartOpen(true);
                    }}
                />
                <Routes>
                    <Route
                        exact
                        path='/'
                        element={
                            <Home
                                search={search}
                                setSearch={setSearch}
                                searchItems={searchItems}
                                loading={loading}
                                onAddToCart={onAddToCart}
                                onAddToFavorite={onAddToFavorite}
                                items={items}
                            />
                        }
                    />
                    <Route
                        exact
                        path='/favorite'
                        element={
                            <Favorite
                                items={favorite}
                                onAddToFavorite={onAddToFavorite}
                                onAddToCart={onAddToCart}
                            />
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
