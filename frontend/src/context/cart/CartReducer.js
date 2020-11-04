export const sumItems = (cartItems) => {
	let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
	let total = cartItems.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
	return { itemCount, total };
};

export const CartReducer = (state, action) => {
	switch (action.type) {
		case 'SET_CART':
			return {
				cartItems: action.payload.cartItems,
				total: action.payload.total,
				cartID: action.payload.cartID,
				cartOwner: action.payload.cartOwner
			};
		default:
			return state;
	}
};
