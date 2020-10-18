import Axios from 'axios';
import React, { useReducer } from 'react';
import ProductContext from './ProductContext';
import { ProductReducer } from './ProductReducer';
// import { dummyProducts } from '../services/dummy';

const ProductState = ({ children }) => {
	const initialState = {
		products: [],
		value: ''
	};

	const [ state, dispatch ] = useReducer(ProductReducer, initialState);

	const changeValue = (txt) => {
		dispatch({ type: 'SET_VALUE', payload: txt });
	};

	const getProducts = async () => {
		var config = {
			method: 'get',
			url: 'http://127.0.0.1:8000/product',
			headers: {
				'Content-Type': 'application/json'
			}
		};
		await Axios(config).then((response) => {
			console.log(response.data);
			dispatch({ type: 'SET_PRODUCT', payload: response.data });
		});
	};

	return <ProductContext.Provider value={{ getProducts, changeValue, ...state }}>{children}</ProductContext.Provider>;
};

export default ProductState;
