module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('loans', {
            coefficient: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            date_issue: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            date_maturity: {
                type: Sequelize.DATE,
                allowNull: false,
            },
            total_repayment_amount: {
                type: Sequelize.FLOAT,
                allowNull: false,
            },
            manager_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'managers',
                    key: 'id',
                    as: 'manager_id',
                },
            },
            admin_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'admins',
                    key: 'id',
                    as: 'admin_id',
                },
            },
            createdAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },

    down: queryInterface => queryInterface.dropTable('loans'),
};
