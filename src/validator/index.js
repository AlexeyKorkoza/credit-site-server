import { body } from 'express-validator/check';

const validators = {
    login: [
        body('login')
            .exists().not().isEmpty().withMessage('Please, enter your login'),
        body('password')
            .exists().not().isEmpty().withMessage('Please, enter your password')
            .isLength({ min: 8 }).withMessage('Password length is a min 8 symbols'),
        body('role')
            .exists().not().isEmpty().withMessage('Please, choose your role'),
    ],
    newUser: [
        body('login')
            .exists().not().isEmpty().withMessage('Please, enter user\'s login1'),
        body('password')
            .exists().not().isEmpty().withMessage('Please, enter user\'s password')
            .isLength({ min: 8 }).withMessage('Password length is a min 8 symbols'),
        body('role')
            .exists().not().isEmpty().withMessage('Please, choose user\'s role'),
    ],
    changePassword: [
        body('oldPassword')
            .exists().not().isEmpty().withMessage('Please, enter old password')
            .isLength({ min: 8 }).withMessage('Old password length is a min 8 symbols'),
        body('newPassword')
            .exists().not().isEmpty().withMessage('Please, enter new password')
            .isLength({ min: 8 }).withMessage('New password length is a min 8 symbols'),
        body('confirmNewPassword')
            .exists().not().isEmpty().withMessage('Please, enter confirmation password')
            .isLength({ min: 8 }).withMessage('Confirmation password length is a min 8 symbols')
            .custom((value, { req }) => {
                if (value !== req.body.newPassword) {
                    throw new Error('Password confirmation does not match password');
                }

                return true;
            })
    ]
};

export default validators;
