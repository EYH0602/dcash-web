import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import B4LoginPage from './b4_login'
import AfterLoginPage from './after_login';

const App = () => {
	return (
		<BrowserRouter>
			<div>
				<Switch>
					<Route path="/session">
						<AfterLoginPage />
					</Route>
					<Route path="/">
						<B4LoginPage />
					</Route>
				</Switch>
			</div>
		</BrowserRouter>
	);
}

render(
	<App />,
	document.getElementById('root')
)
