import {
    makeCreating,
    makeUpdating,
    makeUpdatingIssueLoan,
} from '../../business/api/loans';

const createLoan = (req, res) => {
    // @TODO validation data

    const { user_id: managerId } = req.user;

    return makeCreating(req.body, managerId)
        .then(() => res.status(200).json({
            ok: 1,
            message: 'Loan was created',
        }))
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

const updateLoan = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { user_id: adminId } = req.user;

    // @TODO Validation data

    return makeUpdating(id, data, adminId)
        .then(() => res.status(200).json({
            ok: 1,
            message: 'Loan was updated',
        }))
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

const updateIssueLoan = (req, res) => {
    const { id } = req.params;
    const data = req.body;
    const { user_id: adminId } = req.user;

    // @TODO Validation data

    return makeUpdatingIssueLoan(id, data, adminId)
        .then(() => res.status(200).json({
            ok: 1,
            message: 'Date issue was updated',
        }))
        .catch(err => res.status(500).json({
            ok: 0,
            message: err.message,
        }));
};

export {
    createLoan,
    updateLoan,
    updateIssueLoan,
};
