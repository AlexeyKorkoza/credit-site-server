import { client } from '../models';

/**
 * @param adminId
 * @param clientId
 * @param body
 */
const makeUpdatingOfClient = (adminId, clientId, body) => {
    const {
        name,
        passportData: passport_data,
        phone,
        email,
        territory,
    } = body;

    const data = {
        name,
        passport_data,
        phone,
        email,
        territory,
        admin_id: adminId,
    };

    const query = {
        where: {
            id: clientId,
        },
    };

    return client.update(data, query);
};

/**
 * @param adminId
 * @param clientId
 */
const makeRemovingOfClient = (adminId, clientId) => {
    const query = {
        where: {
            id: clientId,
        },
    };

    const data = {
        admin_id: adminId,
        is_removed: true,
    };

    return client.update(data, query);
};

export {
    makeUpdatingOfClient,
    makeRemovingOfClient,
};
