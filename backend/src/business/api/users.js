import { Admin, Manager, Client } from '../../models';

const models = {
    admin: Admin,
    manager: Manager,
    client: Client,
};

const makeCreatingUser = body => {
    const { role } = body;
    const model = models[role];
    let data = Object.assign({}, body);

    if (role === 'manager') {
        data = Object.assign({}, data, { full_name: body.fullName });
    }

    return model.create(data);
};

export {
    makeCreatingUser,
};
