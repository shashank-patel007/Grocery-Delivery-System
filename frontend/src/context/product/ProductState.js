import Axios from 'axios';
import React, { useReducer } from 'react';
import ProductContext from './ProductContext';
import { ProductReducer } from './ProductReducer';

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
			dispatch({ type: 'SET_PRODUCT', payload: response.data });
		});
	};

	const searchProducts = async () => {
		var config = {
			method: 'post',
			url: 'http://localhost:8000/product/search/',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				// category: 'Fruits'
				name: state.value
			}
		};
		await Axios(config).then((response) => {
			dispatch({ type: 'SET_PRODUCT', payload: response.data });
		});
	};

	const searchByCategory = async (category) => {
		var config = {
			method: 'post',
			url: 'http://localhost:8000/product/category/',
			headers: {
				'Content-Type': 'application/json'
			},
			data: {
				category
			}
		};
		await Axios(config).then((response) => {
			dispatch({ type: 'SET_PRODUCT', payload: response.data });
		});
	};

	return (
		<ProductContext.Provider value={{ getProducts, changeValue, searchProducts, searchByCategory, ...state }}>
			{children}
		</ProductContext.Provider>
	);
};

export default ProductState;
