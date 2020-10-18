import React, { useContext, useState } from 'react';
import Product from './Product';
import Container from '@material-ui/core/Container';
import img from '../../assets/img-1.jpg';
import ProductContext from '../../context/product/ProductContext';
import { useEffect } from 'react';
import Axios from 'axios';

const PRODUCTS = [
	{
		id: '1',
		name: 'Item 1',
		price: '50',
		description: 'Fresh directly from farms to you.',
		stock: true,
		image: img
	},
	{
		id: '2',
		name: 'Item 2',
		price: '50',
		description: 'Fresh directly from farms to you.',
		stock: true,
		image: img
	}
];

const ProductList = () => {
	const { products } = useContext(ProductContext);

	return (
		<Container style={userStyle}>
			{products.map((product) => <Product key={product.id} product={product} />)}
		</Container>
	);
};

const userStyle = {
	display: 'grid',
	gridTemplateColumns: 'repeat(5,1fr)',
	gridGap: '3rem',
	marginTop: '30px'
	//   color: '#0000FF',
};

export default ProductList;
