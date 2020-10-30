import React, { useReducer } from 'react';
import Axios from 'axios';
import AuthContext from './AuthContext';

import { SetUser, TokenService } from '../../services/storage.service';

const AuthState = (props) => {
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
		let res = {};

		await Axios(config)
			.then((response) => {
				console.log(JSON.stringify(response.data));
				res.success = true;
				SetUser.saveUser({
					name: response.data.name,
					email: response.data.email,
					mobile_no: response.data.mobile_no,
					address: response.data.address
				});
				TokenService.saveToken(response.data.token);
			})
			.catch((error) => {
				res.success = false;
				res.error = error.response.data;
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
		let res = {};

		await Axios(config)
			.then(function(response) {
				console.log(JSON.stringify(response.data));
				res = login({ email: data.email, password: data.password });
			})
			.catch((error) => {
				console.log(error.response.data);
				res.success = false;
				res.error = error.response.data;
			});
		return res;
	};

	return (
		<AuthContext.Provider
			value={{
				login,
				register
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
