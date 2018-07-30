const config = require('config');

module.exports = {
    url: config.get('database.calendar.urn'),
};
