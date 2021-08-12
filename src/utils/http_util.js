// import axios from "axios";

export const getUserUrlencoded = obj => {
    var urlencoded = [];
    urlencoded.push('username=' + obj['username']);
    urlencoded.push('password=' + obj['password']);
    return urlencoded.join('&');
}

const mainURL = 'http://localhost:8080';
export const getURL = path => mainURL + path;

const parser = obj => {
	var urlencoded = [];
	for (var key in obj) {
		urlencoded.push(key + '=' + obj[key]);
	}
	return urlencoded.join('&');
}

export async function login(user) {
    const resp = await fetch(getURL('/auth-tokens'), {
        method: 'POST',
        body: parser(user),
    });
    const data = await resp.json();
    return data;
}

export async function getAccountInfo(session) {
    const resp = await fetch(getURL('/users/' + session.user_id), {
        method: 'GET',
        headers: {
            'x-auth-token': session.auth_token,
        },
    });
    const data = await resp.json();
    console.log(data);
    return data;
}

export async function updateEmail(session, email) {
    const resp = await fetch(getURL('/users/' + session.user_id), {
        method: 'PUT',
        headers: {
            'x-auth-token': session.auth_token,
        },
        body: parser({
            email: email,
        }),
    });
    const data = await resp.json();
    console.log(data);
    return data;
}

function getStripeToken(card_info) {

}

export async function deposit(session, card_info, amount) {
    const token = await getStripeToken(card_info);
    const resp = await fetch(getURL('/deposits'), {
        method: 'POST',
        headers: {
            'x-auth-token': session.auth_token,
        },
        body: parser({
            amount: amount,
            stripe_token: token,
        }),
    });
    const data = await resp.json();
    console.log(data);
    return data;
}
