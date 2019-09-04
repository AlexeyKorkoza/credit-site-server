import { loans } from '../../business';
import { logger, responses } from "../../utils";

const getLoan = (req, res) => {
    const { id } = req.params;

    return loans.findLoan(id)
        .then(loan => res.status(200).json({
            loan,
        }))
        .catch(err => {
            logger.error(err.message, 'getLoan');

            return responses.send500(res);
        });
};

const getLoans = (req, res) => {
    return loans.findAllLoans()
        .then(loans => res.status(200).json({
            loans,
        }))
        .catch(err => {
            logger.error(err.message, 'getLoans');

            return responses.send500(res);
        });
};

const createLoan = (req, res) => {
    // @TODO validation data

    const { user_id: managerId } = req.user;

    return loans.makeCreating(req.body, managerId)
        .then(() => res.status(200).json({
            message: 'Loan was created',
        }))
        .catch(err => {
            logger.error(err.message, 'createLoan');

            return responses.send500(res);
        });
};

const updateLoan = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { user_id: adminId } = req.user;

    // @TODO Validation data

    return loans.makeUpdating(id, data, adminId)
        .then(() => res.status(200).json({
            message: 'Loan was updated',
        }))
        .catch(err => {
            logger.error(err.message, 'updateLoan');

            return responses.send500(res);
        });
};

const updateIssueLoan = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { user_id: adminId } = req.user;

    // @TODO Validation data

    return loans.makeUpdatingIssueLoan(id, data, adminId)
        .then(() => res.status(200).json({
            message: 'Date issue was updated',
        }))
        .catch(err => {
            logger.error(err.message, 'updateIssueLoan');

            return responses.send500(res);
        });
};

export default {
    getLoan,
    getLoans,
    createLoan,
    updateLoan,
    updateIssueLoan,
};
