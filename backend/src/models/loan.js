module.exports = (sequelize, DataTypes) => {
    const Loan = sequelize.define('Loan', {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
        },
        amount: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        coefficient: {
            type: DataTypes.FLOAT,
            allowNull: false,
        },
        date_issue: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        date_maturity: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        total_repayment_amount: {
            type: DataTypes.FLOAT,
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

    Loan.associate = models => {
        Loan.belongsTo(models.Admin, {
            foreignKey: 'admin_id',
        });
        Loan.belongsTo(models.Manager, {
            foreignKey: 'manager_id',
        });
    };

    return Loan;
};
