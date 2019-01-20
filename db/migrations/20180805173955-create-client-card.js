module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('client_cards', {
            full_name: {
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
            surcharge_factor: {
                type: Sequelize.INTEGER,
                allowNull: false,
            },
            territory: {
                type: Sequelize.STRING(50),
                allowNull: false,
            },
            client_id: {
                type: Sequelize.BIGINT,
                references: {
                    model: 'clients',
                    key: 'id',
                    as: 'client_id',
                },
            },
            created_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updated_at: {
                type: Sequelize.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
        });
    },

    down: queryInterface => queryInterface.dropTable('client_cards'),
};
