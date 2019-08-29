import moment from 'moment';

/**
 * @param start {Date}
 * @param end {Date}
 * @return {number}
 */
export default (start, end) => moment(end).diff(start, 'days');

