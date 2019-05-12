import {
    findAdminData,
    makeUpdatingAdmin,
} from '../../business/api/admins';
import { encryptor } from '../../core/crypto';
import { comparePasswords } from '../../utils/passwords';

/**
 * @param req
 * @param res
 * @return {*}
 */
const getAdminData = (req, res) => {
    const { id: adminId } = req.params;

    return findAdminData(adminId)
        .then(manager => res.status(200)
            .json({
                ok: 1,
                manager,
            }))
        .catch(err => res.status(500)
            .json({
                ok: 0,
                message: err.message,
            }));
};

/**
 * @param req
 * @param res
 * @return {*}
 */
const updateAdminData = (req, res) => {
    const { id: adminId } = req.params;
    const {
        login,
        oldPassword,
        newPassword,
        confirmNewPassword,
    } = req.body;

    if (oldPassword && newPassword && confirmNewPassword) {
        if (newPassword !== confirmNewPassword) {
            return res.status(400)
                .json({
                    ok: 0,
                    message: 'New Password and Confirmation New Password are different',
                });
        }

        return findAdminData(adminId)
            .then(admin => {
                const { password } = admin;

                const isComparedPasswords = comparePasswords(oldPassword, password);
                if (!isComparedPasswords) {
                    return res.status(400)
                        .json({
                            ok: 0,
                            message: 'Old Password is incorrect',
                        });
                }

                const data = {
                    login,
                    password: encryptor(newPassword),
                };

                return makeUpdatingAdmin(adminId, data)
                    .then(admin => res.status(200)
                        .json({
                            ok: 1,
                            admin,
                        }))
                    .catch(err => res.status(500)
                        .json({
                            ok: 0,
                            message: err.message,
                        }));
            })
    }

    const data = {
        login,
    };

    return makeUpdatingAdmin(adminId, data)
        .then(admin => res.status(200)
            .json({
                ok: 1,
                admin,
            }))
        .catch(err => res.status(500)
            .json({
                ok: 0,
                message: err.message,
            }));
};

export {
    getAdminData,
    updateAdminData,
};
