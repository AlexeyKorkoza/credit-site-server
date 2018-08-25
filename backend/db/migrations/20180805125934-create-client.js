module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('clients', {
            id: {
                type: Sequelize.INTEGER,
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            passport_data: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            phone: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            email: {
                type: Sequelize.STRING(255),
                allowNull: false,
            },
            is_blocked: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            territory: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            admin_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'admins',
                    key: 'id',
                    as: 'admin_id',
                },
            },
            manager_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'managers',
                    key: 'id',
                    as: 'manager_id',
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

    down: queryInterface => queryInterface.dropTable('clients'),
};
