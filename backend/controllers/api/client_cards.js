import { makeUpdatingTerritorialCoefficient } from '../../core/client_cards';

const updateTerritorialCoefficient = (req, res) => {
    const { id } = req.params;
    const { surcharge_factor: surchargeFactor } = req.body;

    return makeUpdatingTerritorialCoefficient(id, surchargeFactor)
        .then(() => res.status(200).json({
            ok: 1,
            message: 'Territorial coefficient was updated',
        }))
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

export {
    updateTerritorialCoefficient,
};
