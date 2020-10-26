import React, { useState, Fragment, useContext } from 'react';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import HomeIcon from '@material-ui/icons/Home';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import AuthContext from '../../context/auth/AuthContext';
import CartContext from '../../context/cart/CartContext';
import { useAlert } from 'react-alert';

const useStyles = makeStyles({
	textfield: {
		marginTop: '30px '
	},
	link: {
		color: 'red',
		'&:hover': {
			color: 'green',
			cursor: 'pointer',
			textDecoration: 'underline'
		}
	},
	defaultButton: {
		marginTop: '40px ',
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
});

const Register = (props) => {
	const classes = useStyles();
	const Alert = useAlert();
	const authContext = useContext(AuthContext);
	const { getCart } = useContext(CartContext);
	const { setToLogin } = props;
	const [ showPassword, setShowPassword ] = useState(false);
	const [ registerState, setRegisterState ] = useState({
		name: '',
		email: '',
		password: '',
		mobile_no: '',
		address: ''
	});
	const [ emailResult, setEmailResult ] = useState({
		isError: false,
		message: ''
	});
	const [ mobileResult, setMobileResult ] = useState({
		isError: false,
		message: ''
	});

	const handleInputChange = (prop) => (event) => {
		setRegisterState({ ...registerState, [prop]: event.target.value || '' });
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const handleSubmit = async () => {
		setEmailResult({});
		setMobileResult({});
		let res = await authContext.register(registerState);
		if (res.success) {
			props.handleClose();
			getCart();
			Alert.success('Registered Succesfully...');
		} else if (res.error.mobile_no && res.error.email) {
			setRegisterState({ ...registerState, email: '', mobile_no: '' });
			setEmailResult({ isError: true, message: 'Email already exits..' });
			setMobileResult({ isError: true, message: 'Mobile number already taken..' });
		} else if (res.error.mobile_no) {
			console.log('mobile');
			setRegisterState({ ...registerState, mobile_no: '' });
			setMobileResult({ isError: true, message: 'Mobile number already taken..' });
		} else if (res.error.email) {
			console.log('email');
			setRegisterState({ ...registerState, email: '' });
			setEmailResult({ isError: true, message: 'Email already exits..' });
		}
	};

	return (
		<ValidatorForm onSubmit={handleSubmit}>
			<TextValidator
				id='register-username'
				type='text'
				color='primary'
				value={registerState.name}
				label='User Name'
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
				id='register-email'
				error={emailResult.isError}
				helperText={emailResult.message}
				type='email'
				validators={[ 'required', 'isEmail' ]}
				errorMessages={[ 'this field is required', 'email is not valid' ]}
				className={classes.textfield}
				color='primary'
				value={registerState.email}
				label='E-Mail'
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
				id='register-password'
				className={classes.textfield}
				type={showPassword ? 'text' : 'password'}
				color='primary'
				value={registerState.password}
				validators={[ 'required' ]}
				errorMessages={[ 'this field is required' ]}
				label='Password'
				onChange={handleInputChange('password')}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
								tabIndex='-1'
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
			<TextValidator
				id='register-mobileno'
				error={mobileResult.isError}
				helperText={mobileResult.message}
				type='tel'
				className={classes.textfield}
				color='primary'
				validators={[ 'required' ]}
				errorMessages={[ 'this field is required' ]}
				value={registerState.mobile_no}
				label='Mobile Number'
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
				id='register-address'
				type='text'
				className={classes.textfield}
				color='primary'
				value={registerState.address}
				label='Address'
				onChange={handleInputChange('address')}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end' style={{ padding: '12px' }}>
							<HomeIcon />
						</InputAdornment>
					)
				}}
			/>
			<Button type='submit' color='secondary' fullWidth variant='contained' className={classes.defaultButton}>
				Create Account
			</Button>
			<p style={{ margin: '10px 0' }}>
				Already have an account?{' '}
				<span onClick={setToLogin} className={classes.link}>
					Login
				</span>
			</p>
		</ValidatorForm>
	);
};

export default Register;
