import React, { createContext, useReducer } from 'react';
import { CartReducer, sumItems } from './CartReducer';

export const CartContext = createContext();

const storage = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };

const CartContextProvider = ({ children }) => {
	const [ state, dispatch ] = useReducer(CartReducer, initialState);

	const increase = (payload) => {
		dispatch({ type: 'INCREASE', payload });
	};

	const decrease = (payload) => {
		dispatch({ type: 'DECREASE', payload });
	};

	const addCartItem = (payload) => {
		dispatch({ type: 'ADD_ITEM', payload });
	};

	const deleteCartItem = (payload) => {
		dispatch({ type: 'REMOVE_ITEM', payload });
	};

	const clearCart = () => {
		dispatch({ type: 'CLEAR' });
	};

	const checkout = () => {
		console.log('CHECKOUT', state);
		dispatch({ type: 'CHECKOUT' });
	};

	const contextValues = {
		deleteCartItem,
		addCartItem,
		increase,
		decrease,
		clearCart,
		checkout,
		...state
	};

	return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>;
};

export default CartContextProvider;
