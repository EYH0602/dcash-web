import React from 'react';
import { BottomNavigation, BottomNavigationAction } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import RestoreIcon from '@material-ui/icons/Restore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

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
        path: "/",
        exact: true,
        sidebar: () => <div>LOGOUT</div>,
        main: () => <h2>Logout</h2>,
    },
];

const AfterLoginPage = props => {
    const storage = window.localStorage;
    const auth_token = storage.getItem('auth_token');
    const user_id = storage.getItem('user_id');
    const username = storage.getItem('username');

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
                                        <p>Welcome, {username}</p>
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
