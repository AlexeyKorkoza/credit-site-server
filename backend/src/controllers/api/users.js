import { Admin, Manager, Client } from '../../models';
import { makeCreatingUser } from '../../business/api/users';

const createUser = (req, res) => {
    const models = {
        admin: Admin,
        manager: Manager,
        client: Client,
    };

    const { role } = req.body;
    const model = models[role.toLowerCase()];
    if (!model) {
        return res.status(400).json({
            ok: 0,
            message: `Unknown ${role}`,
        });
    }

    return makeCreatingUser(req.body)
        .then(result => {
            if (result) {
                return res.status(201).json({
                    ok: 1,
                    message: `${req.body.role} is created`,
                });
            }

            return res.status(400).json({
                ok: 0,
                message: `${req.body.role} is not created`,
            });
        })
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

export {
    createUser,
};
