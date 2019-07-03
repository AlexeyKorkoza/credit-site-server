/**
 * @param start {Date}
 * @param end {Date}
 * @return {number}
 */
const subtractDates = (start, end) => Math.abs(start - end);

/**
 * @param date {Date}
 * @return {number}
 */
const convertToDays = date => date / 1000 / 60 / 60 / 24;

export {
    convertToDays,
    subtractDates,
};

