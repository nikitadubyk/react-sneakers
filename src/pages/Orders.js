import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { Helmet } from 'react-helmet';
import Card from '../components/Card';
import AppContext from '../components/context';

const Orders = () => {
    const { onAddToFavorite, onAddToCart } = useContext(AppContext);
    const [isLoading, setIsLoading] = useState(true);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        try {
            async function getOrders() {
                const { data } = await axios.get(
                    'https://6184d56923a2fe0017fff213.mockapi.io/orders'
                );
                setOrders(
                    data.reduce((prev, obj) => [...prev, ...obj.items], [])
                );
                setIsLoading(false);
            }

            getOrders();
        } catch (error) {
            alert('Не удалось получить заказы');
            console.log(error);
        }
        //eslint-disable-next-line
    }, []);

    return (
        <div className='content p-40'>
            <Helmet>
                <title>Мои заказы</title>
                <meta name='description' content='Мои заказы' />
            </Helmet>
            <div className='d-flex align-center justify-between mb-40'>
                <h1>Мои заказы</h1>
            </div>
            <div className='d-flex flex-wrap'>
                {(isLoading ? [...Array(8)] : orders).map((item, index) => (
                    <Card
                        key={index}
                        loading={isLoading}
                        onAddToCart={onAddToCart}
                        onAddToFavorite={onAddToFavorite}
                        {...item}
                    />
                ))}
            </div>
        </div>
    );
};

export default Orders;
