import ky from 'ky';

import sender from './sender';

const logIn = data => {
    return ky.post(`${API_URL}/auth/login`, { json: data })
        .then(result => result.json());
};

/**
 * @return {Promise<any | void>}
 */
const logOut = () => {
    const url = `${API_URL}/auth/logout`;

    return sender(url, 'post')
        .catch(err => console.error(err.message, 'logOut'));
};

export {
    logIn,
    logOut,
};
