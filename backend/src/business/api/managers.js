import { Manager } from '../../models';

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
const makeBlockingOfManager = (adminId, managerId) => {
    const query = {
        where: {
            id: managerId,
        },
    };

    const data = {
        is_blocked: true,
        admin_id: adminId,
    };

    return Manager.update(data, query);
};

const increaseInputCount = (login, user) => {
    const query = {
        where: {
            login,
        },
    };

    const data = Object.assign({},
        user,
        { input_count: user.input_count + 1 },
    );
    if (data.input_count > 4) {
        data.is_blocked = true;
    }

    return Manager.update(query, data);
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

    return Manager.update(query, data);
};

export {
    makeUpdatingManagerAttributes,
    makeBlockingOfManager,
    increaseInputCount,
    authManager,
};
