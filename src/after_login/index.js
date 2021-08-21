import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import { getAccountInfo } from '../utils/http_util';

const routes = [
    {
        path: "/session/",
        exact: true,
        sidebar: () => <div>HOME</div>,
        main: () => <h2>HOME</h2>,
    },
    {
        path: "/session/deposit",
        sidebar: () => <div>DEPOSIT</div>,
        main: () => <h2>Deposit</h2>,
    },
    {
        path: "/session/transfer",
        sidebar: () => <div>TRANSFER</div>,
        main: () => <h2>Transfer</h2>,
    },
    {
        path: "/session/email",
        sidebar: () => <div>UPDATE Email</div>,
        main: () => <h2>Update Email</h2>
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
    const getBalance = async () => {
        const data = await getAccountInfo(session);
        storage.setItem('balance', data.balance);
    }
    getBalance();
    console.log(storage.getItem('balance'));


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
                                        <p>Welcome, {username}. Your balance is 100.</p>
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
