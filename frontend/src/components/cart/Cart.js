import React, { useContext } from 'react';
import CartProducts from './CartProducts';
import { Link } from 'react-router-dom';
import CartContext from '../../context/cart/CartContext';

const Cart = () => {
	const { total, cartItems } = useContext(CartContext);

	const formatNumber = (number) => {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(number);
	};

	const findCount = () => {
		let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
		return itemCount;
	};
	return (
		<div className='container-md'>
			<div className='row no-gutters justify-content-center'>
				<div className='col-sm-9 p-3'>
					{cartItems.length > 0 ? (
						<CartProducts />
					) : (
						<div
							className='text-center'
							style={{
								color: '#000',
								fontWeight: 'bolder',
								fontSize: '1.6rem',
								fontFamily: 'Courgette,cursive'
							}}
						>
							Your cart is empty
						</div>
					)}
				</div>
				{cartItems.length > 0 && (
					<div className='col-sm-3 p-3'>
						<div className='card card-body'>
							<p className='mb-1'>Total Items</p>
							<h4 className=' mb-3 txt-right'>{findCount()}</h4>
							<p className='mb-1'>Total Payment</p>
							<h3 className='m-0 txt-right'>{formatNumber(total)}</h3>
							<hr className='my-4' />
							<div className='text-center'>
								<Link to='/checkout'>
									<button
										type='button'
										className='btn mb-2'
										style={{ backgroundColor: '#A71D31', color: '#fff' }}
									>
										CHECKOUT
									</button>
								</Link>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
