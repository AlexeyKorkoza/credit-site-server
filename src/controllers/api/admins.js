import { validationResult } from 'express-validator/check';

import { admins } from '../../business';
import { crypto, logger, passwords, responses } from '../../utils';

/**
 * @param req
 * @param res
 * @return {*}
 */
const getAdminData = (req, res) => {
    const { id: adminId } = req.params;

    return admins.findAdminData(adminId)
        .then(admin => res.status(200)
            .json({
                data: admin,
            })
        )
        .catch(err => {
            logger.error(err.message, 'getAdminData');

            return responses.send500(res);
        });
};

/**
 * @param req
 * @param res
 * @return {*}
 */
const updateAdminData = (req, res) => {
    const { id: adminId } = req.params;
    const { login } = req.body;

    if (!login) {
        return res.status(422)
            .json({
                message: 'Enter your login',
            });
    }

    const data = {
        login,
    };

    return admins.makeUpdatingAdmin(adminId, data)
        .then(admin => res.status(200)
            .json({
                admin,
            }))
        .catch(err => {
            logger.error(err.message, 'updateAdminData');

            return responses.send500(res);
        });
};

/**
 * @param req
 * @param res
 * @return {Promise<T | never>|*}
 */
const changeAdminPassword = (req, res) => {
    const { id: adminId } = req.params;
    const {
        oldPassword,
        newPassword,
        confirmNewPassword,
    } = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    if (newPassword !== confirmNewPassword) {
        return res.status(400)
            .json({
                message: 'New Password and Confirmation New Password are different',
            });
    }

    return admins.findAdminData(adminId, true)
        .then(admin => {
            const { password } = admin;

            const isComparedPasswords = passwords.comparePasswords(password, oldPassword);
            if (!isComparedPasswords) {
                return res.status(400)
                    .json({
                        message: 'Old Password is incorrect',
                    });
            }

            const data = {
                password: crypto.encryptor(newPassword),
            };

            return admins.makeUpdatingAdmin(adminId, data)
                .then(() => res.status(200)
                    .json({
                        message: 'Password was changes successfully',
                    }))
                .catch(err => {
                    logger.error(err.message, 'changeAdminPassword');

                    return responses.send500(res);
                });
        });
};

export default {
    getAdminData,
    updateAdminData,
    changeAdminPassword,
};
