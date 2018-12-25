module.exports = (sequelize, DataTypes) => {
    const ClientCard = sequelize.define('ClientCard', {
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
        surcharge_factor: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        territory: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    });

    ClientCard.associate = models => {
        ClientCard.belongsTo(models.Client, {
            foreignKey: 'client_id',
        });
    };

    return ClientCard;
};
