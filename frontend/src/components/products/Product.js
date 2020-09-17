import React, { Fragment, useContext } from 'react';
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
	const [ expanded, setExpanded ] = React.useState(false);
	const [ count, setCount ] = React.useState(0);
	const { key, name, price, description, stock, image } = product;

	const handleExpandClick = () => {
		setExpanded(!expanded);
	};

	return (
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
						{price}
					</Typography>
				</CardContent>
			</CardActionArea>
			<Collapse in={expanded} timeout='auto' unmountOnExit>
				<CardContent className={classes.content}>
					<Typography paragraph>{description}</Typography>
				</CardContent>
			</Collapse>
			<CardActions disableSpacing>
				{count === 0 ? (
					<Button variant='contained' color='secondary' fullWidth onClick={() => setCount(1)}>
						ADD
					</Button>
				) : (
					<Fragment>
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
					</Fragment>
				)}
			</CardActions>
		</Card>
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
