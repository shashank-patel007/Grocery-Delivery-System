import React, { useReducer } from 'react';
import Axios from 'axios';
import AuthReducer from './AuthReducer';
import AuthContext from './AuthContext';

import { LOGIN_REGISTER, SIGN_OUT } from '../types';

const AuthState = (props) => {
	const initialState = {
		userName: '',
		email: '',
		number: '',
		address: '',
		isLoggedIn: false,
		token: ''
	};

	const [ state, dispatch ] = useReducer(AuthReducer, initialState);

	const login = (data) => {
		console.log('Logging In....');
		console.log('Succesfully Logged in');
		const options = {
			method: 'get',
			url: 'http://127.0.0.1:8000/api/profile/',
			transformRequest: [
				(data, headers) => {
					// transform the data

					return data;
				}
			]
		};
		Axios(options).then(
			(response) => {
				console.log(response);
			},
			(error) => {
				console.log(error);
			}
		);
		dispatch({
			type: LOGIN_REGISTER,
			payload: {
				userName: 'Chaitya',
				email: 'test@test.com',
				number: '9920451635',
				address: 'somewhere',
				token: 'TOKEN'
			}
		});
	};

	const register = (data) => {
		console.log('Logging In....');
		console.log('Succesfully Logged in');
		dispatch({
			type: LOGIN_REGISTER,
			payload: {
				userName: data.name,
				email: data.email,
				number: '9920451635',
				address: 'somewhere',
				token: 'TOKEN'
			}
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
