import {
    addClientCard,
    makeUpdatingClientCard,
    makeUpdatingTerritorialCoefficient,
} from '../../business/api/client_cards';

/**
 * @param req
 * @param res
 * @return {*}
 */
const createClientCard = (req, res) => {
    return addClientCard(req.body)
        .then(() => res.status(200).json({
            message: 'Client card was created',
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
const updateClientCard = (req, res) => {
    const { id } = req.params;

    // TODO Add validation
    return makeUpdatingClientCard(id, req.body)
        .then(() => res.status(200).json({
            message: 'Client card was updated',
        }))
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

const updateTerritorialCoefficient = (req, res) => {
    const { id } = req.params;
    const { surcharge_factor: surchargeFactor } = req.body;

    return makeUpdatingTerritorialCoefficient(id, surchargeFactor)
        .then(() => res.status(200).json({
            message: 'Territorial coefficient was updated',
        }))
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

export {
    createClientCard,
    updateClientCard,
    updateTerritorialCoefficient,
};
