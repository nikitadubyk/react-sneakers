import { useContext } from 'react';
import AppContext from '../components/context';

export const useCart = () => {
    const { cartItems, setCartItems } = useContext(AppContext);
    const totalPrice = cartItems.reduce((sum, obj) => obj.price + sum, 0);

    return { cartItems, totalPrice, setCartItems };
};
