import React from 'react';
import ReactDOM from 'react-dom';
import Button from '@material-ui/core/Button'
import Input from "./input.js";
import { getUserUrlencoded, getURL, getAccountInfo } from './http_util';
import { PageStatus } from './dcash_enum';
import Demo from './tab';
import './style.css';

const MainButton = (props) => {
	const { onClick, currentStatus } = props;
	const text = currentStatus === PageStatus.FirstLoad ? 'Login' : 'Logout';
	return (
		<Button
			variant="contained"
			color="primary"
			size="large"
			style={{ margin: "0 auto", display: "flex" }}
			onClick={event => onClick(event)}
		>
			{text}
		</Button>
	);
}

const InputFields = (props) => {
	const { currentStatus } = props;
	const inputDOM = (
		<div>
			<Input
				id='username'
				label="username"
				predicted="user"
				locked={false}
				active={false}
			/> <br />
			<Input
				id='password'
				label="password"
				predicted="*****"
				locked={false}
				active={false}
			/> <br />
		</div>
	);
	const tabDOM = (
		<div>
			<Demo
				className="input"
				style={{ display: 'flex', margin: "0 auto" }}
			/> <br />
		</div>
	);
	return currentStatus === PageStatus.FirstLoad ? inputDOM : tabDOM;
}

const Header = () => {
	return (
		<h1 className="header">Dcash Wallet</h1>
	);
}

const Notification = (props) => {
	const { currentStatus, extraInfo } = props;
	let dom;
	if (currentStatus === PageStatus.FirstLoad) {
		dom = (<p>please login or register.</p>);
	} else {
		dom = (
			<div>
				<h5>
					Welcome, {extraInfo.username}.
					Balance: {extraInfo.balance} :)
				</h5>
			</div>
		);
	}
	return (
		<div className="notification">
			{dom}
			<br />
		</div>
	);
}

class Page extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: PageStatus.FirstLoad,
			session: props.session,
			balance: {
				isClean: false,
				amount: 0,
			},
			email: {
				isClean: false,
				value: '',
			},
		};
		this.extra = {};
		this.balance = 999;
	}

	handleInput = field => {
		this.extra[ field ] = document.getElementById(field).value;
	}

	handleClick = () => {
		switch (this.state.status) {
			case PageStatus.FirstLoad:
				this.handleInput('username');
				this.handleInput('password');
				this.login(getUserUrlencoded(this.extra));
				break;
			case PageStatus.LoggedIn:
				break;
			case PageStatus.Deposit:
				break;
			case PageStatus.Transfer:
				break;
			case PageStatus.SetEmail:
				break;
			default: break;
		}
	}


	async login (user) {
		const resp = await fetch(getURL('/auth-tokens'), {
			method: 'POST',
			body: user,
		});
		const data = await resp.json();
		this.setState({
			status: PageStatus.LoggedIn,
			session: data,
		});
		console.log(this.state.session);
	}

	componentDidUpdate () {
		const updateInfo = async () => {
			if (this.state.session && !(this.state.balance.isClean && this.state.email.isClean)) {
				const resp = await getAccountInfo(this.state.session);
				this.setState({
					balance: {
						isClean: true,
						amount: resp.balance,
					},
					email: {
						isClean: true,
						value: resp.email,
					},
				});
			}
		};
		setInterval(updateInfo, 1000);
	}

	render () {

		var extra = {};
		Object.assign(extra, this.extra);
		extra[ 'balance' ] = this.state.balance.amount; //this.getBalance();

		return (
			<div>
				<Header />
				<Notification currentStatus={this.state.status} extraInfo={extra} />
				<InputFields currentStatus={this.state.status} />
				<MainButton onClick={this.handleClick} currentStatus={this.state.status} />
			</div>
		);
	}
}

ReactDOM.render(
	<Page />,
	document.getElementById('root')
)

