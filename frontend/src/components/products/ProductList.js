import React, { useContext } from 'react';
import Product from './Product';
import Container from '@material-ui/core/Container';
import img from '../../assets/img-1.jpg';

const PRODUCTS = [
	{
		id: '1',
		name: 'Orange',
		price: '50',
		description: 'Fresh directly from farms to you.',
		stock: true,
		image: img
	},
	{
		id: '2',
		name: 'Orange',
		price: '50',
		description: 'Fresh directly from farms to you.',
		stock: true,
		image: img
	}
];

const ProductList = () => {
	return (
		<Container style={userStyle}>
			{PRODUCTS.map((product) => <Product key={product.id} product={product} />)}
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
