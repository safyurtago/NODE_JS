const {Router} = require('express');
const { login, register } = require('../controllers/auth.controller');
const {authValidate} = require('../validations/auth.validitions');
const isAuth = require('../middlewares/isAuth.middleware')


const router = Router();

router.post('/auth/login', isAuth, login)
router.post('/auth/register', authValidate, register)

module.exports = router;