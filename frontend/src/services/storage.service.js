const TOKEN_KEY = 'REACTAPP.TOKEN';
const USER = 'REACTAPP.USER';

/**
 * Manage the how Access Tokens are being stored and retreived from storage.
 *
 * Current implementation stores to localStorage. Local Storage should always be
 * accessed through this instace.
**/
const TokenService = {
	getToken() {
		return localStorage.getItem(TOKEN_KEY);
	},

	saveToken(accessToken) {
		localStorage.setItem(TOKEN_KEY, accessToken);
	},

	removeToken() {
		localStorage.removeItem(TOKEN_KEY);
	}
};

const SetUser = {
	getUser() {
		let user = localStorage.getItem(USER);
		return JSON.parse(user);
	},
	saveUser(user) {
		localStorage.setItem(USER, JSON.stringify(user));
	},

	removeUser() {
		localStorage.removeItem(USER);
	}
};

export { TokenService, SetUser };
