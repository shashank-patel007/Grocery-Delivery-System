import React, { useState, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	textfield: {
		marginTop: '30px '
	}
});

const Login = (props) => {
	const classes = useStyles();
	const { values, handleInputChange } = props;
	const [ showPassword, setShowPassword ] = useState(false);

	const handleClickShowPassword = () => {
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<Fragment>
			<TextField
				id='login-email'
				type='email'
				color='primary'
				value={values.email}
				label='E-Mail'
				onChange={handleInputChange('email')}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end' style={{ padding: '12px' }}>
							<EmailIcon />
						</InputAdornment>
					)
				}}
			/>
			<TextField
				id='sloginpassword'
				className={classes.textfield}
				type={showPassword ? 'text' : 'password'}
				color='primary'
				value={values.password}
				label='Password'
				onChange={handleInputChange('password')}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={handleClickShowPassword}
								onMouseDown={handleMouseDownPassword}
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					)
				}}
			/>
		</Fragment>
	);
};

export default Login;
