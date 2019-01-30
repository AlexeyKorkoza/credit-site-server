import { Client } from '../../models';

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
 * @param userId
 * @param clientId
 * @param body
 * @param role
 */
const makeUpdatingOfClient = (userId, clientId, body, role) => {
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
    };

    if (role === 'manager') {
        data.manager_id = userId;
    } else {
        data.admin_id = userId;
    }

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

/**
 * @param clientId
 * @param managerId
 * @return {Promise.<Model>}
 */
const findClientOnManager = (clientId, managerId) => {
    const query = {
        where: {
            id: clientId,
            manager_id: managerId,
        },
    };

    return Client.findOne(query);
};

export {
    makeCreatingOfClient,
    makeUpdatingOfClient,
    makeMarkingDeletionOfClient,
    makeRemovingOfClient,
    findClientOnManager,
};
