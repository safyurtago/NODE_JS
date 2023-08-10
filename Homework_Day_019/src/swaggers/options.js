const swaggerJSDoc = require('swagger-jSDoc');


const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        version: '1.0.0',
        title: 'API Documentation',
        description: 'API Documentation for login and registration',
        servers: ['http://localhost:8080']
    },
}

const options = {
    swaggerDefinition,
    apis: ['src/swaggers/*.swagger.js']
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = {swaggerSpec};