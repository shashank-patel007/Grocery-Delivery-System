import React, { useState, Fragment, useContext } from 'react';
import TextField from '@material-ui/core/TextField';
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
	const authContext = useContext(AuthContext);
	const { setToLogin } = props;
	const [ showPassword, setShowPassword ] = useState(false);
	const [ registerState, setRegisterState ] = useState({
		name: '',
		email: '',
		password: '',
		mobile_no: '',
		address: ''
	});

	const handleInputChange = (prop) => (event) => {
		setRegisterState({ ...registerState, [prop]: event.target.value });
	};

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};
	const handleSubmit = async () => {
		let result = await authContext.register(registerState);
		if (result) props.handleClose();
		// document.location.reload(true);
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
