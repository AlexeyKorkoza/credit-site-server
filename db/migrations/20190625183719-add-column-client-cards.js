const tableName = 'client_cards';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(tableName, 'id', {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      }),
    ];
  },

  down: queryInterface => [
    queryInterface.removeColumn(tableName, 'id'),
  ],
};
