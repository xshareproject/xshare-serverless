const express = require('express');
const router = express.Router();
const dbConnector = require('../config/database');
const User = require('../models/User');

router.get('/', (req, res) => 
    User.findAll()
    .then(users => {
        console.log(users)
    })
    .catch(err => {
        console.log(err)
    }));

module.exports = router; 