import { getModel } from '../../services/models';
import { checkOldPasswords } from '../../services/passwords';
import { makeBlockingOfManager } from '../../business/managers';

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

const changePassword = (req, res) => {
    const { oldPassword, newPassword } = req.body;
    const { id, role } = req.user;

    // @TODO Add validation

    const model = getModel(role);
    const data = {
        password: newPassword,
    };
    const query = {
        where: {
            id,
        },
        plain: true,
    };

    return model.findOne(query)
        .then(result => {
            if (!result) {
                return res.status(400).json({
                    ok: 0,
                    message: `${role} is not found`,
                });
            }

            const { password } = result;
            const isCompare = checkOldPasswords(oldPassword, password);
            if (!isCompare) {
                return res.status(400).json({
                    ok: 0,
                    message: 'Old password is incorrect',
                });
            }

            return model.update(data, query);
        })
        .then(result => {
            if (result) {
                return res.status(200).json({
                    ok: 1,
                    message: 'Password is updated',
                });
            }

            return res.status(400).json({
                ok: 0,
                message: 'Password is not updated',
            });
        })
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

/**
 * @param req
 * @param res
 * @returns {Promise.<T>|*}
 */
const blockManager = (req, res) => {
    const { id: adminId } = req.user;
    const { id: managerId } = req.body;

    return makeBlockingOfManager(adminId, managerId)
        .then(() => res.status(200).json({
            ok: 1,
            message: 'Manager was blocked',
        }))
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

export {
    updateProfileManager,
    changePassword,
    blockManager,
};
