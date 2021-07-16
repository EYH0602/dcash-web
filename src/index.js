import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button'
import { getButtonText, getInputJSX } from './func_util'
import { parser } from './http_util';
import './style.css';

var xhr = new XMLHttpRequest();

const MainButton = (props) => {
	const { onClick, currentState } = props;
	return (
		<Button
			variant="contained" 
			color="primary"
			size="large"
			style={{margin: "0 auto", display: "flex"}}
			onClick={event => onClick(event)}
		>
			{getButtonText(currentState)}
		</Button>
	);
}

const InputFields = (props) => {
	const { currentState } = props;
	return (
		getInputJSX(currentState)
	);
}

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: 1,
			session: props.session,
		};
	}

	handleClick = () => {
		if (this.state.status === 1) {
			const user = {
				username: document.getElementById('username').value,
				password: document.getElementById('password').value,
			};
			this.login(user);
		}
	}

	login = user => {
		xhr.addEventListener('load', () => {
			if (xhr.status >= 400 && xhr.status <= 405) {
				window.alert(xhr.status);
				console.log("error: " + xhr.status);
				return;
			}
			this.setState({
				status: 2,
				session: JSON.parse(xhr.responseText),
			});
		});
		xhr.open('POST', 'http://localhost:8080/auth-tokens');
		xhr.send(parser(user));
	}

	render () {
		return (
			<div>
				<h1>DCASH Wallet</h1>
				<InputFields currentState={this.state.status} />
				<MainButton onClick={this.handleClick} currentState={this.state.status} />
			</div>
		);
	}
}

ReactDOM.render(
	<Page />,
	document.getElementById('root')
)

