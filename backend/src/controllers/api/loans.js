import {
    makeUpdating,
    makeUpdatingIssueLoan,
} from '../../business/loans';

const updateLoan = (req, res) => {
    const { id } = req.params;
    const data = req.body;

    // @TODO Validation data

    return makeUpdating(id, data)
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

    // @TODO Validation data

    return makeUpdatingIssueLoan(id, data)
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
    updateLoan,
    updateIssueLoan,
};
