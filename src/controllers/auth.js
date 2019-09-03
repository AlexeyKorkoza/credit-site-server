import { validationResult } from 'express-validator/check';

import { buildTokens } from '../utils/jwt';
import { comparePasswords } from '../utils/passwords';
import {
    makeBlockingOfManager,
    authManager,
    increaseInputCount,
} from '../business/api/managers';
import {
    findRecordOnLogin,
    findRecordOnRefreshToken,
    makeUpdatingRefreshToken,
    updateUserRecord,
} from '../business/auth';
import { responses } from "../utils";

const logIn = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({  errors: errors.array() });
    }

    const { login, password, role } = req.body;

    return findRecordOnLogin(login, role)
        .then(user => {
            if (!user) {
                return res.status(400).json({
                    message: `${role} is not found`,
                });
            }

            if (role === 'manager' && user.is_blocked === true) {
                return res.status(400).json({
                    message: 'Record was blocked',
                });
            }

            const isPasswordCompare = comparePasswords(user.password, password);
            if (!isPasswordCompare) {
                if (role === 'manager') {
                    return increaseInputCount(login, user)
                        .then(result => {
                            const data = result[1].dataValues;
                            const { input_count: inputCount, id } = data;

                            if (inputCount === 5) {
                                return makeBlockingOfManager(null, id)
                                    .then(() => res.status(400).json({
                                        message: 'Record has just been blocked',
                                    }));
                            }

                            return res.status(400).json({
                                message: 'Password are not compared',
                            })
                        })
                        .catch(err => {
                            console.error(err.message, 'logIn');

                            return responses.send500(res);
                        });
                }

                return res.status(400).json({
                    message: 'Password are not compared',
                });
            }

            const { accessToken, expiresIn, refreshToken } = buildTokens(user, role);
            if (role === 'manager') {
                return authManager(user, login)
                    .then(() => makeUpdatingRefreshToken(user, '', refreshToken, role))
                    .then(() => res.status(200).json({
                        id: user.id,
                        accessToken,
                        refreshToken,
                        expiresIn,
                        role,
                    }))
                    .catch(err => res.status(500).json({

                        message: err.message,
                    }));
            }

            return makeUpdatingRefreshToken(user, '', refreshToken, role)
                .then(() => {
                    return res.status(200).json({
                        id: user.id,
                        accessToken,
                        refreshToken,
                        expiresIn,
                        role,
                    });
                });
        })
        .catch(err => {
            console.error(err.message, 'logIn');

            return responses.send500(res);
        });
};

const updateRefreshToken = (req, res) => {
    const user = req.user;
    const { role, refreshToken } = req.body;

    return findRecordOnRefreshToken(user, refreshToken, role)
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: `${role} is not found`,
                });
            }

            const { accessToken: newAccessToken, expiresIn, refreshToken: newRefreshToken } = buildTokens(user, role);

            return makeUpdatingRefreshToken(user, refreshToken, newRefreshToken, role)
                .then(() => res.status(200).json({
                    refreshToken: newRefreshToken,
                    accessToken: newAccessToken,
                    expiresIn,
                })
            );
        })
        .catch(err => {
            console.error(err.message, 'updateRefreshToken');

            return responses.send500(res);
        });
};

/**
 * Log out from application
 * @param req
 * @param res
 * @return {Promise.<TResult>}
 */
const logOut = (req, res) => {
    const { user_id: id, role } = req.user;

    return updateUserRecord(id, role)
        .then(() => res.status(200).json({
            message: `${role} is logged out`,
        }))
        .catch(err => {
            console.error(err.message, 'logOut');

            return responses.send500(res);
        });
};

export {
    logIn,
    updateRefreshToken,
    logOut,
};
