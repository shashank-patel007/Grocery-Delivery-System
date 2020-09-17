import { LOGIN_REGISTER, SIGN_OUT, SHOW_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
	switch (action.type) {
		case LOGIN_REGISTER:
			return {
				name: action.payload.userName,
				email: action.payload.email,
				mobile_no: action.payload.number,
				address: action.payload.address,
				isLoggedIn: true,
				token: action.payload.token
			};
		default:
			break;
	}
};
