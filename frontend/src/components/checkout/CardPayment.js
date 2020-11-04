import React, { useMemo } from 'react';
import { useStripe, useElements, CardNumberElement, CardCvcElement, CardExpiryElement } from '@stripe/react-stripe-js';

import useResponsiveFontSize from './useResponsiveFontSize';

const useOptions = () => {
	const fontSize = useResponsiveFontSize();
	const options = useMemo(
		() => ({
			style: {
				base: {
					fontSize,
					color: '#424770',
					letterSpacing: '0.025em',
					fontFamily: 'Source Code Pro, monospace',
					'::placeholder': {
						color: '#aab7c4'
					}
				},
				invalid: {
					color: '#9e2146'
				}
			}
		}),
		[ fontSize ]
	);

	return options;
};

const CardPayment = () => {
	const stripe = useStripe();
	const elements = useElements();
	const options = useOptions();

	const handleSubmit = async (event) => {
		event.preventDefault();

		if (!stripe || !elements) {
			// Stripe.js has not loaded yet. Make sure to disable
			// form submission until Stripe.js has loaded.
			return;
		}

		const payload = await stripe.createPaymentMethod({
			type: 'card',
			card: elements.getElement(CardNumberElement)
		});
		console.log('[PaymentMethod]', payload);
	};

	return (
		<div onSubmit={handleSubmit} className='checkoutForm'>
			<label>
				<span>
					Card number
					<CardNumberElement options={options} />
				</span>
			</label>
			<label style={{ display: 'inline-block', width: '40%', marginRight: '20%' }}>
				<span>Expiration date</span>
				<CardExpiryElement options={options} />
			</label>
			<label style={{ display: 'inline-block', width: '40%' }}>
				<span>CVC</span>
				<CardCvcElement options={options} />
			</label>
		</div>
	);
};

export default CardPayment;
