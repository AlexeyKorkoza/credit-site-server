import {
    makeCreatingOfClient,
    makeUpdatingOfClient,
    makeMarkingDeletionOfClient,
    makeRemovingOfClient,
    findClient,
    findClientLoans,
    findAllClients,
} from '../../business/api/clients';

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
            ok: 1,
            message: 'Client was created',
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
                    ok: 0,
                    message: 'Client was not created by this manager',
                });
            }

            return makeUpdatingOfClient(userId, clientId, client, role);
        })
        .then(() => res.status(200).json({
            ok: 1,
            message: 'Client was updated',
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
const markDeletionClient = (req, res) => {
    const { id } = req.params;
    const { user_id: managerId } = req.user;

    // TODO validation data

    return makeMarkingDeletionOfClient(id, managerId)
        .then(() => res.status(200).json({
            ok: 1,
            message: 'Client was marked for deletion',
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
const removeClient = (req, res) => {
    const { id: clientId } = req.params;

    return makeRemovingOfClient(clientId)
        .then(() => res.status(200).json({
            ok: 1,
            message: 'Client was removed',
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
const getAllClients = (req, res) => {
    return findAllClients()
        .then(clients => res.status(200).json({
            ok: 1,
            clients,
        }))
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

const getClient = (req, res) => {
    const { user_id: userId, role } = req.user;
    const { id: clientId } = req.params;

    return findClient(clientId, userId, role)
        .then(client => res.status(200).json({
            ok: 1,
            client,
        }))
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

const getClientLoans = (req, res) => {
    const { user_id: userId } = req.user;
    const { id: clientId } = req.params;

    return findClientLoans(userId, clientId)
        .then(loans => res.status(200).json({
            ok: 1,
            loans,
        }))
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
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
