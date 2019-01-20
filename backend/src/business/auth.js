import { Admin, Manager, Client } from '../models';

const models = {
    admin: Admin,
    manager: Manager,
    client: Client,
};

const findRecordOnLogin = (login, role) => {
    const model = models[role];

    const query = {
        where: {
            login,
        },
    };

    return model.findOne(query);
};

const findRecordOnRefreshToken = (user, refreshToken, role) => {
    const query = {
        where: {
            id: user.user_id,
            refresh_token: refreshToken,
        },
    };

    const model = models[role];

    return model.findOne(query);
};

const makeUpdatingRefreshToken = (user, refreshToken, newRefreshToken, role) => {
    const model = models[role];

    const query = {
        where: {
            id: user.id,
            refresh_token: refreshToken || null,
        },
    };

    const data = {
        refresh_token: newRefreshToken || null,
    };

    return model.update(data, query);
};

export {
    findRecordOnLogin,
    findRecordOnRefreshToken,
    makeUpdatingRefreshToken,
};
