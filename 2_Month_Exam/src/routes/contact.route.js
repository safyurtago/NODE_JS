const {Router} = require('express')
const { sendContact, getAllContact } = require('../controllers/contact.controller')
const {isAuth} = require('../middlewares/isAuth.middleware')
const {contactValidate} = require('../validations/contact.validate')
const {isAdmin} = require('../middlewares/isAdmin.middleware')

const router = Router()

router.post('/contact/send', isAuth, contactValidate, sendContact)
router.get('/contacts', isAdmin, getAllContact)

module.exports = router