import { Admin } from '../../models';

/**
 * @param id {Number}
 * @return {Promise<Model<any, any> | null> | Promise<Model<any, any>>}
 */
const findAdminData = id => {
    const adminQuery = {
        where: {
            id,
        },
        attributes: [
            'full_name',
            'territory',
            'phone',
            'login',
            'email',
        ],
        plain: true,
    };

    return Admin.findOne(adminQuery);
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
