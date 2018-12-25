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
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        tableName: 'client_cards',
        timestamps: false,
        paranoid: false,
    });

    ClientCard.associate = models => {
        ClientCard.belongsTo(models.Client, {
            as: 'clients',
            foreignKey: 'client_id',
        });
    };

    return ClientCard;
};
