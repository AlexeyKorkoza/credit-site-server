import { buildTokens } from '../utils/jwt';
import { comparePasswords } from '../utils/passwords';
import {
    authManager,
    increaseInputCount,
} from '../business/api/managers';
import {
    findRecordOnLogin,
    findRecordOnRefreshToken,
    makeUpdatingRefreshToken,
} from '../business/auth';

const logIn = (req, res) => {
    const { login, password, role } = req.body;

    if (!login || !password || !role) {
        return res.status(400).json({
            ok: 0,
            message: 'Required parameters are empty',
        });
    }

    return findRecordOnLogin(login, role)
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    ok: 0,
                    message: `${role} is not found`,
                });
            }

            const isPasswordCompare = comparePasswords(user.password, password);
            if (!isPasswordCompare) {
                if (role === 'manager') {
                    return increaseInputCount(login, user)
                        .then(() => res.status(400).json({
                            ok: 0,
                            message: 'Password are not compared',
                        }))
                        .catch(err => res.status(500).json({
                            ok: 0,
                            message: err.message,
                        }));
                }

                return res.status(400).json({
                    ok: 0,
                    message: 'Password are not compared',
                });
            }

            const { accessToken, expiresIn, refreshToken } = buildTokens(user, role);
            if (role === 'manager') {
                return authManager(user, login)
                    .then(() => makeUpdatingRefreshToken(user, '', refreshToken, role))
                    .then(() => res.status(200).json({
                        ok: 1,
                        accessToken,
                        refreshToken,
                        expiresIn,
                    }))
                    .catch(err => res.status(500).json({
                        ok: 0,
                        message: err.message,
                    }));
            }

            return makeUpdatingRefreshToken(user, '', refreshToken, role)
                .then(() => {
                    return res.status(200).json({
                        ok: 1,
                        accessToken,
                        refreshToken,
                        expiresIn,
                    });
                });
        })
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

const updateRefreshToken = (req, res) => {
    const user = req.user;
    const { role, refreshToken } = req.body;

    return findRecordOnRefreshToken(user, refreshToken, role)
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    ok: 0,
                    message: `${role} is not found`,
                });
            }

            const { accessToken: newAccessToken, expiresIn, refreshToken: newRefreshToken } = buildTokens(user, role);

            return makeUpdatingRefreshToken(user, refreshToken, newRefreshToken, role)
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
