export const ProductReducer = (state, action) => {
	switch (action.type) {
		case 'SET_PRODUCT':
			return {
				...state,
				products: action.payload
			};
		case 'SET_VALUE':
			return {
				...state,
				value: action.payload
			};
		default:
			return state;
	}
};
