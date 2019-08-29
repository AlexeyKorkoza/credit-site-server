import subtractDates from "../utils";

export default (startDate, endDate, state) => {
    const {
        amount: surchargeFactor,
        selectedTerritory,
        territories,
    } = state;

    if (startDate && endDate) {
        const territory = territories.find(e => +e.value === +selectedTerritory.value);
        const { value: territoryValue } = territory;
        const duration = subtractDates(startDate, endDate);
        const totalRepaymentAmount = (duration * +territoryValue) + +surchargeFactor;

        return {
            dateIssue: startDate,
            dateMaturity: endDate,
            totalRepaymentAmount,
        };
    }

    return {
        dateIssue: startDate,
        dateMaturity: endDate,
    };
};
