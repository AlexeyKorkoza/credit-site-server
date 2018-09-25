module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('clients', 'refresh_token', {
            type: Sequelize.TEXT,
            defaultValue: null,
        });
    },

    down: queryInterface => queryInterface.removeColumn('clients', 'refresh_token'),
};
