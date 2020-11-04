import Axios from 'axios';
import React, { useReducer } from 'react';
import { TokenService } from '../../services/storage.service';
import OrderContext from './OrderContext';
import { OrderReducer } from './OrderReducer';

const OrderState = ({ children }) => {
	const initialState = {
		orders: []
	};

	const [ state, dispatch ] = useReducer(OrderReducer, initialState);

	const confirmOrder = async (cart_id) => {
		var config = {
			method: 'post',
			url: 'http://127.0.0.1:8000/shopping_cart/order',
			headers: {
				Authorization: `Token ${TokenService.getToken()}`,
				'Content-Type': 'application/json'
			},
			data: { cart_id }
		};

		await Axios(config)
			.then(function(response) {
				console.log(response.data);
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	const getOrders = async () => {
		var config = {
			method: 'get',
			url: 'http://127.0.0.1:8000/shopping_cart/order',
			headers: {
				Authorization: `Token ${TokenService.getToken()}`,
				'Content-Type': 'application/json'
			}
		};

		await Axios(config)
			.then(function(response) {
				const payload = response.data.map((order) => {
					order.products = order.product_name;
					delete order.product_name;
					order.quantity = order.quantity.split(',').reduce(function(a, b) {
						return Number(a) + Number(b);
					}, 0);
					order.total = order.total;
					order.dateCreated = order.date_created;
					delete order.date_created;
					return order;
				});
				dispatch({ type: 'SET_ORDERS', payload });
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	const emptyOrderList = () => {
		dispatch({
			type: 'SET_ORDERS',
			payload: {
				products: '',
				quantity: '',
				total: '',
				dateCreated: ''
			}
		});
	};
	return (
		<OrderContext.Provider value={{ confirmOrder, getOrders, emptyOrderList, ...state }}>
			{children}
		</OrderContext.Provider>
	);
};

export default OrderState;
