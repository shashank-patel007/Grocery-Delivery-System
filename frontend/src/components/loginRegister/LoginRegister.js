import React, { Fragment, useState } from 'react';
import { fade, withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import Login from './Login';
import Register from './Register';

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

const theme = createMuiTheme({
	palette: {
		primary: {
			main: '#0DA59C'
		}
	}
});

const useStyles = makeStyles({
	root: { zIndex: 1 },
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
	}
});

const LoginRegister = ({ handleClose, open }) => {
	const classes = useStyles();

	const [ isLogin, setIsLogin ] = useState(true);

	//**These functions handles login and register form */
	const setToRegister = () => {
		setIsLogin(false);
	};

	const setToLogin = () => {
		setIsLogin(true);
	};

	return (
		<Fragment>
			{/* <IconButton
				color='inherit'
				className={clsx(classes.button, classes.user, classes.defaultButton)}
				onClick={handleClickOpen}
			>
				{authContext.isLoggedIn ? <span>Welcome {authContext.name} </span> : <span> Login/SignUp </span>}
			</IconButton> */}
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
					<div className={classes.form}>
						<ThemeProvider theme={theme}>
							{isLogin ? (
								<Login setToRegister={setToRegister} handleClose={handleClose} />
							) : (
								<Register setToLogin={setToLogin} handleClose={handleClose} />
							)}
						</ThemeProvider>
					</div>
				</DialogContent>
			</Dialog>
		</Fragment>
	);
};

export default LoginRegister;
