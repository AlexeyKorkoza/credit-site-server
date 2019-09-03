import {
    addClientCard,
    makeUpdatingClientCard,
    makeUpdatingTerritorialCoefficient,
} from '../../business/api/client_cards';
import { responses } from "../../utils";

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
        .catch(err => {
            console.error(err.message, 'createClientCard');

            return responses.send500(res);
        });
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
        .catch(err => {
            console.error(err.message, 'updateClientCard');

            return responses.send500(res);
        });
};

const updateTerritorialCoefficient = (req, res) => {
    const { id } = req.params;
    const { surcharge_factor: surchargeFactor } = req.body;

    return makeUpdatingTerritorialCoefficient(id, surchargeFactor)
        .then(() => res.status(200).json({
            message: 'Territorial coefficient was updated',
        }))
        .catch(err => {
            console.error(err.message, 'updateTerritorialCoefficient');

            return responses.send500(res);
        });
};

export {
    createClientCard,
    updateClientCard,
    updateTerritorialCoefficient,
};
