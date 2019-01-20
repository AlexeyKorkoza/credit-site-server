import { Loan } from '../../models/index';

/**
 * @param body
 * @param managerId
 * @returns {data}
 */
const makeCreating = (body, managerId) => {
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
        date_issue: dateIssue,
        date_maturity: dateMaturity,
        total_repayment_amount: totalRepaymentAmount,
        manager_id: managerId,
    };

    return Loan.create(data);
};

/**
 * @param id
 * @param body
 * @param adminId
 */
const makeUpdating = (id, body, adminId) => {
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
        admin_id: adminId,
    };

    return Loan.update(data, query);
};

/**
 * @param id
 * @param body
 * @param adminId
 */
const makeUpdatingIssueLoan = (id, body, adminId) => {
    const {
        dateIssue,
    } = body;

    const query = {
        where: {
            id,
        },
    };

    const data = {
        date_issue: dateIssue,
        admin_id: adminId,
    };

    return Loan.update(data, query);
};

export {
    makeCreating,
    makeUpdating,
    makeUpdatingIssueLoan,
};
