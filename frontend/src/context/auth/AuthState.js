import React, { useReducer } from 'react';
import Axios from 'axios';
import AuthReducer from './AuthReducer';
import AuthContext from './AuthContext';

import { LOGIN_REGISTER, SIGN_OUT } from '../types';

const AuthState = (props) => {
	const initialState = {
		name: '',
		email: '',
		mobile_no: '',
		address: '',
		isLoggedIn: false,
		token: ''
	};

	const [ state, dispatch ] = useReducer(AuthReducer, initialState);

	const login = (data) => {
		var config = {
			method: 'post',
			url: 'http://127.0.0.1:8000/api/login/',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({
				username: data.email,
				password: data.password
			})
		};

		Axios(config)
			.then((response) => {
				console.log(JSON.stringify(response.data.token));
				alert('Logged In Successfully');
				dispatch({
					type: LOGIN_REGISTER,
					payload: {
						name: '',
						email: data.email,
						mobile_no: '',
						address: '',
						isLoggedIn: true,
						token: response.data.token
					}
				});
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	const register = (data) => {
		var config = {
			method: 'post',
			url: 'http://127.0.0.1:8000/api/profile/',
			headers: {
				'Content-Type': 'application/json'
			},
			data: JSON.stringify({
				email: data.email,
				password: data.password,
				mobile_no: data.mobile_no,
				name: data.name
			})
		};

		Axios(config)
			.then(function(response) {
				console.log(JSON.stringify(response.data));
				dispatch({
					type: LOGIN_REGISTER,
					payload: {
						name: response.data.name,
						email: response.data.email,
						mobile_no: response.data.mobile_no,
						address: response.data.address,
						isLoggedIn: true,
						token: 'TOKEN'
					}
				});
				alert('Registered Successfully');
			})
			.catch(function(error) {
				console.log(error);
			});
	};

	const logout = () => {};

	return (
		<AuthContext.Provider
			value={{
				userName: state.userName,
				email: state.email,
				isLoggedIn: state.isLoggedIn,
				token: state.token,
				address: state.address,
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
