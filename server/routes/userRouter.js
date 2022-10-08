const express = require('express')
const userController = require('../controllers/userController')
const authMiddleware = require('../middleware/authMiddleware')
const router = express.Router()

router.post('/registration', userController.registration)
router.post('/login', userController.login)
router.get('/auth', authMiddleware, userController.check)
router.get('/basket', authMiddleware, userController.basket)
router.post('/basket', authMiddleware, userController.addToBasket)
router.post('/rate', authMiddleware, userController.rate)

module.exports = router