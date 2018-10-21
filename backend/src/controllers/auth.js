import config from 'config';

import { buildToken, buildExpiresIn } from '../helpers/jwt';
import { encryptor } from '../helpers/crypto';
import { getModel } from '../services/models';

const logIn = (req, res) => {
    const { login, password, role } = req.body;

    if (!login || !password || !role) {
        return res.status(400).json({
            ok: 0,
            message: 'Required parameters are empty',
        });
    }

    const model = getModel(role);
    if (!model) {
        return res.status(400).json({
            ok: 0,
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
                    ok: 0,
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
                            ok: 0,
                            message: 'Password are not compared',
                        }));
                }

                return res.status(400).json({
                    ok: 0,
                    message: 'Password are not compared',
                });
            }

            const accessToken = buildToken({ user_id: user.id, role });
            const expiresIn = buildExpiresIn(config.jwt.accessTokenExpiresIn);
            const refreshToken = buildToken({ user_id: user.id });

            if (role === 'manager') {
                const data = Object.assign({},
                    user,
                    { input_count: 0 },
                );
                return model.update(query, data)
                    .then(() => res.status(200).json({
                        ok: 1,
                        accessToken,
                        refreshToken,
                        expiresIn,
                    }));
            }

            return res.status(200).json({
                ok: 1,
                accessToken,
                refreshToken,
                expiresIn,
            });
        });
};

const updateRefreshToken = (req, res) => {
    const id = req.user.user_id;
    const { role, refreshToken } = req.body;
    const model = getModel(role);

    const query = {
        where: {
            id,
            refresh_token: refreshToken,
        },
    };

    return model.findOne(query)
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    ok: 0,
                    message: 'User is not found',
                });
            }

            const newRefreshToken = buildToken({ user_id: id });
            const newAccessToken = buildToken({ user_id: id, role }, false);
            const expiresIn = buildExpiresIn(config.jwt.accessTokenExpiresIn);

            const data = {
                refresh_token: newRefreshToken,
            };

            return model.update(data, query)
                .then(() => res.status(200).json({
                    ok: 1,
                    refreshToken: newRefreshToken,
                    accessToken: newAccessToken,
                    expiresIn,
                })
            );
        })
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

export {
    logIn,
    updateRefreshToken,
};
