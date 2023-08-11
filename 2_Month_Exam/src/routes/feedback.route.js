const {Router} = require('express')

const {isAuth} = require('../middlewares/isAuth.middleware')
const {isAdmin} = require('../middlewares/isAdmin.middleware')
const {feedbackValidate} = require('../validations/feedback.validate')
const {createFeedback, getAllFeedback, getOneFeedback, updateFeedback, deleteFeedback} = require('../controllers/feedback.controller')

const router = Router()

router.post('/feedback/register', isAuth, feedbackValidate, createFeedback)
router.get('/feedbacks', getAllFeedback)
router.get('/feedbacks/:id', getOneFeedback)
router.put('/feedback/update/:id', isAdmin, feedbackValidate, updateFeedback)
router.delete('/feedback/delete/:id', isAdmin, deleteFeedback)


module.exports = router