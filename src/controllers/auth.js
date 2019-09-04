import { validationResult } from 'express-validator/check';

import { auth, managers } from '../business';
import { jwt, logger, passwords, responses } from "../utils";

const logIn = (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({  errors: errors.array() });
    }

    const { login, password, role } = req.body;

    return auth.findRecordOnLogin(login, role)
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

            const isPasswordCompare = passwords.comparePasswords(user.password, password);
            if (!isPasswordCompare) {
                if (role === 'manager') {
                    return managers.increaseInputCount(login, user)
                        .then(result => {
                            const data = result[1].dataValues;
                            const { input_count: inputCount, id } = data;

                            if (inputCount === 5) {
                                return managers.makeBlockingOfManager(null, id)
                                    .then(() => res.status(400).json({
                                        message: 'Record has just been blocked',
                                    }));
                            }

                            return res.status(400).json({
                                message: 'Password are not compared',
                            })
                        })
                        .catch(err => {
                            logger.error(err.message, 'logIn');

                            return responses.send500(res);
                        });
                }

                return res.status(400).json({
                    message: 'Password are not compared',
                });
            }

            const { accessToken, expiresIn, refreshToken } = jwt.buildTokens(user, role);
            if (role === 'manager') {
                return managers.authManager(user, login)
                    .then(() => auth.makeUpdatingRefreshToken(user, '', refreshToken, role))
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

            return auth.makeUpdatingRefreshToken(user, '', refreshToken, role)
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
            logger.error(err.message, 'logIn');

            return responses.send500(res);
        });
};

const updateRefreshToken = (req, res) => {
    const user = req.user;
    const { role, refreshToken } = req.body;

    return auth.findRecordOnRefreshToken(user, refreshToken, role)
        .then(result => {
            if (!result) {
                return res.status(404).json({
                    message: `${role} is not found`,
                });
            }

            const { accessToken: newAccessToken, expiresIn, refreshToken: newRefreshToken } = jwt.buildTokens(user, role);

            return auth.makeUpdatingRefreshToken(user, refreshToken, newRefreshToken, role)
                .then(() => res.status(200).json({
                    refreshToken: newRefreshToken,
                    accessToken: newAccessToken,
                    expiresIn,
                })
            );
        })
        .catch(err => {
            logger.error(err.message, 'updateRefreshToken');

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

    return auth.updateUserRecord(id, role)
        .then(() => res.status(200).json({
            message: `${role} is logged out`,
        }))
        .catch(err => {
            logger.error(err.message, 'logOut');

            return responses.send500(res);
        });
};

export default {
    logIn,
    updateRefreshToken,
    logOut,
};
