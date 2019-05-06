import ky from 'ky';

const logIn = data => {
    return ky.post(`${API_URL}/auth/login`, { json: data })
        .then(result => result.json());
};

export {
    logIn,
};
