module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('managers', 'refresh_token', {
            type: Sequelize.TEXT,
            defaultValue: null,
        });
    },

    down: queryInterface => queryInterface.removeColumn('managers', 'refresh_token'),
};
