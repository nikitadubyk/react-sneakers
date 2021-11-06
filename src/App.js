import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
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
    const [isLoading, setIsLoading] = useState(true); // загрузка товаров

    useEffect(() => {
        async function fetchData() {
            const favoriteResponse = await axios.get(
                'https://6184d56923a2fe0017fff213.mockapi.io/favorite'
            );
            const cartResponse = await axios.get(
                'https://6184d56923a2fe0017fff213.mockapi.io/cart'
            );
            const itemsResponse = await axios.get(
                'https://6184d56923a2fe0017fff213.mockapi.io/items'
            );

            setIsLoading(false);

            setFavorite(favoriteResponse.data);
            setCartItems(cartResponse.data);
            setItems(itemsResponse.data);
        }

        fetchData();
    }, []);

    const onAddToCart = obj => {
        try {
            if (cartItems.find(item => Number(item.id) === Number(obj.id))) {
                axios.delete(
                    `https://6184d56923a2fe0017fff213.mockapi.io/cart/${obj.id}`
                );
                setCartItems(prev =>
                    prev.filter(item => Number(item.id) !== Number(obj.id))
                );
            } else {
                axios.post(
                    'https://6184d56923a2fe0017fff213.mockapi.io/cart',
                    obj
                );
                setCartItems(state => [...state, obj]);
            }
        } catch (error) {
            alert('Не получилось добавить товар');
        }
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
                                isLoading={isLoading}
                                cartItems={cartItems}
                                search={search}
                                setSearch={setSearch}
                                searchItems={searchItems}
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
