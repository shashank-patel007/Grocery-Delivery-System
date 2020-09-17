import React, { useState, Fragment } from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import PersonIcon from '@material-ui/icons/Person';
import EmailIcon from '@material-ui/icons/Email';
import IconButton from '@material-ui/core/IconButton';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	textfield: {
		marginTop: '30px '
	}
});

const Register = (props) => {
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
				id='register-username'
				type='text'
				color='primary'
				required
				value={values.name}
				label='User Name'
				onChange={handleInputChange('name')}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end' style={{ padding: '12px' }}>
							<PersonIcon />
						</InputAdornment>
					)
				}}
			/>
			<TextField
				id='register-email'
				type='email'
				className={classes.textfield}
				required
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
				id='register-password'
				className={classes.textfield}
				type={showPassword ? 'text' : 'password'}
				color='primary'
				required
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
			<TextField
				id='register-mobileno'
				type='tel'
				className={classes.textfield}
				color='primary'
				required
				value={values.mobile_no}
				label='Mobile Number'
				onChange={handleInputChange('mobile_no')}
				InputProps={{
					endAdornment: (
						<InputAdornment position='end' style={{ padding: '12px' }}>
							<PhoneIphoneIcon />
						</InputAdornment>
					)
				}}
			/>
		</Fragment>
	);
};

export default Register;
