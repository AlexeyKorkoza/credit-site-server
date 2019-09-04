import { client_cards } from '../../business';
import { logger, responses } from "../../utils";

/**
 * @param req
 * @param res
 * @return {*}
 */
const createClientCard = (req, res) => {
    return client_cards.addClientCard(req.body)
        .then(() => res.status(200).json({
            message: 'Client card was created',
        }))
        .catch(err => {
            logger.error(err.message, 'createClientCard');

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
    return client_cards.makeUpdatingClientCard(id, req.body)
        .then(() => res.status(200).json({
            message: 'Client card was updated',
        }))
        .catch(err => {
            logger.error(err.message, 'updateClientCard');

            return responses.send500(res);
        });
};

const updateTerritorialCoefficient = (req, res) => {
    const { id } = req.params;
    const { surcharge_factor: surchargeFactor } = req.body;

    return client_cards.makeUpdatingTerritorialCoefficient(id, surchargeFactor)
        .then(() => res.status(200).json({
            message: 'Territorial coefficient was updated',
        }))
        .catch(err => {
            logger.error(err.message, 'updateTerritorialCoefficient');

            return responses.send500(res);
        });
};

export default {
    createClientCard,
    updateClientCard,
    updateTerritorialCoefficient,
};
