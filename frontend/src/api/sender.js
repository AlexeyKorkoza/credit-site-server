import ky from 'ky';

import { getDataAuthUser } from '../services/localDb';

/**
 * @param url {String}
 * @param method {String}
 * @param data {Object | null}
 * @return {Promise<any | void>}
 */
const senderApiRequest = (url, method, data = null) => {
    const { accessToken } = getDataAuthUser();
    const options = {
        method,
        headers: new Headers({
            'content-type': 'application/json',
            'access-token': accessToken,
        }),
    };

    if (method === 'post' || method === 'put') {
        options.json = data;
    }

    return ky(url, options)
        .then(result => result.json())
        .catch(err => console.error(err.message, 'Error when sending Api request'));
};

export default senderApiRequest;
