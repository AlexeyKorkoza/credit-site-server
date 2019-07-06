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
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.literal('CURRENT_TIMESTAMP'),
        },
    }, {
        tableName: 'loans',
        timestamps: false,
        paranoid: false,
    });

    Loan.associate = models => {
        Loan.belongsTo(models.Admin, {
            as: 'admins',
            foreignKey: 'admin_id',
        });
        Loan.belongsTo(models.Manager, {
            as: 'managers',
            foreignKey: 'manager_id',
        });
        Loan.belongsTo(models.Client, {
            as: 'client',
            foreignKey: 'client_id',
        });
    };

    return Loan;
};
