import {
    comparePasswords,
    encryptPassword,
} from '../../utils/passwords';
import {
    makeCreatingOfManager,
    makeBlockingOfManager,
    makeUpdatingManagerAttributes,
    findManager,
    updateManagerPassword,
    makeUpdatingProfileManager,
} from '../../business/api/managers';

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const createNewManager = (req, res) => {
    // @TODO Add validation

    const { user_id: admin_id } = req.user;

    return makeCreatingOfManager(admin_id, req.body)
        .then(() => res.status(200).json({
            ok: 1,
            message: 'Manager was created',
        }))
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const updateAttributesManager = (req, res) => {
    const { id } = req.params;
    const body = req.body;

    return makeUpdatingManagerAttributes(id, body)
        .then(() => res.status(200).json({
            ok: 1,
            message: 'Manager`s attributes is updated',
        }))
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const updateProfileManager = (req, res) => {
    const { id: managerId } = req.params;
    const data = req.body;
    const { role } = req.user;

    // @TODO Add validation

    return makeUpdatingProfileManager(data, managerId)
        .then(result => {
            if (result) {
                return res.status(200).json({
                    ok: 1,
                    message: `${role} is updated`,
                });
            }

            return res.status(400).json({
                ok: 0,
                message: `${role} is not updated`,
            });
        })
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

/**
 * @param req
 * @param res
 * @returns {Promise.<TResult>}
 */
const changePassword = (req, res) => {
    const { id: managerId } = req.params;
    const { oldPassword, newPassword } = req.body;
    const { role } = req.user;

    // @TODO Add validation
    // @Todo Fix this error as password is bad: Can't set headers after they are sent.

    return findManager(managerId)
        .then(result => {
            if (!result) {
                return res.status(400).json({
                    ok: 0,
                    message: `${role} is not found`,
                });
            }

            const { password } = result;
            const isCompare = comparePasswords(password, oldPassword);
            if (!isCompare) {
                return res.status(400).json({
                    ok: 0,
                    message: 'Old password is incorrect',
                });
            }

            const data = {
                password: encryptPassword(newPassword),
            };

            return updateManagerPassword(data, managerId);
        })
        .then(result => {
            if (result) {
                return res.status(200).json({
                    ok: 1,
                    message: 'Password is updated',
                });
            }

            return res.status(400).json({
                ok: 0,
                message: 'Password is not updated',
            });
        })
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const blockManager = (req, res) => {
    const { id: adminId } = req.user;
    const { id: managerId } = req.params;

    return makeBlockingOfManager(adminId, managerId)
        .then(() => res.status(200).json({
            ok: 1,
            message: 'Manager was blocked',
        }))
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

const getManagerData = (req, res) => {
    // const { id: managerId } = req.user;
    const { id: managerId } = req.params;

    return findManager(managerId)
        .then(manager => res.status(200).json({
            ok: 1,
            manager,
        }))
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

export {
    createNewManager,
    updateAttributesManager,
    updateProfileManager,
    changePassword,
    blockManager,
    getManagerData,
};
