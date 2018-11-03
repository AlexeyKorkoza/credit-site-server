import { Loan } from '../../models/index';

const makeCreating = body => {
    const {
        amount,
        coefficient,
        dateIssue,
        dateMaturity,
        totalRepaymentAmount,
    } = body;

    const data = {
        amount,
        coefficient,
        data_issue: dateIssue,
        date_maturity: dateMaturity,
        total_repayment_amount: totalRepaymentAmount,
    };

    return Loan.create(data);
};

const makeUpdating = (id, body) => {
    const {
        amount,
        coefficient,
        dateIssue,
        dateMaturity,
        totalRepaymentAmount,
    } = body;

    const query = {
        where: {
            id,
        },
    };

    const data = {
        amount,
        coefficient,
        data_issue: dateIssue,
        date_maturity: dateMaturity,
        total_repayment_amount: totalRepaymentAmount,
    };

    return Loan.update(data, query);
};

const makeUpdatingIssueLoan = (id, body) => {
    const {
        dateIssue,
    } = body;

    const query = {
        where: {
            id,
        },
    };

    const data = {
        data_issue: dateIssue,
    };

    return Loan.update(data, query);
};

export {
    makeCreating,
    makeUpdating,
    makeUpdatingIssueLoan,
};
