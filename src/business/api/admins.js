import { Admin } from '../../models';

/**
 * @param id {Number}
 * @param password {Boolean}
 * @return {Promise<Model<any, any> | null> | Promise<Model<any, any>>}
 */
const findAdminData = (id, password = false) => {
    const adminQuery = {
        where: {
            id,
        },
        attributes: [
            'login',
        ],
        plain: true,
    };

    if (password) {
        adminQuery.attributes.push('password');
    }

    return Admin.findOne(adminQuery)
        .then(result => {
            const admin = {
                login: result.login,
            };

            if (password) {
                admin.password = result.password;
            }

            return admin;
        });
};

/**
 * @param id {Number}
 * @param data {Object}
 * @return {*}
 */
const makeUpdatingAdmin = (id, data) => {
    const adminQuery = {
        where: {
            id,
        },
        plain: true,
    };

    return Admin.update(data, adminQuery);
};

export {
    findAdminData,
    makeUpdatingAdmin,
};
