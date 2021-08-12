import React, { useRef } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from 'react-router';
import { Button, TextField } from '@material-ui/core'
import Input from "../utils/input.js";
import { getUserUrlencoded, getURL, getAccountInfo, login } from '../utils/http_util';
import { PageStatus } from '../utils/dcash_enum';
import Demo from './tab';
import '../style.css';

const B4LoginPage = props => {
	const inputForm = useRef(null);
	const history = useHistory();
	const handleClick = () => {
		const form = inputForm.current;
		const username = form.username.value;
		const password = form.password.value;
		const storage = window.localStorage;
		storage.setItem('username', username);
		storage.setItem('password', password);
		const getData = async () => {
			const data = await login({
				username: username,
				password: password,
			});
			storage.setItem('auth_token', data.auth_token);
			storage.setItem('user_id', data.user_id);
		}
		getData();
		history.push("\session");
	}
	return (
		<div>
			<h1 className="header">Dcash Wallet</h1>
			<form ref={inputForm}>
				<TextField
					label="username"
					name="username"
				/> <br />
				<TextField
					label="password"
					name="password"
				/> <br />
			</form>
			<Button
				variant="contained"
				color="primary"
				size="large"
				style={{ margin: "0 auto", display: "flex" }}
				onClick={handleClick}
			>
				Login
			</Button>
		</div>
	);
}

export default B4LoginPage;


