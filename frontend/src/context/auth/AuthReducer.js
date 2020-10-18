import { LOGIN_REGISTER, SIGN_OUT, SHOW_ALERT, REMOVE_ALERT } from '../types';

export default (state, action) => {
	switch (action.type) {
		case LOGIN_REGISTER:
			return {
				name: action.payload.name,
				email: action.payload.email,
				mobile_no: action.payload.mobile_no,
				address: action.payload.address,
				isLoggedIn: true,
				token: action.payload.token
			};
		default:
			break;
	}
};
