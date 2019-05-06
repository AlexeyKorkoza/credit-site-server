import axios from 'axios';

const logIn = data => {
    return axios.post(`${API_URL}/auth/login`, data)
        .then(result => result.data);
};

export {
    logIn,
};
