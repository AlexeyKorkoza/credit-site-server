module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.addColumn('managers', 'input_count', {
            type: Sequelize.INTEGER,
            defaultValue: 0,
        });
    },

    down: queryInterface => queryInterface.removeColumn('managers', 'input_count'),
};
