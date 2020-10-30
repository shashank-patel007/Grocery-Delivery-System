import React from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Category from './Category';
import fruits from '../../assets/fruits.svg';
import vegetables from '../../assets/vegetables.svg';
import beverages from '../../assets/beverages.svg';
import dairy from '../../assets/dairy.svg';
import bakery from '../../assets/bakery.svg';
import flours from '../../assets/flours.svg';

const list = [
	{
		name: 'Fruits',
		img: fruits
	},
	{
		name: 'Vegetables',
		img: vegetables
	},
	{
		name: 'Beverages',
		img: beverages
	},
	{
		name: 'Dairy',
		img: dairy
	},
	{
		name: 'Bakery',
		img: bakery
	},
	{
		name: 'Flours',
		img: flours
	}
];

const CategoryList = () => {
	return (
		<Container>
			<Typography component='div' style={{ padding: '30px' }}>
				<h2>Categories</h2>
				<div className='row'>
					{list.map((category, index) => <Category key={index} name={category.name} image={category.img} />)}
				</div>
			</Typography>
		</Container>
	);
};

export default CategoryList;
