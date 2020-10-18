import React, { useContext } from 'react';
import CartProducts from './CartProducts';
import { Link } from 'react-router-dom';
import CartContext from '../../context/cart/CartContext';

const Cart = () => {
	const { total, cartItems, itemCount, clearCart, checkout, handleCheckout } = useContext(CartContext);

	const formatNumber = (number) => {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(number);
	};
	return (
		<div className='container'>
			<div className='row no-gutters justify-content-center'>
				<div className='col-sm-9 p-3'>
					{cartItems.length > 0 ? (
						<CartProducts />
					) : (
						<div className='p-3 text-center text-muted'>Your cart is empty</div>
					)}

					{checkout && (
						<div className='p-3 text-center text-success'>
							<p>Checkout successfull</p>
							<Link to='/' className='btn btn-outline-success btn-sm'>
								BUY MORE
							</Link>
						</div>
					)}
				</div>
				{cartItems.length > 0 && (
					<div className='col-sm-3 p-3'>
						<div className='card card-body'>
							<p className='mb-1'>Total Items</p>
							<h4 className=' mb-3 txt-right'>{itemCount}</h4>
							<p className='mb-1'>Total Payment</p>
							<h3 className='m-0 txt-right'>{formatNumber(total)}</h3>
							<hr className='my-4' />
							<div className='text-center'>
								<button type='button' className='btn btn-primary mb-2' onClick={handleCheckout}>
									CHECKOUT
								</button>
								<button type='button' className='btn btn-outlineprimary btn-sm' onClick={clearCart}>
									CLEAR
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default Cart;
