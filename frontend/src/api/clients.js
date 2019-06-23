import sender from './sender';

/**
 * @param id {Number}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const deleteClient = id => {
    return sender(`${API_URL}/api/v1/clients/${id}`, 'delete')
        .catch(err => console.error(err.message, 'deleteClient'));
};

/**
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const getAllClients = () => {
  return sender(`${API_URL}/api/v1/clients`, 'get')
      .catch(err => console.error(err.message, 'getAllClients'));
};

/**
 * @param id {Number}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const getClient = id => {
    return sender(`${API_URL}/api/v1/clients/${id}`, 'get')
        .catch(err => console.error(err.message, 'getClient'));
};

const markClientForDeletion = id => {
    return sender(`${API_URL}/api/v1/clients/${id}/deletion`, 'put', {})
        .catch(err => console.error(err.message, 'markClientForDeletion'));
};

/**
 * @param body {Object}
 * @param id {Number | null}
 * @return {Promise|Q.Promise<void>|*|Promise<T | void>}
 */
const saveClient = (body, id = null) => {
    if (id) {
        return sender(`${API_URL}/api/v1/clients/${id}`, 'put', body)
            .catch(err => console.error(err.message, 'saveClient'));
    }

    return sender(`${API_URL}/api/v1/clients`, 'post', body)
        .catch(err => console.error(err.message, 'saveClient'));
};

export {
    deleteClient,
    getAllClients,
    getClient,
    markClientForDeletion,
    saveClient,
};
