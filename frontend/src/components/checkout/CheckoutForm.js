import React, { Fragment, useContext, useEffect, useState } from 'react';
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
import Gif from '../../assets/successful.gif';
import { useHistory } from 'react-router-dom';
import { useAlert } from 'react-alert';

const useStyles = makeStyles((theme) => ({
	textfield: {
		margin: '30px 0 0',
		backgroundColor: '#fff'
	},
	defaultButton: {
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
			main: '#0DA59C'
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
		address: SetUser.getUser().address,
		payment: ''
	});
	const [ success, setSuccess ] = useState(false);
	const alert = useAlert();
	const { total, cartItems } = useContext(CartContext);

	const handleInputChange = (prop) => (event) => {
		setValue({ ...value, [prop]: event.target.value });
	};
	const handleSubmit = (e) => {
		setSuccess(true);
		alert.success('Order Placed Successfully.');
	};

	const classes = useStyles();
	const history = useHistory();
	useEffect(
		() => {
			var timer;
			if (success) {
				timer = setTimeout(() => {
					setSuccess(false);
					history.push('/home');
				}, 3000);
			}
			return () => clearTimeout(timer);
		},
		[ success, history ]
	);
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
										helperText='Select Your Payment method'
									>
										<MenuItem value={'Cash on Delivery'}>Cash On Dilevery</MenuItem>
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
				{cartItems.length === 0 && <div className='p-3 text-center text-muted'>Your cart is empty</div>}
			</div>
			<div className='container' style={{ padding: '0 200px', display: !success ? 'none' : 'block' }}>
				<img src={Gif} alt='succes' style={{ display: 'block', margin: '20px auto' }} />
			</div>
		</Fragment>
	);
};

export default CheckoutForm;
