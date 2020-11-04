import React, { useReducer } from 'react';
import OrderContext from './OrderContext';

const OrderState = ({ children }) => {
	const initialState = {
		name: '',
		orders: {
			products: [],
			quantity: '',
			total: ''
		}
	};

	const [ state, dispatch ] = useReducer(ProductReducer, initialState);

	return <OrderContext.Provider>{children}</OrderContext.Provider>;
};

export default OrderState;
