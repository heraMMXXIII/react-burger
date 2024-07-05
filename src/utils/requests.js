function checkResponse(res) {

    return res.json();
}

export function request(url, options) {
    return fetch(url, options).then(checkResponse);
}

