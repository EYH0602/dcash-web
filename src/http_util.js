// import axios from "axios";

// const login = user => {
    // axios.post('http://localhost:8080/auth-tokens', {
    //     body: parser(user),
    // }).then(
    //     response => {
    //         var resp = response.data;
    //         console.log('Processing Request');
    //         return resp;
    //     }
    // ).catch(err => console.log(err));
// }

export const getUserUrlencoded = obj => {
    var urlencoded = [];
    urlencoded.push('username=' + obj['username']);
    urlencoded.push('password=' + obj['password']);
    return urlencoded.join('&');
}

const mainURL = 'http://localhost:8080';
export const getURL = path => mainURL + path;

export const parser = obj => {
	var urlencoded = [];
	for (var key in obj) {
		urlencoded.push(key + '=' + obj[key]);
	}
	return urlencoded.join('&');
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
