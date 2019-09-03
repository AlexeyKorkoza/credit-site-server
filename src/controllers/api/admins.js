import { validationResult } from 'express-validator/check';

import {
    findAdminData,
    makeUpdatingAdmin,
} from '../../business/api/admins';
import { encryptor } from '../../core/crypto';
import { comparePasswords } from '../../utils/passwords';
import { responses } from "../../utils";

/**
 * @param req
 * @param res
 * @return {*}
 */
const getAdminData = (req, res) => {
    const { id: adminId } = req.params;

    return findAdminData(adminId)
        .then(admin => res.status(200)
            .json({
                data: admin,
            })
        )
        .catch(err => {
            console.error(err.message, 'getAdminData');

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

    return makeUpdatingAdmin(adminId, data)
        .then(admin => res.status(200)
            .json({
                admin,
            }))
        .catch(err => {
            console.error(err.message, 'updateAdminData');

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

    return findAdminData(adminId, true)
        .then(admin => {
            const { password } = admin;

            const isComparedPasswords = comparePasswords(password, oldPassword);
            if (!isComparedPasswords) {
                return res.status(400)
                    .json({
                        message: 'Old Password is incorrect',
                    });
            }

            const data = {
                password: encryptor(newPassword),
            };

            return makeUpdatingAdmin(adminId, data)
                .then(() => res.status(200)
                    .json({
                        message: 'Password was changes successfully',
                    }))
                .catch(err => {
                    console.error(err.message, 'changeAdminPassword');

                    return responses.send500(res);
                });
        });
};

export {
    getAdminData,
    updateAdminData,
    changeAdminPassword,
};
