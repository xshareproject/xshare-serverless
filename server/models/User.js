const Sequelize = require('sequelize');
const dbConnector = require("../config/database");
const {v4: uuidv4} = require('uuid');

const User = dbConnector.define('user', {
    uid: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4()
    },
    fname: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    lname: {
        type: Sequelize.TEXT,
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
        allowNull: false,
        defaultValue: 0.0   
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Date.now()    
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Date.now()       
    }
});

module.exports = User;