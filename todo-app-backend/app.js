const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const { Todo } = require('./models');
const todoRoutes = require('./routes/TodoRoutes')
const swaggerOptions = require('./swagger_options');

const app = express();
app.use(cors());
app.use(express.json());

const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use('/', todoRoutes)

const PORT = process.env.TODO_BACKEND_APP_PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
