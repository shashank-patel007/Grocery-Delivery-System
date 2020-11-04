import React, { useState } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
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
	);
};

export default LoginRegister;
