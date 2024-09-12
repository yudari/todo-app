const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const { Todo } = require('./models');
const todoRoutes = require('./routes/TodoRoutes')
const swaggerOptions = require('./swagger_options');

// Buat aplikasi express dan gunakan middleware cors agar dapat diakses dari mana saja
const app = express();
app.use(cors());

// Gunakan middleware express.json() untuk mengizinkan request body dalam format JSON
app.use(express.json());

// Buat dokumentasi API dengan menggunakan swagger-jsdoc dan swagger-ui-express
const swaggerDocs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Gunakan route untuk menghandle request ke endpoint /todos
app.use('/', todoRoutes)

// Buat variabel PORT yang berisi nilai port yang digunakan oleh aplikasi
// Jika nilai port tidak didefinisikan di environment, maka gunakan nilai 5000
const PORT = process.env.TODO_BACKEND_APP_PORT || 5000;

// Jalankan aplikasi express dan beri tahu bahwa aplikasi telah berjalan di port yang ditentukan
app.listen(PORT, () => console.log(`Aplikasi berjalan di port ${PORT}`));

