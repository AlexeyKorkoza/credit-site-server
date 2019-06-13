import { Manager } from '../../models';
import { encryptor } from '../../core/crypto';

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
 * @param id {Number}
 * @param password {Boolean}
 * @returns {Promise.<Model>}
 */
const findManager = (id, password = false) => {
    const query = {
        where: {
            id,
        },
        attributes: [
          'full_name',
          'territory',
          'phone',
          'login',
          'email',
          'is_blocked',
        ],
        plain: true,
    };

    if (password) {
        query.attributes.push('password');
    }

    return Manager.findOne(query)
        .then(result => {
            const manager = {
                fullName: result.full_name,
                territory: result.territory,
                phone: result.phone,
                login: result.login,
                email: result.email,
                isBlocked: result.is_blocked,
            };

            if (password) {
                manager.password = result.password;
            }

            return manager;
        })
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
        email,
    } = body;

    const data = {
        full_name: fullName,
        territory,
        phone,
        login,
        email,
    };
    const query = {
        where: {
            id,
        },
    };

    return Manager.update(data, query);
};

/**
 * @param limit {Number}
 * @param offset {Number}
 * @return {Promise<Model<any, any>[]>}
 */
const findAllManagers = (limit = 25, offset = 0) => {
    const query = {
        attributes: [
          'id',
          'email',
          'full_name',
          'is_blocked',
          'login',
        ],
        limit,
        offset,
    };

    return Manager.findAll(query);
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
    findAllManagers,
};
