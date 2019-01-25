const express = require('express');
const router = express.Router();

const User = require('../models/users');

//index
router.get('/', (req, res) => {
    User.find({}, (err, allUsers) => {
        if (err) {
            res.send(err);
        } else {
            res.render('index.ejs', {
                userList: allUsers
            });
        }
    });

});

//create
router.get('/new', (req, res) => {
    res.render('new.ejs')
})

router.post('/', (req, res) => {
    console.log('req.body', req.body)
    User.create(req.body, (err, createdUser) => {
        if (err) {
            res.send(err);
        } else {
            console.log(createdUser);
            res.redirect('/users');
        }
    })
})

//edit
router.get('/:id/edit', (req, res) => {
    User.findById(req.params.id, (err, editUser) => {
        if (err) {
            res.send(err);
        } else {
            res.render('edit.ejs', {
                users: editUser
            });
        }
    });
});

router.put('/:id', (req, res) => {
    User.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (err, updatedUser) => {
        if (err) {
            res.send(err)
        } else {
            console.log(updatedUser);
            res.redirect('/users');
        }
    });
});

//show
router.get('/:id', (req, res) => {
    User.findById(req.params.id, (err, foundUser) => {
        if (err) {
            res.send(err);
        } else {
            res.render('show.ejs', {
                user: foundUser
            });
        }
    });
});

//delete
router.delete('/:id', (req, res) => {
    User.findByIdAndRemove(req.params.id, (err, deleted) => {
        if (err) {
            res.send(err);
        } else {
            console.log(deleted);
            res.redirect('/users')
        }
    });
});

module.exports = router;