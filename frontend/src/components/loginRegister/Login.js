import React, { useState, Fragment, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import AuthContext from '../../context/auth/AuthContext';
import CartContext from '../../context/cart/CartContext';

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

const Login = (props) => {
	const classes = useStyles();
	const authContext = useContext(AuthContext);
	// const { setCart } = useContext(CartContext);

	const { setToRegister } = props;
	const [ showPassword, setShowPassword ] = useState(false);
	const [ loginState, setLoginState ] = useState({
		email: '',
		password: ''
	});

	const handleInputChange = (prop) => (event) => {
		setLoginState({ ...loginState, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	async function handleSubmit() {
		let result = await authContext.login(loginState);
		if (result) props.handleClose();
		// setCart();
		// document.location.reload(true);
	}

	return (
		<ValidatorForm onSubmit={handleSubmit}>
			<TextValidator
				id='login-email'
				type='email'
				validators={[ 'required', 'isEmail' ]}
				errorMessages={[ 'this field is required', 'email is not valid' ]}
				color='primary'
				value={loginState.email}
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
				id='login-password'
				className={classes.textfield}
				type={showPassword ? 'text' : 'password'}
				color='primary'
				value={loginState.password}
				label='Password'
				validators={[ 'required' ]}
				errorMessages={[ 'this field is required' ]}
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
			<Button type='submit' color='secondary' fullWidth variant='contained' className={classes.defaultButton}>
				Login
			</Button>

			<p style={{ margin: '10px 0' }}>
				Looking to{' '}
				<span onClick={setToRegister} className={classes.link}>
					create an account
				</span>
			</p>
		</ValidatorForm>
	);
};

export default Login;
