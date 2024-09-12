// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo API',
            version: '1.0.0',
            description: 'A simple API to manage Todos'
        }
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerOptions;

