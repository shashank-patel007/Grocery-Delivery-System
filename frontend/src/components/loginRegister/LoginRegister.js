import React, { Fragment, useState, useContext } from 'react';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import clsx from 'clsx';

import './login-register.css';
import Login from './Login';
import Register from './Register';
import AuthContext from '../../context/auth/AuthContext';

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
		name: '',
		email: '',
		password: '',
		mobile_no: '',
		address: ''
	});

	const authContext = useContext(AuthContext);

	//* These function handles the dialog box
	const handleClickOpen = () => {
		setOpen(true);
		setLoginState({
			email: '',
			password: ''
		});
		setRegisterState({
			name: '',
			email: '',
			password: '',
			mobile_no: null
		});
		setIsLogin(true);
	};
	const handleClose = () => {
		setOpen(false);
		setLoginState({
			email: '',
			password: ''
		});
		setRegisterState({
			name: '',
			email: '',
			password: '',
			mobile_no: null
		});
		setIsLogin(true);
	};
	//**  -------   *** ------**//

	//**These functions handles login and register form */
	const setToRegister = () => {
		setIsLogin(false);
		setLoginState({
			email: '',
			password: ''
		});
	};

	const setToLogin = () => {
		setIsLogin(true);
		setRegisterState({
			name: '',
			email: '',
			password: '',
			mobile_no: ''
		});
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
			console.log(authContext.register(registerState));
			// setIsLogin(val);
		} else authContext.login(loginState);

		if (authContext.isLoggedIn) {
			handleClose();
		}
	};

	return (
		<Fragment>
			<IconButton
				color='inherit'
				className={clsx(classes.button, classes.user, classes.defaultButton)}
				onClick={handleClickOpen}
			>
				{authContext.isLoggedIn ? <span>Welcome User</span> : <span> Login/SignUp </span>}
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
