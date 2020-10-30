import React, { Fragment, useContext, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import RemoveIcon from '@material-ui/icons/Remove';
import AddIcon from '@material-ui/icons/Add';
import { CardActionArea, Collapse, Button } from '@material-ui/core';
import CartContext from '../../context/cart/CartContext';
import { SetUser } from '../../services/storage.service';
import LoginRegister from '../loginRegister/LoginRegister';

const useStyles = makeStyles((theme) => ({
	root: {
		maxWidth: 300,
		height: 'auto',
		filter: 'drop-shadow(0px 6px 6px rgba(0, 0, 0, 0.25))',
		borderRadius: '20px'
	},
	content: {
		padding: '0 10px',
		'&:last-child': {
			paddingBottom: '10px'
		}
	},
	media: {
		// padding: '20px 0',
		height: '106',
		width: '100'
	},
	expand: {
		backgroundColor: '#f50057',
		fontSize: '1.2rem',
		color: '#fff',
		borderRadius: '20%',
		padding: '6px',

		'&:hover': {
			backgroundColor: '#f50057',
			color: '#fff',
			outline: 'none',
			border: 'none'
		},
		'&:focus': {
			backgroundColor: '#f50057',
			color: '#fff',
			outline: 'none',
			border: 'none'
		}
	}
}));

const Product = ({ product }) => {
	const classes = useStyles();
	const [ expanded, setExpanded ] = useState(false);
	const [ open, setOpen ] = useState(false);
	const { key, name, price, description, stock, image } = product;
	const { cartItems, addProduct, removeProduct, increase, decrease } = useContext(CartContext);

	const isInCart = (product) => {
		return !!cartItems.find((item) => item.id === product.id);
	};

	const findQuantity = (product) => {
		const item = cartItems.find((item) => item.id === product.id);
		// console.log(item);
		return item.quantity;
	};

	const formatNumber = (number) => {
		return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'INR' }).format(number);
	};

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
		<Fragment>
			<Card className={classes.root} raised>
				<CardActionArea onClick={handleExpandClick}>
					<CardMedia className={classes.media} component='img' image={image} alt={name} />
					<CardContent className={classes.content}>
						<Typography variant='subtitle1' color='textSecondary' align='center'>
							{stock && 'Avaliable in Stock'}
						</Typography>
						<Typography variant='h6' color='textSecondary' align='center'>
							{name}
						</Typography>
						<Typography variant='subtitle1' color='textPrimary' align='justify' display='block'>
							{formatNumber(price)}
						</Typography>
					</CardContent>
				</CardActionArea>
				<Collapse in={expanded} timeout='auto' unmountOnExit>
					<CardContent className={classes.content}>
						<Typography paragraph>{description}</Typography>
					</CardContent>
				</Collapse>
				<CardActions disableSpacing>
					{!isInCart(product) ? (
						<Button
							variant='contained'
							color='secondary'
							fullWidth
							onClick={() => {
								if (SetUser.getUser()) addProduct(product);
								else setOpen(true);
							}}
							className={classes.expand}
						>
							ADD
						</Button>
					) : (
						<Fragment>
							<IconButton
								variant='contained'
								color='secondary'
								onClick={() => {
									if (SetUser.getUser()) {
										if (findQuantity(product) !== 1) decrease(product, true);
										else removeProduct(product);
									} else setOpen(true);
								}}
								className={classes.expand}
							>
								<RemoveIcon />
							</IconButton>

							<div
								style={{
									display: 'inline-block',
									width: '100%',
									textAlign: 'center',
									fontSize: '1.2rem'
								}}
							>
								{findQuantity(product)}
							</div>
							<IconButton
								variant='outlined'
								color='secondary'
								onClick={() => {
									if (SetUser.getUser()) increase(product, true);
									else setOpen(true);
								}}
								className={classes.expand}
								style={{
									marginLeft: 'auto'
								}}
							>
								<AddIcon />
							</IconButton>
						</Fragment>
					)}
				</CardActions>
			</Card>
			{open && <LoginRegister handleClose={() => setOpen(false)} open={open} />}
		</Fragment>
	);
};

{
	/* <Fragment>
	<IconButton
		variant='contained'
		color='secondary'
		onClick={() => setCount(count - 1)}
		className={classes.expand}
	>
		<RemoveIcon />
	</IconButton>

	<div
		style={{ display: 'inline-block', width: '100%', textAlign: 'center', fontSize: '1.2rem' }}
	>
		{count}
	</div>
	<IconButton
		variant='outlined'
		color='secondary'
		onClick={() => setCount(count + 1)}
		className={classes.expand}
		style={{
			marginLeft: 'auto'
		}}
	>
		<AddIcon />
	</IconButton>
</Fragment> */
}

export default Product;
