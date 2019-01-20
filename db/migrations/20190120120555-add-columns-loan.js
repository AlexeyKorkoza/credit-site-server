module.exports = {
    up: (queryInterface, Sequelize) => {
        return [
            queryInterface.addColumn('loans', 'id', {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            }),
            queryInterface.addColumn('loans', 'amount', {
                type: Sequelize.FLOAT,
                allowNull: false,
            }),
        ];
    },

    down: queryInterface => [
        queryInterface.removeColumn('loans', 'id'),
        queryInterface.removeColumn('loans', 'amount'),
    ],
};
