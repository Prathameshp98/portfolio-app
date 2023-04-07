const express = require('express')

const downloadController = require('../controllers/downloads')

const router = express.Router()

// /downloads/get-resume
router.get('/get-resume', downloadController.getResume)


module.exports = router