import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { Home } from './home';
import { Deposit } from './deposit';
import { Transfer } from './transfer';
import { Email } from './email';

const routes = [
    {
        path: "/session/",
        exact: true,
        sidebar: () => <div>HOME</div>,
        main: () => <Home />,
    },
    {
        path: "/session/deposit",
        sidebar: () => <div>DEPOSIT</div>,
        main: () => <Deposit />,
    },
    {
        path: "/session/transfer",
        sidebar: () => <div>TRANSFER</div>,
        main: () => <Transfer />,
    },
    {
        path: "/session/email",
        sidebar: () => <div>UPDATE Email</div>,
        main: () => <Email />,
    },
    {
        path: "/",
        exact: true,
        sidebar: () => <div>LOGOUT</div>,
        main: () => <h2>Logout</h2>,
    },
];

const AfterLoginPage = props => {
    const storage = window.localStorage;
    const username = storage.getItem('username');
    const auth_token = storage.getItem('auth_token');
    const user_id = storage.getItem('user_id');
    const session = {
        auth_token: auth_token,
        user_id: user_id,
    };

    return (
        <BrowserRouter>
            <div style={{ display: "flex" }}>
                <div
                    style={{
                        padding: "10px",
                        width: "100px",
                        background: "pink"
                    }}
                >
                    <ul style={{ listStyleType: "none", padding: 0 }}>
                        <li><Link to="/session/">Home</Link></li>
                        <li><Link to="/session/deposit">Deposit</Link></li>
                        <li><Link to="/session/transfer">Transfer</Link></li>
                        <li><Link to="/session/email">Email</Link></li>
                    </ul>
                </div>
                <div style={{ flex: 1, padding: "10px" }}>
                    <Switch>
                        {routes.map((route, index) => (
                            <Route
                                key={index}
                                path={route.path}
                                exact={route.exact}
                                children={
                                    <div>
                                        <route.main />
                                        <p>dcash</p>
                                    </div>
                                }
                            />
                        ))}
                    </Switch>
                </div>
            </div>
        </BrowserRouter>
    );
}

export default AfterLoginPage;
