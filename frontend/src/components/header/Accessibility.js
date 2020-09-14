import React, { Fragment, useState } from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import PhoneIcon from '@material-ui/icons/Phone';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import clsx from 'clsx';
import LoginRegister from '../loginRegister/LoginRegister';
const useStyles = makeStyles((theme) => ({
	// sectionDesktop: {
	// 	display: 'none',
	// 	[theme.breakpoints.up('md')]: {
	// 		display: 'flex'
	// 	}
	// },
	// sectionMobile: {
	// 	display: 'flex',
	// 	[theme.breakpoints.up('md')]: {
	// 		display: 'none'
	// 	}
	// },
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
	}
}));

const Accessibility = () => {
	const classes = useStyles();

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

			<LoginRegister />
		</Fragment>
	);
};

export default Accessibility;
