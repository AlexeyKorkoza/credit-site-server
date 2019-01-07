import sequelize from 'sequelize';

import { Manager } from '../../models';
import { encryptor } from '../../core/crypto';

const { Op } = sequelize;

/**
 * @param adminId
 * @param body
 * @returns {data}
 */
const makeCreatingOfManager = (adminId, body) => {
    const {
        fullName: full_name,
        territory,
        phone,
        login,
        password,
        email,
    } = body;
    const data = {
        full_name,
        territory,
        phone,
        login,
        password,
        email,
        admin_id: adminId,
    };

    data.password = encryptor(data.password);

    return Manager.create(data);
};

/**
 * @param managerId
 * @param body
 */
const makeUpdatingManagerAttributes = (managerId, body) => {
    const query = {
        where: {
            id: managerId,
        },
    };

    const {
        fullName: full_name,
        territory,
        phone,
        login,
        password,
        email,
    } = body;
    const data = {
        full_name,
        territory,
        phone,
        login,
        password,
        email,
    };

    return Manager.update(data, query);
};

/**
 * @param adminId
 * @param managerId
 */
const makeBlockingOfManager = (adminId = null, managerId) => {
    const query = {
        where: {
            id: managerId,
        },
    };

    const data = {
        is_blocked: true,
    };

    if (adminId) {
        data.admin_id = adminId;
    }

    return Manager.update(data, query);
};

const increaseInputCount = (login, user) => {
    const query = {
        where: {
            login,
        },
        returning: true,
        plain: true,
    };

    const data = Object.assign({},
        user,
        { input_count: user.input_count + 1 },
    );
    if (data.input_count > 4) {
        data.is_blocked = true;
    }

    return Manager.update(data, query);
};

const authManager = (user, login) => {
    const query = {
        where: {
            login,
        },
    };

    const data = Object.assign({},
        user,
        { input_count: 0 },
    );

    return Manager.update(data, query);
};

/**
 * @param id
 * @returns {Promise.<Model>}
 */
const findManager = id => {
    const query = {
        where: {
            id,
        },
        plain: true,
    };

    return Manager.findOne(query);
};

/**
 * @param data
 * @param id
 */
const updateManagerPassword = (data, id) => {
    const query = {
        where: {
            id,
        },
    };

    return Manager.update(data, query);
};

/**
 * @param body
 * @param id
 */
const makeUpdatingProfileManager = (body, id) => {
    const {
        fullName,
        territory,
        phone,
        login,
        role,
        email,
        isBlocked,
    } = body;

    const data = {
        full_name: fullName,
        territory,
        phone,
        login,
        email,
        isBlocked,
    };
    const query = {
        where: {
            id,
        },
    };

    return Manager.update(data, query);
};

export {
    makeCreatingOfManager,
    makeUpdatingManagerAttributes,
    makeBlockingOfManager,
    increaseInputCount,
    authManager,
    findManager,
    updateManagerPassword,
    makeUpdatingProfileManager,
};
