import {
    compareDates,
    subtractDates,
} from "../utils";

export default (dateIssue, dateMaturity, state) => {
    const {
        amount: surchargeFactor,
        selectedTerritory,
        territories,
    } = state;

    if (!dateIssue || !dateMaturity) {
        return {
            dateIssue,
            dateMaturity,
        };
    }

    if (!compareDates(dateIssue, dateMaturity)) {
        return {
            dateIssue,
            dateMaturity,
        };
    }

    const territory = territories.find(e => +e.value === +selectedTerritory.value);
    const { value: territoryValue } = territory;
    const duration = subtractDates(dateIssue, dateMaturity);
    const totalRepaymentAmount = (duration * +territoryValue) + +surchargeFactor;

    return {
        dateIssue,
        dateMaturity,
        totalRepaymentAmount,
    };
};
