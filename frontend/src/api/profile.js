import ky from 'ky';

const routes = {
    'admin': '/admins',
    'manager': '/managers',
};

/**
 * @param role {String}
 * @param id {Number}
 * @return {Promise<any | Response>|null}
 */
const getProfileUser = (role, id) => {
    if (!role) {
        return null;
    }

    const route = routes[role];

    return ky.get(`${API_URL}${route}/${id}`)
        .then(result => result.json())
        .catch(err => console.error(err.message, 'getProfileUser'));
};

/**
 * @param role {String}
 * @param id {Number}
 * @param body {Object}
 * @return {Promise<any | Response>|null}
 */
const updateProfileUser = (role, id, body) => {
    if (!role) {
        return null;
    }

    const route = routes[role];

    return ky.put(`${API_URL}${route}/${id}`, { json: body })
        .then(result => result.json())
        .catch(err => console.error(err.message, 'getProfileUser'));
};

/**
 * @param role {String}
 * @param id {Number}
 * @param body {Object}
 * @return {Promise<any | Response>|null}
 */
const updatePasswordsProfileUser = (role, id, body) => {
    if (!role) {
        return null;
    }

    const route = routes[role];

    return ky.put(`${API_URL}${route}/${id}/change-password`, { json: body })
        .then(result => result.json())
        .catch(err => console.error(err.message, 'getProfileUser'));
};

export {
    getProfileUser,
    updateProfileUser,
    updatePasswordsProfileUser,
}
