import moment from 'moment';

/**
 * @param start {Date}
 * @param end {Date}
 * @return {boolean}
 */
export const compareDates = (start, end) => !!moment(end).isAfter(start, 'days');

/**
 * @param start {Date}
 * @param end {Date}
 * @return {number}
 */
export const subtractDates = (start, end) => moment(end).diff(start, 'days');
