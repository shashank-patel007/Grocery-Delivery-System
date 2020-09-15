import React, { Fragment, useState } from 'react';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
// import TextField from '@material-ui/core/TextField';
// import InputAdornment from '@material-ui/core/InputAdornment';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import EmailIcon from '@material-ui/icons/Email';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

import './login-register.css';
import Login from './Login';
import Register from './Register';
import Axios from 'axios';

const styles = (theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(2)
	},
	closeButton: {
		position: 'absolute',
		right: theme.spacing(1),
		top: theme.spacing(1),
		color: theme.palette.grey[500],
		border: 'none',
		outline: 'none',
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

const DialogTitle = withStyles(styles)((props) => {
	const { children, classes, onClose, ...other } = props;
	return (
		<MuiDialogTitle disableTypography className={classes.root} {...other}>
			<Typography variant='h6'>{children}</Typography>
			{onClose ? (
				<IconButton aria-label='close' className={classes.closeButton} onClick={onClose}>
					<CloseIcon />
				</IconButton>
			) : null}
		</MuiDialogTitle>
	);
});

const DialogContent = withStyles((theme) => ({
	root: {
		padding: theme.spacing(2)
	}
}))(MuiDialogContent);

const DialogActions = withStyles((theme) => ({
	root: {
		margin: 0,
		padding: theme.spacing(1),
		display: 'inline-block',
		textAlign: 'center'
	}
}))(MuiDialogActions);

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#0DA59C'
		}
	}
});

const useStyles = makeStyles({
	button: {
		fontSize: '1em',
		color: '#2B2F4C',
		marginRight: '30px',
		border: 'none',
		outline: 'none'
	},
	defaultButton: {
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
	},
	user: {
		background: '#F9F9F9',
		borderRadius: '10px',
		fontSize: '1em',
		color: '#2B2F4C',
		marginRight: '30px',
		'&:hover': {
			backgroundColor: fade('#F9F9F9', 0.5),
			boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.25)'
		},
		boxShadow: '2px 2px 2px rgba(0, 0, 0, 0.50)'
	},
	form: {
		alignItems: 'center',
		textAlign: 'center'
	},
	link: {
		color: 'red',
		'&:hover': {
			color: 'green',
			cursor: 'pointer',
			textDecoration: 'underline'
		}
	}
});

const LoginRegister = (props) => {
	const classes = useStyles();
	const [ open, setOpen ] = useState(false);
	const [ isLogin, setIsLogin ] = useState(true);

	const [ loginState, setLoginState ] = useState({
		email: '',
		password: ''
	});

	const [ registerState, setRegisterState ] = useState({
		userName: '',
		email: '',
		password: ''
	});

	//* These function handles the dialog box
	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};
	//**  -------   *** ------**//

	//**These functions handles login and register form */
	const setToRegister = () => {
		setIsLogin(false);
	};

	const setToLogin = () => {
		setIsLogin(true);
	};

	// ** This function is handle input change of Login form
	const handleLoginChange = (prop) => (event) => {
		setLoginState({ ...loginState, [prop]: event.target.value });
	};

	// ** This function is handle input change of Register form
	const handleRegisterChange = (prop) => (event) => {
		setRegisterState({ ...registerState, [prop]: event.target.value });
	};

	const submit = () => {
		if (!isLogin) {
			const options = {
				method: 'post',
				url: 'http://127.0.0.1:8000/api/profile/',
				data: {
					name: registerState.userName,
					email: registerState.email,
					password: registerState.password,
					mobile_no: 1234567,
					address: 'somewhere'
				},
				// headers: {
				// 	crossDomain: true,
				// 	'Access-Control-Allow-Origin': 'http://localhost:3000',
				// 	'Content-Type': 'application/json'
				// },
				transformRequest: [
					(data, headers) => {
						// transform the data

						return data;
					}
				]
			};

			// send the request
			Axios(options).then(
				(response) => {
					console.log(response);
				},
				(error) => {
					console.log(error);
				}
			);
		}
	};

	return (
		<Fragment>
			<IconButton
				color='inherit'
				className={clsx(classes.button, classes.user, classes.defaultButton)}
				onClick={handleClickOpen}
			>
				<span>Login/SignUp</span>
			</IconButton>
			<Dialog
				onClose={handleClose}
				aria-labelledby='customized-dialog-title'
				open={open}
				fullWidth={true}
				maxWidth={'xs'}
			>
				<DialogTitle id='customized-dialog-title' onClose={handleClose}>
					{isLogin ? 'Login With' : 'Register With'}
				</DialogTitle>
				<DialogContent>
					<div className='social'>
						{/* <span className='circle github' href='#'>
							<i className='fa fa-github fa-fw' />
						</span> */}
						<span id='google_login' className='circle google' href='#'>
							<i className='fa fa-google-plus fa-fw' />
						</span>
						<span id='facebook_login' className='circle facebook' href='#'>
							<i className='fa fa-facebook fa-fw' />
						</span>
					</div>
					<div className='division'>
						<div className='line l' />
						<span>or</span>
						<div className='line r' />
					</div>
					<div className={classes.form}>
						<ThemeProvider theme={theme}>
							{isLogin ? (
								<Login values={loginState} handleInputChange={handleLoginChange} />
							) : (
								<Register values={registerState} handleInputChange={handleRegisterChange} />
							)}
						</ThemeProvider>
					</div>
				</DialogContent>
				<DialogActions>
					{isLogin ? (
						<Fragment>
							<Button
								onClick={submit}
								color='secondary'
								fullWidth
								variant='contained'
								className={classes.defaultButton}
							>
								Login
							</Button>

							<p style={{ margin: '10px 0' }}>
								Looking to{' '}
								<span onClick={setToRegister} className={classes.link}>
									create an account
								</span>
							</p>
						</Fragment>
					) : (
						<Fragment>
							<Button
								onClick={submit}
								color='secondary'
								fullWidth
								variant='contained'
								className={classes.defaultButton}
							>
								Create Account
							</Button>
							<p style={{ margin: '10px 0' }}>
								Already have an account?{' '}
								<span onClick={setToLogin} className={classes.link}>
									Login
								</span>
							</p>
						</Fragment>
					)}
				</DialogActions>
			</Dialog>
		</Fragment>
	);
};

export default LoginRegister;
