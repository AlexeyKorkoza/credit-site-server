import { makeUpdatingOfClient } from '../../core/clients';

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const editClients = (req, res) => {
    // TODO @Add validation

    const { id: adminId } = req.user;
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

export {
    editClients,
};
