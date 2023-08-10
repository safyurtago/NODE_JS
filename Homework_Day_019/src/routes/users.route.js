const {Router} = require('express');
const { getAll, getOne } = require('../controllers/users.controller');
const isAuth = require('../middlewares/isAuth.middleware')

const router = Router();


router.get('/users', isAuth, getAll);
router.get('/users/:id', isAuth, getOne);


module.exports = router;