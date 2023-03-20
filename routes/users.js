const express = require('express')

const userController = require('../controllers/users')

const router = express.Router()

// /users/all-users
router.get('/all-users', userController.getUsers)

// /users/create-user
router.post('/create-user',userController.createUser)

// /users/user-by-id
router.get('/user-by-id/:userId', userController.getUser)

module.exports = router