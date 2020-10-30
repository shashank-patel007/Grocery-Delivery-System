import { SetUser } from '../../services/storage.service';

const Storage = (cartItems) => {
	if (SetUser.getUser()) {
		localStorage.setItem(`CART-${SetUser.getUser().name}`, JSON.stringify(cartItems.length > 0 ? cartItems : []));
	}
};

export const sumItems = (cartItems) => {
	// Storage(cartItems);
	let itemCount = cartItems.reduce((total, product) => total + product.quantity, 0);
	let total = cartItems.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2);
	return { itemCount, total };
};

export const CartReducer = (state, action) => {
	switch (action.type) {
		case 'ADD_ITEM':
			if (!state.cartItems.find((item) => item.id === action.payload.id)) {
				state.cartItems.push({
					...action.payload,
					quantity: 1
				});
			}

			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [ ...state.cartItems ]
			};
		case 'REMOVE_ITEM':
			return {
				...state,
				...sumItems(state.cartItems.filter((item) => item.id !== action.payload.id)),
				cartItems: [ ...state.cartItems.filter((item) => item.id !== action.payload.id) ]
			};
		case 'INCREASE':
			state.cartItems[state.cartItems.findIndex((item) => item.id === action.payload.id)].quantity++;
			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [ ...state.cartItems ]
			};
		case 'DECREASE':
			state.cartItems[state.cartItems.findIndex((item) => item.id === action.payload.id)].quantity--;
			return {
				...state,
				...sumItems(state.cartItems),
				cartItems: [ ...state.cartItems ]
			};
		case 'CHECKOUT':
			return {
				cartItems: [],
				checkout: true,
				...sumItems([])
			};
		case 'CLEAR':
			return {
				cartItems: [],
				...sumItems([])
			};
		case 'REMOVE_CART':
			return {
				cartItems: []
			};

		case 'SET_CART':
			return {
				cartItems: action.payload.cartItems,
				total: action.payload.total,
				cartId: action.payload.cartId,
				cartOwner: action.payload.cartOwner
			};
		default:
			return state;
	}
};
