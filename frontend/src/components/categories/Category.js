import React, { useContext } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ProductContext from '../../context/product/ProductContext';

const useStyles = makeStyles({
	category: {
		padding: '1rem',
		border: 'none',
		filter: 'drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.25))',
		borderRadius: '20px',

		'&:hover': {
			boxShadow: '5px 5px 10px'
		}
	}
});

const Category = ({ name, image }) => {
	const classes = useStyles();
	const { searchByCategory } = useContext(ProductContext);
	return (
		<div className='col-2'>
			<div className={`card ${classes.category}`} onClick={() => searchByCategory(name)}>
				<img
					src={image}
					alt={name}
					style={{ height: '5.625rem', width: '5.625rem', display: 'block', margin: 'auto' }}
				/>
				<h5
					className='card-title'
					style={{ textTransform: 'capitalize', display: 'block', margin: 'auto', padding: '10px 0' }}
				>
					{name}
				</h5>
			</div>
		</div>
	);
};

export default Category;
