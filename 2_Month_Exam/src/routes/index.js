const adminRouter = require('./admin.route')
const authUserRouter = require('./auth.route')
const serviceRouter = require('./service.route')
const feedbackRouter = require('./feedback.route')
const contactRouter = require('./contact.route')

module.exports = [
    authUserRouter,
    serviceRouter,
    feedbackRouter,
    contactRouter,
    adminRouter
]