import React, { useContext } from 'react';
import CartContext from '../../context/cart/CartContext';
import IconButton from '@material-ui/core/IconButton';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
	expand: {
		backgroundColor: '#f50057',
		fontSize: '1.2rem',
		color: '#fff',
		borderRadius: '20%',
		padding: '6px',

		'&:hover': {
			backgroundColor: '#f50057',
			color: '#fff',
			outline: 'none',
			border: 'none'
		},
		'&:focus': {
			backgroundColor: '#f50057',
			color: '#fff',
			outline: 'none',
			border: 'none'
		}
	}
}));

const CartItem = ({ product }) => {
	const { increase, decrease, removeProduct } = useContext(CartContext);
	const formatNumber = (number) => {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(number);
	};

	const classes = useStyles();
	return (
		<div className='row no-gutters py-2'>
			<div className='col-sm-2 p-2'>
				<img
					alt={product.name}
					style={{ margin: '0 auto', maxHeight: '50px' }}
					src={product.image}
					className='img-fluid d-block'
				/>
			</div>
			<div className='col-sm-4 p-2'>
				<h5 className='mb-1'>{product.name}</h5>
				<p className='mb-1'>Price: {formatNumber(product.price)} </p>
			</div>
			<div className='col-sm-2 p-2 text-center '>
				<p className='mb-0'>Qty: {product.quantity}</p>
			</div>
			<div className='col-sm-4 p-2 text-right'>
				{product.quantity > 1 && (
					<IconButton
						variant='outlined'
						color='secondary'
						onClick={() => decrease(product, false)}
						className={classes.expand}
						style={{
							marginRight: '0.5rem'
						}}
					>
						<RemoveIcon />
					</IconButton>
				)}

				{product.quantity === 1 && (
					<IconButton
						variant='outlined'
						color='secondary'
						onClick={() => removeProduct(product)}
						className={classes.expand}
						style={{
							marginRight: '0.5rem'
						}}
					>
						<DeleteIcon />
					</IconButton>
				)}

				<IconButton
					variant='outlined'
					color='secondary'
					onClick={() => {
						console.log(product);
						increase(product, false);
					}}
					className={classes.expand}
					// style={{
					// 	marginRight: '0.5rem'
					// }}
				>
					<AddIcon />
				</IconButton>
			</div>
		</div>
	);
};

export default CartItem;
