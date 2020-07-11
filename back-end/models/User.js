const Sequelize = require('sequelize');
const dbConnector = require("../config/database");

const User = dbConnector.define('user', {
    uid: {
        type: Sequelize.UUID,
        allowNull: false,
        primaryKey: true
    },
    fname: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    lname: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    password: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    balance: {
        type: Sequelize.NUMBER,
        allowNull: false   
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false
    }
});

module.exports = User;