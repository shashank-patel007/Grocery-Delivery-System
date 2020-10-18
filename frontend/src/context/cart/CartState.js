import React, { useReducer } from 'react';

import { CartReducer, sumItems } from './CartReducer';
import CartContext from './CartContext';
import { SetUser, TokenService } from '../../services/storage.service';
import Axios from 'axios';

const CartState = ({ children }) => {
	var storage = [];
	if (SetUser.getUser()) {
		storage = localStorage.getItem(`CART-${SetUser.getUser().name}`)
			? JSON.parse(localStorage.getItem(`CART-${SetUser.getUser().name}`))
			: [];
	}
	const initialState = { cartItems: storage, ...sumItems(storage), checkout: false };
	const [ state, dispatch ] = useReducer(CartReducer, initialState);

	const findQuantity = (product) => {
		const item = state.cartItems.find((item) => item.id === product.id);
		return item.quantity;
	};

	const increase = async (payload) => {
		console.log(payload);
		var config = {
			method: 'post',
			url: 'http://127.0.0.1:8000/shopping_cart/',
			headers: {
				Authorization: 'Token ea92deec10c9eadd67db0d3c24450325ae3b2e2b',
				'Content-Type': 'application/json'
			},
			data: {
				product_id: payload.id,
				qty: findQuantity(payload) + 1
			}
		};

		await Axios(config).then((response) => {
			console.log(response.data);
		});
		dispatch({ type: 'INCREASE', payload });
	};

	const decrease = (payload) => {
		dispatch({ type: 'DECREASE', payload });
	};

	const addProduct = (payload) => {
		dispatch({ type: 'ADD_ITEM', payload });
	};

	const removeProduct = (payload) => {
		dispatch({ type: 'REMOVE_ITEM', payload });
	};

	const clearCart = () => {
		dispatch({ type: 'CLEAR' });
	};

	const removeCart = () => {
		dispatch({ type: 'REMOVE_CART' });
	};

	const handleCheckout = () => {
		console.log('CHECKOUT', state);
		dispatch({ type: 'CHECKOUT' });
	};

	const contextValues = {
		removeProduct,
		addProduct,
		increase,
		decrease,
		clearCart,
		handleCheckout,
		removeCart,
		// setCart,
		...state
	};
	return <CartContext.Provider value={contextValues}>{children}</CartContext.Provider>;
};

export default CartState;
