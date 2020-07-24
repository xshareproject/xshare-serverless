const Sequelize = require('sequelize');
const dbConnector = require("../config/database");
const {v4: uuidv4} = require('uuid');
const User = require('../models/User');

const Contact = dbConnector.define('contact', {
    cid: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4()
    },
    contactOwnerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: User,
            key: 'uid',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE 
        }
    },
    name: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    email: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    phoneNumber: {
        type: Sequelize.TEXT
    },
    createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: dbConnector.fn('now')
    },
    updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: dbConnector.fn('now')
    }

});

module.exports = Contact;