import React, { useState } from 'react';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import { Button } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import InputAdornment from '@material-ui/core/InputAdornment';
import CommentIcon from '@material-ui/icons/Comment';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import MuiDialogContent from '@material-ui/core/DialogContent';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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
			main: '#008080'
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
		borderRadius: '24px',
		background: 'linear-gradient(315deg, #FE5858 0%, #EE9617 74%)',
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

const ContactUs = ({ handleClose, open }) => {
	const [ value, setValue ] = useState({
		name: '',
		email: '',
		message: ''
	});
	const classes = useStyles();

	const onChange = (e) => {
		setValue({ ...value, [e.target.name]: e.target.value });
		// console.log(e.target.value);
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		alert('Your message has been sent.We will get back shortly');
		setValue({
			name: '',
			email: '',
			message: ''
		});
		handleClose();
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
				Contact Us
			</DialogTitle>
			<DialogContent>
				<ThemeProvider theme={theme}>
					<ValidatorForm onSubmit={handleSubmit}>
						<TextValidator
							label='Name'
							name='name'
							variant='outlined'
							type='text'
							style={{ width: '100%', marginBottom: '5%' }}
							onChange={onChange}
							value={value.name}
							color='primary'
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
							label='Email id'
							name='email'
							variant='outlined'
							type='text'
							style={{ width: '100%', marginBottom: '5%' }}
							onChange={onChange}
							value={value.email}
							color='primary'
							validators={[ 'required' ]}
							errorMessages={[ 'this field is required' ]}
							InputProps={{
								endAdornment: (
									<InputAdornment position='end' style={{ padding: '12px' }}>
										<EmailIcon />
									</InputAdornment>
								)
							}}
						/>

						<TextValidator
							label='Your message'
							name='message'
							variant='outlined'
							multiline
							rows={4}
							type='text'
							style={{ width: '100%', marginBottom: '5%' }}
							onChange={onChange}
							value={value.message}
							color='primary'
							validators={[ 'required' ]}
							errorMessages={[ 'this field is required' ]}
							InputProps={{
								endAdornment: (
									<InputAdornment
										position='end'
										style={{ paddingBottom: '45px', paddingRight: '12px' }}
									>
										<CommentIcon />
									</InputAdornment>
								)
							}}
						/>

						<Button
							className={classes.defaultButton}
							style={{ marginTop: '1%' }}
							color='secondary'
							type='submit'
							variant='contained'
						>
							Submit
						</Button>
					</ValidatorForm>
				</ThemeProvider>
			</DialogContent>
		</Dialog>
	);
};

export default ContactUs;
