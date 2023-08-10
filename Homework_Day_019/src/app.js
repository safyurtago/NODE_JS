const express = require('express');
const config = require('../config')
const fileUpload = require('express-fileupload')
const swaggerUi = require('swagger-ui-express')

const {swaggerSpec} = require('./swaggers/options')

const routes = require('./routes')

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(fileUpload())
app.use(express.static(process.cwd() + '/uploads'))
app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec))

app.use('/api', routes)


app.listen(config.port, () => {
    console.log(config.port);
})