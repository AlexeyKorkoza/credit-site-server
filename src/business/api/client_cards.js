import { ClientCard } from '../../models';

/**
 * @param body
 * @return {data}
 */
const addClientCard = body => {
    const {
        email,
        fullName: full_name,
        phone,
        territory,
        passportData: passport_data,
        clientId: client_id,
        surchargeFactor: surcharge_factor,
    } = body;

    const data = {
        client_id,
        email,
        full_name,
        passport_data,
        phone,
        surcharge_factor,
        territory
    };

    return ClientCard.create(data);
};

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

export default {
    addClientCard,
    makeUpdatingClientCard,
    makeUpdatingTerritorialCoefficient,
};
