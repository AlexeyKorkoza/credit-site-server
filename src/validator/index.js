import { body } from 'express-validator/check';

const validators = {
    login: [
        body('login')
            .exists().not().isEmpty()
            .withMessage('Please, enter your login'),
        body('password')
            .exists().not().isEmpty()
            .withMessage('Please, enter your password'),
            // TODO Set up length at least 8 symbols
            // .isLength({ min: 5 }),
        body('role')
            .exists().not().isEmpty()
            .withMessage('Please, choose your role'),
    ],
};

export default validators;
