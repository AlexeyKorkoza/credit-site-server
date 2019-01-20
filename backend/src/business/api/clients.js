import { Client } from '../../models/index';

/**
 * @param body
 * @param managerId
 * @returns {data}
 */
const makeCreatingOfClient = (body, managerId) => {
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
        manager_id: managerId,
    };

    return Client.create(data);
};

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

    return Client.update(data, query);
};

/**
 * @param id
 * @param body
 * @param managerId
 */
const makeMarkingDeletionOfClient = (id, body, managerId) => {
    const query = {
        where: {
            id,
        },
    };

    const { isRemoved } = body;

    const data = {
        is_removed: isRemoved,
        manager_id: managerId,
    };

    return Client.update(data, query);
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

    return Client.update(data, query);
};

export {
    makeCreatingOfClient,
    makeUpdatingOfClient,
    makeMarkingDeletionOfClient,
    makeRemovingOfClient,
};
