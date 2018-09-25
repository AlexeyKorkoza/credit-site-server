module.exports = (sequelize, DataTypes) => {
    const Admin = sequelize.define('Admin', {
        login: {
            type: DataTypes.STRING(50),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(255),
            allowNull: false,
        },
        refresh_token: {
            type: DataTypes.TEXT,
            defaultValue: null,
        },
    });

    return Admin;
};
