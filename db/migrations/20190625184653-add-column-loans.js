const tableName = 'loans';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return [
      queryInterface.addColumn(tableName, 'client_id', {
        type: Sequelize.BIGINT,
        references: {
          model: 'clients',
          key: 'id',
          as: 'client_id',
          onUpdate: 'CASCADE',
          onDelete: 'RESTRICT',
        },
      }),
    ];
  },

  down: queryInterface => [
    queryInterface.removeColumn(tableName, 'client_id'),
  ],
};
