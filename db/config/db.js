const config = require('config');

module.exports = {
    url: config.get('database.credit_site.urn'),
};
