import React from 'react';
import ReactDOM from 'react-dom';
import { parser } from './utils.js';

class LoginPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogIn: false,
            session: {
                auth_token: null,
                user_id: null,
            },
            user: {
                username: null,
                password: null,
                balance: null,
                email: null,
            }
        };
    }

    setUsername (username) {
        this.setState({
            isLogIn: this.state.isLogIn,
            session: this.state.session,
            user: {
                username: username,
                password: this.state.user.password,
            },
        });
    }

    setPassword (password) {
        this.setState({
            isLogIn: this.state.isLogIn,
            session: this.state.session,
            user: {
                username: this.state.user.username,
                password: password,
            },
        });
    }

    login () {
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            this.setState({
                isLogIn: true,
                session: JSON.parse(xhr.responseText),
                user: this.state.user,
            })
            console.log(this.state.session);
        });
        xhr.open('POST', 'http://localhost:8080/auth-tokens');
        xhr.send(parser(this.state.user));
    }

    getBalance() {
        if (this.state.user.balance) {
            return this.state.user.balance;
        }
        var xhr = new XMLHttpRequest();
        xhr.addEventListener('load', () => {
            var resp = JSON.parse(xhr.responseText);
            this.setState({
                isLogIn: this.state.isLogIn,
                session: this.state.session,
                user: {
                    username: this.state.user.username,
                    password: this.state.user.password,
                    email: resp.email,
                    balance: resp.balance,
                }
            });
            console.log(resp);
            return this.state.user.balance;
        });
        xhr.open('get', 'http://localhost:8080/users/' + this.state.session.user_id);
        xhr.setRequestHeader('x-auth-token', this.state.session.auth_token);
        xhr.send();
    }

    transfer() {
        console.log('transfer!');
    }

    deposit() {
        console.log('deposit!');
    }

    render () {
        if (!this.state.isLogIn) {
            return (
                <div>
                    username: <input onChange={event => this.setUsername(event.target.value)} /> <br />
                    password: <input onChange={event => this.setPassword(event.target.value)} /> <br />
                    <button onClick={() => { this.login() }}>login</button>
                </div>
            );
        }
        return (
            <p>
                Hello! You have {this.getBalance()}. <br />

                <button onClick={() => {this.transfer()}}>Transfer</button>
                <button onClick={() => {this.deposit()}}>Deposit</button>
            </p>
        );
    }
}

// ============================================================

ReactDOM.render(
    <LoginPage />,
    document.getElementById('root')
)
