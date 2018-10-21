import { Admin, Manager, Client } from '../models';

const models = {
    admin: Admin,
    manager: Manager,
    client: Client,
};

const getModel = role => models[role];

export {
    getModel,
};
