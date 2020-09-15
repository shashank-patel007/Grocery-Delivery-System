import { LOGIN_REGISTER, SIGN_OUT, SHOW_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
	switch (action.type) {
		case LOGIN_REGISTER:
			return {
				userName: action.payload.userName,
				email: action.payload.email,
				number: action.payload.number,
				address: action.payload.address,
				isLoggedIn: true,
				token: action.payload.token
			};
		default:
			break;
	}
};
