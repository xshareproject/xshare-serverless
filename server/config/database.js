const {Sequelize} = require('sequelize');

//Export the object for other file
module.exports = new Sequelize('swish_db', 'postgres', 'postgres', {
    host: 'localhost',
    dialect: 'postgres'
});
  