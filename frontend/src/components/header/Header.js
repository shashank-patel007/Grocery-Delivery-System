import React from 'react';
import { fade, makeStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Search from './Search';
import Accessibility from './Accessibility';

const customTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#000'
		},
		divider: '#000',
		action: {
			// active: '#000',
			// hover: '#000',
			// selected: '#000',
			// disabled: '#000',
			// disabledBackground: '#000',
		},
		text: {
			main: '#123214',
			secondary: '#fff',
			disabled: '#fff',
			hint: '#fff',
			icon: '#110000'
		},
		background: {
			default: '#fff',
			paper: '#fff'
		}
	}
});

const useStyles = makeStyles((theme) => ({
	grow: {
		flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	title: {
		display: 'none',
		color: 'linear-gradient(315deg, #FE5858 0%, #EE9617 74%)',
		background: '-webkit-linear-gradient(315deg, #FE5858 0%, #EE9617 74%)',
		WebkitBackgroundClip: 'text',
		WebkitTextFillColor: 'transparent',
		fontFamily: 'Courgette,cursive',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},

	sectionDesktop: {
		display: 'none',
		[theme.breakpoints.up('md')]: {
			display: 'flex'
		}
	},
	sectionMobile: {
		display: 'flex',
		[theme.breakpoints.up('md')]: {
			display: 'none'
		}
	},
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

const Header = () => {
	const classes = useStyles();

	return (
		<MuiThemeProvider theme={customTheme}>
			<div className={classes.grow}>
				<AppBar position='static'>
					<Toolbar>
						<Typography className={classes.title} variant='h4' noWrap>
							Grocers
						</Typography>
						<Search />
						<div className={classes.grow} />
						<Accessibility />
					</Toolbar>
				</AppBar>
			</div>
		</MuiThemeProvider>
	);
};

export default Header;
