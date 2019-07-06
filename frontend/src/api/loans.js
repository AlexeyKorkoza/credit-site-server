import sender from './sender';

/**
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const getAllLoans = () => {
    return sender(`${API_URL}/api/v1/loans`, 'get')
        .catch(err => console.error(err.message, 'getAllLoans'));
};

/**
 * @param id {Number}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const getLoan = id => {
    return sender(`${API_URL}/api/v1/loans/${id}`, 'get')
        .catch(err => console.error(err.message, 'getLoan'));
};

/**
 * @param body {Object}
 * @param id {Number | null}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const saveLoan = (body, id = null) => {
    if (id) {
        return sender(`${API_URL}/api/v1/loans/${id}`, 'put', body)
            .catch(err => console.error(err.message, 'saveLoan'));
    }

    return sender(`${API_URL}/api/v1/loans`, 'post', body)
        .catch(err => console.error(err.message, 'saveLoan'));
};

export {
    getAllLoans,
    getLoan,
    saveLoan,
};
