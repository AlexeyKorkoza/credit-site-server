import { validationResult } from 'express-validator/check';

import { Admin, Manager, Client } from '../../models';
import { makeCreatingUser } from '../../business/api/users';
import { responses } from "../../utils";

const createUser = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const models = {
        admin: Admin,
        manager: Manager,
        client: Client,
    };

    const { role } = req.body;
    const model = models[role.toLowerCase()];
    if (!model) {
        return res.status(400).json({
            message: `Unknown ${role}`,
        });
    }

    return makeCreatingUser(req.body)
        .then(result => {
            if (result) {
                return res.status(201).json({
                    message: `${req.body.role} is created`,
                });
            }

            return res.status(400).json({
                message: `${req.body.role} is not created`,
            });
        })
        .catch(err => {
            console.error(err.message, 'createUser');

            return responses.send500(res);
        });
};

export {
    createUser,
};
