import { Client, Loan } from '../../models';

/**
 * @return {Promise<T | never>}
 */
const findAllLoans = () => {
    const query = {
        attributes: [
            'id',
            'amount',
            'coefficient',
            'date_issue',
            'date_maturity',
            'total_repayment_amount',
        ],
    };

    return Loan.findAll(query)
        .then(result => result.map(item => ({
            id: item.id,
            amount: item.amount,
            coefficient: item.coefficient,
            dateIssue: item.date_issue,
            dateMaturity: item.date_maturity,
            totalRepaymentAmount: item.total_repayment_amount,
        })));
};

/**
 * @param id {Number}
 * @return {Promise<{amount: (*|Loan.amount|{allowNull, type}|PaymentCurrencyAmount), totalRepaymentAmount: (*|loans.total_repayment_amount|{allowNull, type}|Loan.total_repayment_amount), coefficient: (*|loans.coefficient|{allowNull, type}|Loan.coefficient), id: *, dateMaturity: (*|loans.date_maturity|{allowNull, type}|Loan.date_maturity), dateIssue: (*|Loan.date_issue|{allowNull, type}|loans.date_issue)} | never>}
 */
const findLoan = id => {
    const query = {
        attributes: [
            'id',
            'amount',
            'coefficient',
            'date_issue',
            'date_maturity',
            'total_repayment_amount',
        ],
        where: {
            id,
        },
        include: [
            {
                model: Client,
                as: 'client',
            },
        ],
    };

    return Loan.findOne(query)
        .then(loan => ({
            id: loan.id,
            amount: loan.amount,
            coefficient: loan.coefficient,
            dateIssue: loan.date_issue,
            dateMaturity: loan.date_maturity,
            totalRepaymentAmount: loan.total_repayment_amount,
        }));
};

/**
 * @param body
 * @param managerId
 * @returns {data}
 */
const makeCreating = (body, managerId) => {
    const {
        amount,
        coefficient,
        clientId,
        dateIssue,
        dateMaturity,
        totalRepaymentAmount,
    } = body;

    const data = {
        amount,
        coefficient,
        client_id: clientId,
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
    findAllLoans,
    findLoan,
    makeCreating,
    makeUpdating,
    makeUpdatingIssueLoan,
};
