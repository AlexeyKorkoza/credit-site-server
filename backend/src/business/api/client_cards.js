import { ClientCard } from '../../models/index';

const makeUpdatingClientCard = (id, body) => {
    const {
        fullName: full_name,
        passportData: passport_data,
        phone,
        email,
        surchargeFactor: surcharge_factor,
        territory,
    } = body;

    const query = {
        where: {
            id,
        },
    };

    const data = {
        full_name,
        passport_data,
        phone,
        email,
        surcharge_factor,
        territory,
    };

    return ClientCard.update(data, query);
};

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
    makeUpdatingClientCard,
    makeUpdatingTerritorialCoefficient,
};
