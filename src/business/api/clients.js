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
 * @param clientId {Number}
 */
const makeRemovingOfClient = clientId => {
    const query = {
        where: {
            id: clientId,
        },
    };

    return Client.destroy(query);
};

/**
 * @param clientId {Number}
 * @param managerId {Number}
 * @param role {String}
 * @return {Promise.<Model>}
 */
const findClient = (clientId, managerId, role) => {
    const query = {
        where: {
            id: clientId,
        },
        attributes: [
            'id',
            'email',
            'is_removed',
            'name',
            'passport_data',
            'phone',
            'territory',
        ],
    };

    if (role === 'manager') {
        query.where.manager_id = managerId;
    }

    return Client.findOne(query)
        .then(client => {
            const result = {
                id: client.id,
                email: client.email,
                isRemoved: client.is_removed,
                name: client.name,
                passportData: client.passport_data,
                phone: client.phone,
            };

            if (role !== 'manager') {
                result.territory = client.territory;
            }

            return result;
        });
};

const findAllClients = () => {
  const query = {
      attributes: [
          'id',
          'email',
          'name',
      ],
  };

  return Client.findAll(query);
};

export {
    makeCreatingOfClient,
    makeUpdatingOfClient,
    makeMarkingDeletionOfClient,
    makeRemovingOfClient,
    findClient,
    findAllClients,
};
