const express = require('express');
const router = express.Router();
const { Todo } = require('../models');

/**
 * Mendapatkan semua data todo
 * @swagger
 * /todos:
 *   get:
 *     summary: Mendapatkan semua data todo
 *     responses:
 *       200:
 *         description: List of todos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Todo'
 *       500:
 *         description: Internal Server Error
 */
router.get('/todos', async (req, res) => {
    try {
        const todos = await Todo.findAll();
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Terjadi kesalahan internal server' });
    }
});

/**
 * Membuat data todo baru
 * @swagger
 * /todos:
 *   post:
 *     summary: Membuat data todo baru
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Created
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */
router.post('/todos', async (req, res) => {
    try {
        const { description, completed } = req.body;
        if (!description) {
            return res.status(400).json({ message: 'Deskripsi todo harus diisi' });
        }
        const newTodo = await Todo.create({ description, completed: completed || false });
        res.status(201).json(newTodo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Terjadi kesalahan internal server' });
    }
});

/**
 * Mengupdate data todo
 * @swagger
 * /todos/{id}:
 *   put:
 *     summary: Mengupdate data todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Updated
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.put('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { description, completed } = req.body;
        if (!description) {
            return res.status(400).json({ message: 'Deskripsi todo harus diisi' });
        }
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo tidak ditemukan' });
        }
        await todo.update({ description, completed });
        res.json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Terjadi kesalahan internal server' });
    }
});

/**
 * Menghapus data todo
 * @swagger
 * /todos/{id}:
 *   delete:
 *     summary: Menghapus data todo
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not Found
 *       500:
 *         description: Internal Server Error
 */
router.delete('/todos/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ message: 'Todo tidak ditemukan' });
        }
        await todo.destroy();
        res.sendStatus(204);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Terjadi kesalahan internal server' });
    }
});

module.exports = router;

