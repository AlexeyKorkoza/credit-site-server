import { getModel } from '../../services/models';

const updateProfileManager = (req, res) => {
    const {
        fullName,
        territory,
        phone,
        login,
        role,
        email,
        isBlocked,
    } = req.body;
    const { id } = req.user;

    // @TODO Add validation

    const model = getModel(role);
    const data = {
        full_name: fullName,
        territory,
        phone,
        login,
        email,
        isBlocked,
    };
    const query = {
        where: {
            id,
        },
    };

    return model.update(data, query)
        .then(result => {
            if (result) {
                return res.status(200).json({
                    ok: 1,
                    message: `${role} is updated`,
                });
            }

            return res.status(400).json({
                ok: 0,
                message: `${role} is not updated`,
            });
        })
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

export {
    updateProfileManager,
};
