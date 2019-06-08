import sender from "./sender";

/**
 * @param id {Number}
 * @return {Promise<any | void>}
 */
const getManager = id => {
    return sender(`${API_URL}/api/v1/managers/${id}`, 'get')
        .catch(err => console.error(err.message, 'getManagers'));
};

const getManagers = () => {
    return sender(`${API_URL}/api/v1/managers`, 'get')
        .catch(err => console.error(err.message, 'getManagers'));
};

export {
    getManager,
    getManagers,
};
