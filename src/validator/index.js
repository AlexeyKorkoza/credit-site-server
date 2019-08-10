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
};

export default validators;
