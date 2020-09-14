import React from 'react';
import { fade, makeStyles, createMuiTheme, MuiThemeProvider, withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Button from '@material-ui/core/Button';
import ListItemText from '@material-ui/core/ListItemText';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { NavLink } from 'react-router-dom';

const customTheme = createMuiTheme({
	palette: {
		primary: {
			main: '#fff'
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
			// secondary: '#fff',
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
	title: {
		display: 'none',
		[theme.breakpoints.up('sm')]: {
			display: 'block'
		}
	},

	iconButton: {
		fontSize: '1em',
		color: '#2B2F4C',
		marginRight: '30px'
	},
	icons: {
		marginRight: '5px'
	},
	link: {
		color: '#f55d2c'
	}
}));

const CustomListItem = withStyles({
	root: {
		textAlign: 'left',
		width: 'auto',
		'&$selected': {
			backgroundColor: '#fff',
			color: '#f55d2c'
		},
		'&$selected:hover': {
			backgroundColor: '#fff',
			color: '#f55d2c'
		},
		'&:hover': {
			backgroundColor: '#fff',
			color: '#f55d2c'
		}
	},
	selected: {}
})(ListItem);

const CustomButton = withStyles({
	root: {
		height: '100%',
		fontSize: '1.5em',
		padding: '10px 30px',
		color: '#fff',
		border: 'none',
		outline: 'none',
		textTransform: 'none',
		backgroundColor: '#f55d2c',
		'&:hover': {
			boxShadow: 'none',
			border: 'none',
			backgroundColor: '#f55d2c',
			outline: 'none'
		},
		'&:active': {
			boxShadow: 'none',
			border: 'none',
			backgroundColor: '#f55d2c',
			outline: 'none'
		},
		'&:focus': {
			border: 'none',
			backgroundColor: '#f55d2c',
			outline: 'none'
		}
	}
})(Button);

export default function PrimarySearchAppBar() {
	const classes = useStyles();
	const [ selectedIndex, setSelectedIndex ] = React.useState(0);

	const handleListItemClick = (event, index) => {
		setSelectedIndex(index);
	};

	return (
		<MuiThemeProvider theme={customTheme}>
			<div className={classes.grow}>
				<AppBar position='static'>
					<Toolbar>
						<List component='nav' style={flexContainer}>
							<CustomListItem
								button
								key='Home'
								selected={selectedIndex === 0}
								onClick={(event) => handleListItemClick(event, 0)}
							>
								<NavLink to='/hdhd' activeClassName={classes.link}>
									<ListItemText style={{ textAlign: 'left', paddingLeft: '10px' }} primary='Home' />
								</NavLink>
							</CustomListItem>
							<CustomListItem
								button
								key='New Products'
								selected={selectedIndex === 1}
								onClick={(event) => handleListItemClick(event, 1)}
							>
								<NavLink to='/loans' activeClassName={classes.link}>
									<ListItemText
										style={{ textAlign: 'left', paddingLeft: '10px' }}
										primary='New Products'
									/>
								</NavLink>
							</CustomListItem>
							<CustomListItem
								button
								key='Contact Us'
								selected={selectedIndex === 2}
								onClick={(event) => handleListItemClick(event, 2)}
							>
								<NavLink to='/communication' activeClassName={classes.link}>
									<ListItemText
										style={{ textAlign: 'left', paddingLeft: '10px' }}
										primary='Contact Us'
									/>
								</NavLink>
							</CustomListItem>
						</List>
						<div className={classes.grow} />
						<CustomButton startIcon={<ShoppingCartIcon style={{ fontSize: '1em' }} />}>Cart</CustomButton>
					</Toolbar>
				</AppBar>
			</div>
		</MuiThemeProvider>
	);
}

const flexContainer = {
	display: 'flex',
	flexDirection: 'row',
	padding: 0
};
