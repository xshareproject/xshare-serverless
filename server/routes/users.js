const express = require('express');
const router = express.Router();
const dbConnector = require('../config/database');
const User = require('../models/User');

//Get all users
router.get('/', (req, res) => 
    User.findAll()
    .then(users => {
        console.log(users);
        res.send(users);
    })
    .catch(err => {
        console.log(err)
    }));

//Get users by email or id
router.get('/email/:email', (req, res) =>
{
    let email = req.params.email;
    User.findAll({
        where: { email }
    })
    .then(users => {
        console.log(users);
        res.send(users);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
});

router.get('/id/:uid', (req, res) =>
{
    let uid = req.params.uid;
    User.findAll({
        where: { uid }
    })
    .then(users => {
        console.log(users);
        res.send(users);
    })
    .catch(err => {
        console.log(err);
        res.send(err);
    })
});

//Add new user
router.post('/', (req, res) =>
{
    if(req.body !== null){
        User.create(req.body)
        .then(() => res.sendStatus(200))
        .catch((err) => 
        {
            console.log(err);
            res.send(err);
        });
    }
});

//Update user identified by email
router.put('/email/:email', (req, res) => {
    if(req.body !== null){
        let email = req.params.email;
        User.update( req.body, {
            where: { email }
        })
        .then(() => res.sendStatus(200))
        .catch((err) => 
        {
            console.log(err);
            res.send(err);
        });
    }
})

//Delete user based on email or id
router.delete('/email/:email', (req, res) => {
    let email = req.params.email;
    User.destroy({
        where: { email }
    })
    .then(() => res.sendStatus(200))
    .catch((err) => 
    {
        console.log(err);
        res.send(err);
    });
})

router.delete('/id/:uid', (req, res) => {
    let uid = req.params.uid;
    User.destroy({
        where: { uid }
    })
    .then(() => res.sendStatus(200))
    .catch((err) => 
    {
        console.log(err);
        res.send(err);
    });
})


module.exports = router;  

/*how do we store contact?
if the contact is an user, then store uid in a list
however, if contact is not an user, we store them as name, phone # and email - in separate table with fk uid of user?
*/
