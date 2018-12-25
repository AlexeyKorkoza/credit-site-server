const admins = require('../data/admins');

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.bulkInsert('admins', admins, {});
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('admins', null, {});
    },
};
