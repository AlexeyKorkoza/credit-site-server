import { clients, managers } from '../../business';
import { logger, passwords, responses } from '../../utils';

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const createNewManager = (req, res) => {
    // @TODO Add validation

    const { user_id: admin_id } = req.user;

    return managers.makeCreatingOfManager(admin_id, req.body)
        .then(() => res.status(200).json({
            message: 'Manager was created',
        }))
        .catch(err => {
            logger.error(err.message, 'createNewManager');

            return responses.send500(res);
        });
};

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const updateAttributesManager = (req, res) => {
    const { id } = req.params;
    const body = req.body;

    return managers.makeUpdatingManagerAttributes(id, body)
        .then(() => res.status(200).json({
            message: 'Manager`s attributes is updated',
        }))
        .catch(err => {
            logger.error(err.message, 'updateAttributesManager');

            return responses.send500(res);
        });
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

    return managers.makeUpdatingProfileManager(data, managerId)
        .then(result => {
            if (result) {
                return res.status(200).json({
                    message: `${role} is updated`,
                });
            }

            return res.status(400).json({
                message: `${role} is not updated`,
            });
        })
        .catch(err => {
            logger.error(err.message, 'updateProfileManager');

            return responses.send500(res);
        });
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

    return managers.findManager(managerId, true)
        .then(result => {
            if (!result) {
                return res.status(400).json({
                    message: `${role} is not found`,
                });
            }

            const { password } = result;
            const isCompare = passwords.comparePasswords(password, oldPassword);
            if (!isCompare) {
                return res.status(400).json({
                    message: 'Old password is incorrect',
                });
            }

            const data = {
                password: passwords.encryptPassword(newPassword),
            };

            return managers.updateManagerPassword(data, managerId);
        })
        .then(result => {
            if (result) {
                return res.status(200).json({
                    message: 'Password is updated',
                });
            }

            return res.status(400).json({
                message: 'Password is not updated',
            });
        })
        .catch(err => {
            logger.error(err.message, 'changePassword');

            return responses.send500(res);
        });
};

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const blockManager = (req, res) => {
    const { id: adminId } = req.user;
    const { id: managerId } = req.params;
    const { is_blocked: isBlocked } = req.body;

    return managers.makeBlockingOfManager(adminId, managerId, isBlocked)
        .then(() => res.status(200).json({
            message: `Manager was ${isBlocked ? 'blocked' : 'unblocked'}`,
        }))
        .catch(err => {
            logger.error(err.message, 'blockManager');

            return responses.send500(res);
        });
};

const getManagerData = (req, res) => {
    // const { id: managerId } = req.user;
    const { id: managerId } = req.params;

    return managers.findManager(managerId)
        .then(manager => res.status(200).json({
            data: manager,
        }))
        .catch(err => {
            logger.error(err.message, 'getManagerData');

            return responses.send500(res);
        });
};

const getManagersData = (req, res) => {
    const { limit, offset } = req.query;

    return managers.findAllManagers(limit, offset)
        .then(managers => res.status(200).json({
            managers,
        }))
        .catch(err => {
            logger.error(err.message, 'getManagersData');

            return responses.send500(res);
        });
};

const getManagerClients = (req, res) => {
    const { id: managerId } = req.params;

    return clients.findAllClients(managerId)
        .then(clients => res.status(200).json({
            clients,
        }))
        .catch(err => {
            logger.error(err.message, 'getManagerClients');

            return responses.send500(res);
        });
};

export default {
    createNewManager,
    updateAttributesManager,
    updateProfileManager,
    changePassword,
    blockManager,
    getManagerClients,
    getManagerData,
    getManagersData,
};
