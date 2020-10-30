import React, { useContext, useState } from 'react';
import Product from './Product';
import Container from '@material-ui/core/Container';
import ProductContext from '../../context/product/ProductContext';

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
