import React from 'react';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';

function getSteps() {
	return [ 'Packed', 'On the way', 'Delivered' ];
}

const Order = ({ order }) => {
	const [ activeStep, setActiveStep ] = React.useState(Math.floor(Math.random() * 3));
	const steps = getSteps();
	const { products, quantity, total } = order;
	return (
		<div className='col-6'>
			<div className='card' style={{ width: '480px', margin: '10px' }}>
				<ul className='list-group list-group-flush'>
					<li className='list-group-item'>
						<span>Total number of items</span>
						<span className='float-right'>{quantity} </span>
						<br />
						<span>({products}) </span>
					</li>
					<li className='list-group-item'>
						<span>Total charges</span>
						<span className='float-right'> ₹{total}</span>
					</li>
					<li className='list-group-item'>
						<div>Track your order</div>
						<Stepper activeStep={activeStep} alternativeLabel>
							{steps.map((label) => (
								<Step key={label}>
									<StepLabel>{label}</StepLabel>
								</Step>
							))}
						</Stepper>
					</li>
				</ul>
			</div>
		</div>
	);
};

export default Order;
