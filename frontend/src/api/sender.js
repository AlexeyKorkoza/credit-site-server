import ky from 'ky';

import { getDataAuthUser } from '../services/localDb';

/**
 * @param url {String}
 * @param method {String}
 * @param data {Object | null}
 * @return {Promise<any | void>}
 */
const senderApiRequest = (url, method, data = null) => {
    const userData = getDataAuthUser();
    const options = {
        method,
    };
    const headers = new Headers({
        'content-type': 'application/json',
    });

    if (userData) {
        const { accessToken } = userData;
        headers.set('access-token', accessToken);
    }

    options.headers = headers;

    if (method === 'post' || method === 'put') {
        options.json = data;
    }

    return ky(url, options)
        .then(result => result.json())
        .catch(err => console.error(err.message, 'Error when sending Api request'));
};

export default senderApiRequest;
