module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('admins', 'refresh_token', {
            type: Sequelize.TEXT,
            defaultValue: null,
        });
    },

    down: queryInterface => queryInterface.removeColumn('admins', 'refresh_token'),
};
