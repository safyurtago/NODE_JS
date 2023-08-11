const {Router} = require('express');
const {register, login } = require('../controllers/auth.controller');
const {userRegisterValidate} = require('../validations/auth.validate')

const router = Router();

router.post('/auth/register', userRegisterValidate, register)
router.post('/auth/login', login )


module.exports = router;