import React, { useReducer } from 'react';
import Axios from 'axios';
import AuthReducer from './AuthReducer';
import AuthContext from './AuthContext';

import { LOGIN_REGISTER, SIGN_OUT } from '../types';
import { SetUser, TokenService } from '../../services/storage.service';

const AuthState = (props) => {
	// const initialState = {
	// 	name: '',
	// 	email: '',
	// 	mobile_no: '',
	// 	address: '',
	// 	isLoggedIn: false,
	// 	token: ''
	// };

	// const [ state, dispatch ] = useReducer(AuthReducer, initialState);

	const login = async (data) => {
		var config = {
			method: 'post',
			url: 'http://127.0.0.1:8000/login/',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({
				username: data.email,
				password: data.password
			})
		};
		let res = false;

		await Axios(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
				alert('Logged In Successfully');
				// dispatch({
				// 	type: LOGIN_REGISTER,
				// 	payload: {
				// 		name: response.data.name,
				// 		email: response.data.email,
				// 		mobile_no: response.data.mobile_no,
				// 		address: response.data.address,
				// 		isLoggedIn: true,
				// 		token: response.data.token
				// 	}
				// });
				res = true;
				SetUser.saveUser({
					name: response.data.name,
					email: response.data.email,
					mobile_no: response.data.mobile_no,
					address: response.data.address
				});
				TokenService.saveToken(response.data.token);
			})
			.catch(function(error) {
				console.log(error);
			});
		return res;
	};

	const register = async (data) => {
		var config = {
			method: 'post',
			url: 'http://127.0.0.1:8000/profile/',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({
				email: data.email,
				password: data.password,
				mobile_no: data.mobile_no,
				name: data.name,
				address: data.address
			})
		};
		let res = false;

		await Axios(config)
			.then(function(response) {
				console.log(JSON.stringify(response.data));
				alert('Registered Successfully');
				res = login({ email: data.email, password: data.password });
			})
			.catch(function(error) {
				console.log(error);
			});
		return res;
	};

	const logout = () => {};

	return (
		<AuthContext.Provider
			value={{
				login,
				register,
				logout
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
