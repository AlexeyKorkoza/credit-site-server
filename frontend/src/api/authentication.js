import { BehaviorSubject } from 'rxjs';

import sender from './sender';
import { getItem } from "../core/localStorage";
import { logoutUser } from "../services/localDb";

const currentUserSubject = new BehaviorSubject(getItem('user', true));

/**
 * @param body {Object}
 * @return {Promise<any | void | never>}
 */
const logIn = body => {
    const url = `${API_URL}/auth/login`;

    return sender(url, 'post', body)
        .then(result => {
            currentUserSubject.next(result);

            return result;
        });
};

/**
 * @return {Promise<any | void>}
 */
// TODO remove item data from localstorage
const logOut = () => {
    const url = `${API_URL}/auth/logout`;

    return sender(url, 'get')
        .then(() => {
            logoutUser('key');
            currentUserSubject.next({});
        })
        .catch(err => console.error(err.message, 'logOut'));
};

export {
    currentUserSubject,
    logIn,
    logOut,
};
