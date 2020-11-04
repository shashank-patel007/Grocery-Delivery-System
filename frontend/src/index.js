import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { transitions, positions, Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const options = {
	// you can also just use 'bottom center'
	position: positions.TOP_CENTER,
	timeout: 3000,
	offset: '30px',
	// you can also just use 'scale'
	transition: transitions.SCALE
};
const stripePromise = loadStripe('pk_test_6pRNASCoBOKtIshFeQd4XMUh');

ReactDOM.render(
	<React.StrictMode>
		<AlertProvider template={AlertTemplate} {...options}>
			<Elements stripe={stripePromise}>
				<App />
			</Elements>
		</AlertProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
