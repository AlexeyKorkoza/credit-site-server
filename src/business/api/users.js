import { Admin, Manager, Client } from '../../models';
import { crypto } from '../../utils';

const models = {
    admin: Admin,
    manager: Manager,
    client: Client,
};

const makeCreatingUser = body => {
    const { role, password, login } = body;
    const encryptedPassword = crypto.encryptor(password);
    const model = models[role.toLowerCase()];
    let data = Object.assign({}, { login, password: encryptedPassword });

    if (role === 'manager') {
        data = Object.assign({}, data, { full_name: body.fullName });
    }

    return model.create(data);
};

export default {
    makeCreatingUser,
};
