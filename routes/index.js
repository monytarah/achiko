const UserController = require('../controllers/userController')
const authenticate = require('../middlewares/authenticate')
const router = require('express').Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)

router.use(authenticate)
router.get('/profile', UserController.getUserProfile)

module.exports = router