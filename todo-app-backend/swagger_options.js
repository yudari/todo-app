// Swagger setup
const swaggerOptions = {
    swaggerDefinition: {
        info: {
            title: 'Todo API',
            version: '1.0.0',
            description: 'API untuk mengelola Todo',
        },
        host: 'localhost:5000',
        basePath: '/',
        schemes: ['http'],
        consumes: ['application/json'],
        produces: ['application/json'],
        components: {
            schemas: {
                Todo: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'integer',
                            format: 'int64',
                            example: 1,
                        },
                        description: {
                            type: 'string',
                            example: 'contoh deskripsi todo',
                        },
                        completed: {
                            type: 'boolean',
                            example: false,
                        },
                    },
                    required: ['description'],
                },
            },
        },
    },
    apis: ['./routes/*.js']
};

module.exports = swaggerOptions;
