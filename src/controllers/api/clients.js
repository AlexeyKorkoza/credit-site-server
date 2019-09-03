import {
    makeCreatingOfClient,
    makeUpdatingOfClient,
    makeMarkingDeletionOfClient,
    makeRemovingOfClient,
    findClient,
    findClientLoans,
    findAllClients,
} from '../../business/api/clients';
import { responses } from "../../utils";

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const addClient = (req, res) => {
    // TODO @Add validation

    const { user_id: managerId } = req.user;

    return makeCreatingOfClient(req.body, managerId)
        .then(() => res.status(200).json({
            message: 'Client was created',
        }))
        .catch(err => {
            console.error(err.message, 'addClient');

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

    return findClient(clientId, userId, role)
        .then(result => {
            if (!result) {
                return res.status(400).json({
                    message: 'Client was not created by this manager',
                });
            }

            return makeUpdatingOfClient(userId, clientId, client, role);
        })
        .then(() => res.status(200).json({
            message: 'Client was updated',
        }))
        .catch(err => {
            console.error(err.message, 'editClient');

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

    // TODO validation data

    return makeMarkingDeletionOfClient(id, managerId)
        .then(() => res.status(200).json({
            message: 'Client was marked for deletion',
        }))
        .catch(err => {
            console.error(err.message, 'markDeletionClient');

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

    return makeRemovingOfClient(clientId)
        .then(() => res.status(200).json({
            message: 'Client was removed',
        }))
        .catch(err => {
            console.error(err.message, 'removeClient');

            return responses.send500(res);
        });
};

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const getAllClients = (req, res) => {
    return findAllClients()
        .then(clients => res.status(200).json({
            clients,
        }))
        .catch(err => {
            console.error(err.message, 'getAllClients');

            return responses.send500(res);
        });
};

const getClient = (req, res) => {
    const { user_id: userId, role } = req.user;
    const { id: clientId } = req.params;

    return findClient(clientId, userId, role)
        .then(client => res.status(200).json({
            client,
        }))
        .catch(err => {
            console.error(err.message, 'getClient');

            return responses.send500(res);
        });
};

const getClientLoans = (req, res) => {
    const { user_id: userId } = req.user;
    const { id: clientId } = req.params;

    return findClientLoans(userId, clientId)
        .then(loans => res.status(200).json({
            loans,
        }))
        .catch(err => {
            console.error(err.message, 'getClientLoans');

            return responses.send500(res);
        });
};

export {
    addClient,
    editClient,
    markDeletionClient,
    removeClient,
    getAllClients,
    getClient,
    getClientLoans,
};
