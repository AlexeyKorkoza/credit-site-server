import { clients } from '../../business';
import { logger, responses } from '../../utils';

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const addClient = (req, res) => {
    // TODO @Add validation

    const { user_id: managerId } = req.user;

    return clients.makeCreatingOfClient(req.body, managerId)
        .then(() => res.status(200).json({
            message: 'Client was created',
        }))
        .catch(err => {
            logger.error(err.message, 'addClient');

            return responses.send500(res);
        });
};

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const editClient = (req, res) => {
    // TODO @Add validation

    // userId - manager or admin`s id
    const { user_id: userId, role } = req.user;
    const { id: clientId } = req.params;
    const client = req.body;

    return clients.findClient(clientId, userId, role)
        .then(result => {
            if (!result) {
                return res.status(400).json({
                    message: 'Client was not created by this manager',
                });
            }

            return clients.makeUpdatingOfClient(userId, clientId, client, role);
        })
        .then(() => res.status(200).json({
            message: 'Client was updated',
        }))
        .catch(err => {
            logger.error(err.message, 'editClient');

            return responses.send500(res);
        });
};

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const markDeletionClient = (req, res) => {
    const { id } = req.params;
    const { user_id: managerId } = req.user;
    const { is_removed: isRemoved } = req.body;

    // TODO validation data

    return clients.makeMarkingDeletionOfClient(id, managerId, isRemoved)
        .then(() => res.status(200).json({
            message: `Client was ${isRemoved ? 'marked' : 'unmarked'} for deletion`,
        }))
        .catch(err => {
            logger.error(err.message, 'markDeletionClient');

            return responses.send500(res);
        });
};

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const removeClient = (req, res) => {
    const { id: clientId } = req.params;

    return clients.makeRemovingOfClient(clientId)
        .then(() => res.status(200).json({
            message: 'Client was removed',
        }))
        .catch(err => {
            logger.error(err.message, 'removeClient');

            return responses.send500(res);
        });
};

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const getAllClients = (req, res) => {
    return clients.findAllClients()
        .then(clients => res.status(200).json({
            clients,
        }))
        .catch(err => {
            logger.error(err.message, 'getAllClients');

            return responses.send500(res);
        });
};

const getClient = (req, res) => {
    const { user_id: userId, role } = req.user;
    const { id: clientId } = req.params;

    return clients.findClient(clientId, userId, role)
        .then(client => res.status(200).json({
            client,
        }))
        .catch(err => {
            logger.error(err.message, 'getClient');

            return responses.send500(res);
        });
};

const getClientLoans = (req, res) => {
    const { user_id: userId } = req.user;
    const { id: clientId } = req.params;

    return clients.findClientLoans(userId, clientId)
        .then(loans => res.status(200).json({
            loans,
        }))
        .catch(err => {
            logger.error(err.message, 'getClientLoans');

            return responses.send500(res);
        });
};

export default {
    addClient,
    editClient,
    markDeletionClient,
    removeClient,
    getAllClients,
    getClient,
    getClientLoans,
};
