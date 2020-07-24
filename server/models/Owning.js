const Sequelize = require('sequelize');
const dbConnector = require("../config/database");
const {v4: uuidv4} = require('uuid');

const Owning = dbConnector.define('owning', {
    oid: {
        type: Sequelize.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: uuidv4()
    },
    lenderId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: Users,
            key: 'uid',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE 
        }
    },
    ownerId: {
        type: Sequelize.UUID,
        allowNull: false,
        references: {
            model: Contact,
            key: 'cid',
            deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE 
        }
    },
    description: {
        type: Sequelize.TEXT
    },
    amount: {
        type: Sequelize.NUMBER,
        allowNull: false,
        defaultValue: 0.0
    },
    status: {
        type: Sequelize.DataTypes.ENUM('paid', 'unpaid'),
        allowNull: false,
        defaultValue: 'unpaid'
    },
    recurring: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: false
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

