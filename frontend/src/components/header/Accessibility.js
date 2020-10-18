import React, { Fragment, useState, useContext } from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import clsx from 'clsx';
import LoginRegister from '../loginRegister/LoginRegister';
import { SetUser } from '../../services/storage.service';
import { Button } from '@material-ui/core';
import CartContext from '../../context/cart/CartContext';
import { useHistory } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
	button: {
		fontSize: '1em',
		color: '#2B2F4C',
		marginRight: '30px',
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
	},
	icons: {
		marginRight: '5px'
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
	paper: {
		marginRight: theme.spacing(2)
	}
}));

const Accessibility = () => {
	const classes = useStyles();
	const { removeCart } = useContext(CartContext);
	const [ open, setOpen ] = useState(false);
	const history = useHistory();
	const [ anchorEl, setAnchorEl ] = React.useState(null);

	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const logout = () => {
		SetUser.removeUser();
		removeCart();
		history.push('/');
		setAnchorEl(null);
	};

	return (
		<Fragment>
			<IconButton color='inherit' className={classes.button}>
				<PhoneIcon className={classes.icons} />
				<span>1800-0000-000</span>
			</IconButton>
			<IconButton color='inherit' className={classes.button}>
				<HelpOutlineIcon className={classes.icons} />
				<span>Help</span>
			</IconButton>
			{SetUser.getUser() ? (
				<div>
					<Button
						aria-controls='simple-menu'
						aria-haspopup='true'
						onClick={handleClick}
						className={classes.button}
						color='primary'
					>
						<span style={{ textTransform: 'capitalize' }}>{SetUser.getUser().name}</span>
					</Button>
					<Menu
						id='simple-menu'
						anchorEl={anchorEl}
						keepMounted
						open={Boolean(anchorEl)}
						onClose={handleClose}
					>
						<MenuItem onClick={handleClose}>Profile</MenuItem>
						<MenuItem onClick={handleClose}>My account</MenuItem>
						<MenuItem onClick={logout}>Logout</MenuItem>
					</Menu>
				</div>
			) : (
				<IconButton
					color='inherit'
					className={clsx(classes.button, classes.user, classes.defaultButton)}
					onClick={() => setOpen(true)}
				>
					<span> Login/SignUp </span>
				</IconButton>
			)}
			<LoginRegister handleClose={() => setOpen(false)} open={open} />
		</Fragment>
	);
};

export default Accessibility;
