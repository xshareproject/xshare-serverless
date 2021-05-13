const Contact = require('../models/Contact');
//Get all contact of a user
router.get('/:uid', (req, res) => {
    let uid = req.params.uid;
    Contact.findAll({
        where: { contactOwnerId: uid }
    })
        .then((contacts) => {
        console.log(contacts);
        res.send(contacts);
    })
        .catch(err => {
        console.log(err);
    });
});
//create new contact for a user
router.post('/:uid', (req, res) => {
    if (req.body !== null) {
        Contact.create({
            contactOwnerId: req.params.uid,
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber
        })
            .then((contacts) => {
            console.log(contacts);
            res.sendStatus(200);
        })
            .catch(err => {
            console.log(err);
        });
    }
});
//edit contact for a user
router.put('/:uid/:cid', (req, res) => {
    if (req.body !== null) {
        let contactOwnerId = req.params.uid;
        let cid = req.params.cid;
        Contact.update(req.body, {
            where: { contactOwnerId, cid }
        })
            .then((results) => {
            console.log(results);
            res.sendStatus(200);
        })
            .catch(err => {
            console.log(err);
        });
    }
});
//delete contract 
router.delete('/:uid/:cid', (req, res) => {
    let contactOwnerId = req.params.uid;
    let cid = req.params.cid;
    Contact.destroy({
        where: { contactOwnerId, cid }
    })
        .then(() => res.sendStatus(200))
        .catch((err) => {
        console.log(err);
        res.send(err);
    });
});
module.exports = router;
