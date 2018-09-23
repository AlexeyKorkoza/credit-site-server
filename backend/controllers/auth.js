import { buildToken, buildExpiresIn } from '../helpers/jwt';
import { encryptor } from '../helpers/crypto';
import { admin, manager } from '../models';

const logIn = (req, res) => {
    const models = {
        admin,
        manager,
    };

    const { login, password, role } = req.body;

    if (!login || !password || !role) {
        return res.status(400).json({
            message: 'Required parameters are empty',
        });
    }

    const model = models[role];
    if (!model) {
        return res.status(400).json({
            message: 'You have chosen incorrect role',
        });
    }

    const query = {
        where: {
            login,
        },
    };

    return model.findOne(query)
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    message: `${model} is not found`,
                });
            }

            const isPasswordCompare = user.password === encryptor(password);
            if (!isPasswordCompare) {
                if (role === 'manager') {
                    const data = Object.assign({},
                        user,
                        { input_count: user.input_count + 1 },
                    );
                    if (data.input_count > 4) {
                        data.is_blocked = true;
                    }

                    return manager.update(query, data)
                        .then(() => res.status(400).json({
                            message: 'Password are not compared',
                        }));
                }

                return res.status(400).json({
                    message: 'Password are not compared',
                });
            }

            const accessToken = buildToken({ user_id: user.id, role });
            const expiresIn = buildExpiresIn(30);
            const refreshToken = buildToken({ user_id: user.id });

            if (role === 'manager') {
                const data = Object.assign({},
                    user,
                    { input_count: 0 },
                );
                return model.update(query, data)
                    .then(() => res.status(200).json({
                        accessToken,
                        refreshToken,
                        expiresIn,
                    }));
            }

            return res.status(200).json({
                accessToken,
                refreshToken,
                expiresIn,
            });
        });
};

export {
    logIn,
};
