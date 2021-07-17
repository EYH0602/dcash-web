import Input from "./input.js";
import { PageStatus } from "./dcash_enum.js";

export const getButtonText = status => {
	let text;
	switch (status) {
		case PageStatus.FirstLoad:
			text = "Login";
			break;
		case PageStatus.LoggedIn:
			text = "deposit";
			break;
		case PageStatus.Deposit:
			text = "send";
			break;
		case PageStatus.UpdateBalance:
			text = "Update Balance";
			break;
		default:
			text = "";
	}
	return text;
};

export const getInputJSX = status => {
	let dom;
	switch (status) {
		case PageStatus.FirstLoad:
			dom = (
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
			break;
		case PageStatus.LoggedIn:
			dom = (
				<div>
					card number: <input /> <br /> <br />
					expire date: <input /> <br /> <br />
					CVS: <input /> <br /> <br />
					amount: <input /> <br /> <br />
				</div>
			);
			break;
		case PageStatus.Deposit:
			dom = (
				<div>
					to: <input /> <br /> <br />
					amount: <input /> <br /> <br />
				</div>
			);
			break;
		default:
			dom = <div></div>;
	}
	return dom;
};

export const getNotification = (status, extra) => {
	let dom;
	switch (status) {
		case PageStatus.FirstLoad:
			dom = (<p>please login or register.</p>);
			break;
		case PageStatus.LoggedIn:
			dom = (
				<div>
					<h5>Welcome, {extra.username}. </h5>
					<p>
						Balance: {extra.balance} :)
					</p>
				</div>
			);
			break;
		case PageStatus.Deposit:
			break;
		default:
			dom = "";
	}
	return dom;
}

