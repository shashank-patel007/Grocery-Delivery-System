import React, { Fragment, useContext, useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import CartContext from '../../context/cart/CartContext';
import PersonIcon from '@material-ui/icons/Person';
import InputAdornment from '@material-ui/core/InputAdornment';
import MenuItem from '@material-ui/core/MenuItem';
import EmailIcon from '@material-ui/icons/Email';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import HomeIcon from '@material-ui/icons/Home';
import { SetUser } from '../../services/storage.service';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import CardPayment from './CardPayment';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Gif from '../../assets/success2.gif';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';
import OrderContext from '../../context/order/OrderContext';

const useStyles = makeStyles((theme) => ({
	textfield: {
		margin: '30px 0 0',
		backgroundColor: '#fff',
		borderRadius: '10px'
	},
	defaultButton: {
		background: 'linear-gradient(315deg, #FE5858 0%, #EE9617 74%)',
		borderRadius: '24px',
		margin: '15px 0',
		'&:hover': {
			boxShadow: 'none',
			border: 'none',
			outline: 'none'
		},
		'&:active': {
			boxShadow: 'none',
			border: 'none',
			outline: 'none'
		},
		'&:focus': {
			border: 'none',
			outline: 'none'
		}
	}
}));

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#008080'
		}
	}
});

const CheckoutForm = () => {
	const formatNumber = (number) => {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(number);
	};

	const findCount = () => {
		let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
		return itemCount;
	};
	const [ value, setValue ] = useState({
		name: SetUser.getUser().name,
		email: SetUser.getUser().email,
		mobile_no: SetUser.getUser().mobile_no,
		address: SetUser.getUser().address === 'NA' ? '' : SetUser.getUser().address,
		payment: ''
	});
	const [ success, setSuccess ] = useState(false);
	const alert = useAlert();
	const { total, cartItems, cartID, getCart } = useContext(CartContext);
	const { confirmOrder } = useContext(OrderContext);
	const history = useHistory();

	const handleInputChange = (prop) => (event) => {
		setValue({ ...value, [prop]: event.target.value });
	};
	const handleSubmit = async (e) => {
		setSuccess(true);
		await confirmOrder(cartID);
		setSuccess(false);
		getCart();
		history.push('/home');
		alert.success('Order Placed Successfully.');
	};

	const classes = useStyles();

	return (
		<Fragment>
			<div className='container' style={{ padding: '0 200px', display: success ? 'none' : 'block' }}>
				{cartItems.length > 0 && (
					<div className='row  justify-content-center'>
						<div className='col-sm-9'>
							<ThemeProvider theme={theme}>
								<ValidatorForm onSubmit={handleSubmit}>
									<TextValidator
										id='name'
										type='text'
										color='primary'
										fullWidth
										value={value.name}
										className={classes.textfield}
										label='Your Name'
										variant='outlined'
										onChange={handleInputChange('name')}
										validators={[ 'required' ]}
										errorMessages={[ 'this field is required' ]}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end' style={{ padding: '12px' }}>
													<PersonIcon />
												</InputAdornment>
											)
										}}
									/>
									<TextValidator
										id='email'
										type='email'
										fullWidth
										className={classes.textfield}
										validators={[ 'required', 'isEmail' ]}
										errorMessages={[ 'this field is required', 'email is not valid' ]}
										color='primary'
										value={value.email}
										label=' Your E-Mail'
										variant='outlined'
										onChange={handleInputChange('email')}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end' style={{ padding: '12px' }}>
													<EmailIcon />
												</InputAdornment>
											)
										}}
									/>
									<TextValidator
										id='mobileno'
										type='tel'
										fullWidth
										className={classes.textfield}
										color='primary'
										validators={[ 'required' ]}
										errorMessages={[ 'this field is required' ]}
										value={value.mobile_no}
										label='Mobile Number'
										variant='outlined'
										onChange={handleInputChange('mobile_no')}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end' style={{ padding: '12px' }}>
													<PhoneIphoneIcon />
												</InputAdornment>
											)
										}}
									/>
									<TextValidator
										id='address'
										type='text'
										fullWidth
										className={classes.textfield}
										color='primary'
										value={value.address}
										label='Address'
										variant='outlined'
										validators={[ 'required' ]}
										errorMessages={[ 'this field is required' ]}
										onChange={handleInputChange('address')}
										InputProps={{
											endAdornment: (
												<InputAdornment position='end' style={{ padding: '12px' }}>
													<HomeIcon />
												</InputAdornment>
											)
										}}
									/>
									<TextValidator
										id='payment'
										select
										fullWidth
										variant='outlined'
										className={classes.textfield}
										label='Payment'
										value={value.payment}
										validators={[ 'required' ]}
										errorMessages={[ 'this field is required' ]}
										onChange={handleInputChange('payment')}
									>
										<MenuItem value={'Cash on Delivery'}>Cash On Delivery</MenuItem>
										<MenuItem value={'Debit/Credit Card'}>Debit/Credit Card</MenuItem>
									</TextValidator>
									{value.payment === 'Debit/Credit Card' && <CardPayment />}
									<Button
										type='submit'
										color='secondary'
										fullWidth
										variant='contained'
										className={classes.defaultButton}
									>
										Place Order
									</Button>
								</ValidatorForm>
							</ThemeProvider>
						</div>
						<div className='col-sm-3 p-3'>
							<div className='card card-body'>
								<p className='mb-1'>Total Items</p>
								<h4 className=' mb-3 txt-right'>{findCount()}</h4>
								<p className='mb-1'>Total Payment</p>
								<h3 className='m-0 txt-right'>{formatNumber(total)}</h3>
							</div>
						</div>
					</div>
				)}
				{cartItems.length === 0 && (
					<div
						className='p-3 text-center'
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
			<div className='container' style={{ padding: '0 200px', display: !success ? 'none' : 'block' }}>
				<img
					src={Gif}
					alt='succes'
					style={{
						height: '100px',
						width: '100px',
						display: 'block',
						margin: '180px auto 0'
					}}
				/>
			</div>
		</Fragment>
	);
};

export default CheckoutForm;
