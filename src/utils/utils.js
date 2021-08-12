export const parser = (obj) => {
    var res = '';
    for (let key in obj) {
        res += key + "=" + obj[key] + '&';
    }
    return res.slice(0, -1);
}