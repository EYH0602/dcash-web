import Input from "./input.js";

export const getButtonText = (id) => {
	let text;
	switch (id) {
		case 1:
			text = "Login";
			break;
		case 2:
			text = "deposit";
			break;
		case 3:
			text = "send";
			break;
		default:
			text = "";
	}
	return text;
};

export const getInputJSX = (state) => {
	let dom;
	switch (state) {
		case 1:
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
		case 2:
			dom = (
				<div>
					card number: <input /> <br /> <br />
					expire date: <input /> <br /> <br />
					CVS: <input /> <br /> <br />
					amount: <input /> <br /> <br />
				</div>
			);
			break;
		case 3:
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

