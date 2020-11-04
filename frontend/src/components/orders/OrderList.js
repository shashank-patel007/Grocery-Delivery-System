import React, { useContext } from 'react';
import Order from './Order';
import OrderContext from '../../context/order/OrderContext';

const OrderList = () => {
	const { orders } = useContext(OrderContext);

	return (
		<div className='container'>
			<div className='row'>
				{orders.length > 0 ? (
					orders.map((order, index) => <Order id={index} order={order} />)
				) : (
					<div
						className='p-3 text-center'
						style={{
							color: '#000',
							fontWeight: 'bolder',
							fontSize: '1.6rem',
							fontFamily: 'Courgette,cursive',
							display: 'block',
							margin: 'auto'
						}}
					>
						No orders to show.
					</div>
				)}
			</div>
		</div>
	);
};

export default OrderList;
