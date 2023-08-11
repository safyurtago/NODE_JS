const {Router} = require('express');
const { createService, getAllServices, getOneService, deleteService, updateService } = require('../controllers/service.controller');
const { isAdmin } = require('../middlewares/isAdmin.middleware');
const { isAuth } = require('../middlewares/isAuth.middleware');
const serviceValidate = require('../validations/service.validate');


const router = Router();

router.post('/services/register', isAdmin, serviceValidate, createService)
router.get('/services', getAllServices)
router.get('/services/:id', getOneService)
router.delete('/services/delete/:id', isAdmin, deleteService)
router.put('/services/update/:id', isAdmin, serviceValidate, updateService)



module.exports = router