import React, { useContext, useEffect, useState } from 'react';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles } from '@material-ui/core/styles';
import ProductContext from '../../context/product/ProductContext';
import { SetUser } from '../../services/storage.service';
import CartContext from '../../context/cart/CartContext';

const useStyles = makeStyles((theme) => ({
	search: {
		position: 'relative',
		borderRadius: '10px',
		backgroundColor: '#F7F7F7',
		'&:hover': {
			backgroundColor: fade(theme.palette.common.white, 0.25)
		},
		filter: 'drop-shadow(0px 0px 4px rgba(0, 0, 0, 0.25))',
		marginRight: theme.spacing(2),
		marginLeft: 0,
		width: '100%',
		[theme.breakpoints.up('md')]: {
			marginLeft: '90px',
			width: 'auto'
		}
	},
	searchIcon: {
		padding: theme.spacing(0, 2),
		height: '100%',
		position: 'absolute',
		pointerEvents: 'none',
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center'
	},
	inputRoot: {
		color: 'inherit'
	},
	inputInput: {
		padding: theme.spacing(1, 1, 1, 0),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('md')]: {
			width: '500px'
		}
	}
}));

const Search = () => {
	const classes = useStyles();
	const [ state, setState ] = useState(0);
	const { value, changeValue, getProducts, searchProducts } = useContext(ProductContext);
	const { getCart } = useContext(CartContext);

	useEffect(
		() => {
			if (value === '' && state === 0) {
				getProducts();
				if (SetUser.getUser()) getCart();
				setState(1);
			}
		},
		[ value, getProducts, state, getCart ]
	);

	const onChange = (e) => {
		changeValue(e.target.value);
	};

	const onSearch = (e) => {
		if (e.key === 'Enter') {
			e.preventDefault();
			if (e.target.value === '') {
				//Handle empty input
			} else {
				searchProducts();
				changeValue('');
			}
		}
	};

	return (
		<div className={classes.search}>
			<div className={classes.searchIcon}>
				<SearchIcon />
			</div>
			<InputBase
				placeholder='Search For Products...'
				classes={{
					root: classes.inputRoot,
					input: classes.inputInput
				}}
				value={value}
				onChange={onChange}
				onKeyPress={onSearch}
			/>
		</div>
	);
};

export default Search;
