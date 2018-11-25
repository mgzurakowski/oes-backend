const Sequelize = require('sequelize');

const sequelize = require('../assets/sequlize');

const User = sequelize.define('user', {
    user_id: {
        type:Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        unique: true,
        allowNull: false
    },
    role_id : {
        type:Sequelize.INTEGER,
        allowNull: false,
    },
    last_name: {
        type:Sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type:Sequelize.STRING,
        allowNull: false
    },

    email: {
        type:Sequelize.STRING,
        allowNull: false,
        unique: true,
    },

    password: {
        type:Sequelize.STRING,
        allowNull: false
    },

    confirm: {
        type:Sequelize.BOOLEAN,
        defaultValue: null
    },

    confirmCode: {
        type:Sequelize.STRING,
        defaultValue: null

    },

    authToken: {
        type:Sequelize.STRING,
        defaultValue: null
    }
});
module.exports = User;