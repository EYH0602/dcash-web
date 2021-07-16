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

export const parser = obj => {
	var urlencoded = [];
	for (var key in obj) {
		urlencoded.push(key + '=' + obj[key]);
	}
	return urlencoded.join('&');
}