import {
    makeCreatingOfClient,
    makeUpdatingOfClient,
    makeMarkingDeletionOfClient,
    makeRemovingOfClient,
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

    const { user_id: adminId } = req.user;
    const { id: clientId } = req.params;
    const client = req.body;

    return makeUpdatingOfClient(adminId, clientId, client)
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

    return makeMarkingDeletionOfClient(id, req.body, managerId)
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
    const { id: adminId } = req.user;
    const { id: clientId } = req.params;

    return makeRemovingOfClient(adminId, clientId)
        .then(() => res.status(200).json({
            ok: 1,
            message: 'Client was removed',
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
};
