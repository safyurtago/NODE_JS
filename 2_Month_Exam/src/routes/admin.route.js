const {Router} = require('express');
const { register, login } = require('../controllers/admin.controller');
const {isAuth} = require('../middlewares/isAuth.middleware')


const router = Router();

router.post('/admin/register', register)
router.post('/admin/login', login)


module.exports = router;