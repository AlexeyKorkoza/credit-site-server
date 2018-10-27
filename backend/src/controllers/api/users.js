import { makeCreatingUser } from '../../business/api/users';

const createUser = (req, res) => {
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
