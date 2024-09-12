// Swagger setup
const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Todo API',
            version: '1.0.0',
            description: 'Sebuah Simpel API untuk aplikasi Todo Sederhana'
        }
    },
    apis: ['./routes/*.js'],
};

module.exports = swaggerOptions;

