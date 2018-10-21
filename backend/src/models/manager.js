module.exports = (sequelize, DataTypes) => {
    const Manager = sequelize.define('Manager', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        full_name: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        territory: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        login: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        is_blocked: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: false,
        },
        input_count: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        },
        refresh_token: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.literal('CURRENT_TIMESTAMP'),
        },
    });

    Manager.associate = models => {
        Manager.belongsTo(models.Admin, {
            foreignKey: 'admin_id',
        });
    };

    return Manager;
};
