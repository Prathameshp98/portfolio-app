const express = require('express')

const userController = require('../controllers/users')

const router = express.Router()

// /users/all-users
router.get('/all-users', userController.getPosts)

// /users/create-user
router.post('/create-user',userController.createPost)

// /users/user-by-id
router.get('/user-by-id/:userId', userController.getPost)

module.exports = router