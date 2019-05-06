module.exports = (sequelize, DataTypes) => {
    const Client = sequelize.define('Client', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        passport_data: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        is_removed: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        territory: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        tableName: 'clients',
        timestamps: false,
        paranoid: false,
    });

    Client.associate = models => {
        Client.belongsTo(models.Admin, {
            as: 'admins',
            foreignKey: 'admin_id',
        });

        Client.belongsTo(models.Manager, {
            as: 'managers',
            foreignKey: 'manager_id',
        });
    };

    return Client;
};
