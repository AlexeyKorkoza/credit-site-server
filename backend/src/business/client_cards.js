import { ClientCard } from '../models/index';

const makeUpdatingTerritorialCoefficient = (id, surchargeFactor) => {
    const query = {
        where: {
            id,
        },
    };
    const data = {
        surcharge_factor: surchargeFactor,
    };

    return ClientCard.update(data, query);
};

export {
    makeUpdatingTerritorialCoefficient,
};
