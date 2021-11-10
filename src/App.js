import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import axios from 'axios';
import AppContext from './components/context';

import Header from './components/Header';
import Drawer from './components/Drawer/';
import Home from './pages/Home';
import Favorite from './pages/Favorite';
import Orders from './pages/Orders';

function App() {
    const [cartOpen, setCartOpen] = useState(false); // открыта/закрыта корзина
    const [search, setSearch] = useState(''); // поиск, строка
    const [items, setItems] = useState([]); // все кроссовки
    const [cartItems, setCartItems] = useState([]); // корзина, массив
    const [favorite, setFavorite] = useState([]); // фавориты, массив
    const [isLoading, setIsLoading] = useState(true); // загрузка товаров

    useEffect(() => {
        async function fetchData() {
            try {
                const [favoriteResponse, cartResponse, itemsResponse] =
                    await Promise.all([
                        axios.get(
                            'https://6184d56923a2fe0017fff213.mockapi.io/favorite'
                        ),
                        axios.get(
                            'https://6184d56923a2fe0017fff213.mockapi.io/cart'
                        ),
                        axios.get(
                            'https://6184d56923a2fe0017fff213.mockapi.io/items'
                        ),
                    ]);
                setIsLoading(false);

                setFavorite(favoriteResponse.data);
                setCartItems(cartResponse.data);
                setItems(itemsResponse.data);
            } catch (e) {
                alert('Произошла ошибка при получении данных');
                console.log(e);
            }
        }

        fetchData();
    }, []);

    const onAddToCart = async obj => {
        try {
            const findItem = cartItems.find(
                item => Number(item.parentId) === Number(obj.id)
            );
            if (findItem) {
                axios.delete(
                    `https://6184d56923a2fe0017fff213.mockapi.io/cart/${findItem.id}`
                );
                setCartItems(prev =>
                    prev.filter(
                        item => Number(item.parentId) !== Number(obj.id)
                    )
                );
            } else {
                setCartItems(prev => [...prev, obj]);
                const { data } = await axios.post(
                    'https://60d62397943aa60017768e77.mockapi.io/cart',
                    obj
                );
                setCartItems(prev =>
                    prev.map(item => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }
                        return item;
                    })
                );
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
                setFavorite(prev =>
                    prev.filter(item => Number(item.id) !== Number(obj.id))
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
        setCartItems(prev =>
            prev.filter(item => Number(item.id) !== Number(id))
        );
    };

    const onCloseCart = () => {
        setCartOpen(false);
    };

    const isItemAdded = id => {
        return cartItems.some(obj => Number(obj.parentId) === Number(id));
    };

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                setCartItems,
                favorite,
                isItemAdded,
                onAddToFavorite,
                onAddToCart,
                onCloseCart,
            }}
        >
            <Router>
                <div className='wrapper clear'>
                    <Drawer onRemove={onRemoveItem} cartOpen={cartOpen} />
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
                        <Route exact path='/favorite' element={<Favorite />} />
                        <Route exect path='/orders' element={<Orders />} />
                    </Routes>
                </div>
            </Router>
        </AppContext.Provider>
    );
}

export default App;
