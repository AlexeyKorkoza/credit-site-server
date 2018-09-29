import { admin, manager, client } from '../models';

const models = {
    admin,
    manager,
    client,
};

const getModel = role => models[role];

export {
    getModel,
};
