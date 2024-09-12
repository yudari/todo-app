const express = require('express');
const router = express.Router();
const { Todo } = require('../models');

/**
 * @swagger
 * components:
 *   schemas:
 *     Todo:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           description: ID dari todo
 *           example: 1
 *         description:
 *           type: string
 *           description: Deskripsi todo
 *           example: 'Belajar Swagger'
 *         completed:
 *           type: boolean
 *           description: Status selesai dari todo
 *           example: false
 *       required:
 *         - description
 *         - completed
 */

/**
 * Mendapatkan semua data todo
 * @swagger
 * /todos:
 *   get:
 *     summary: Mendapatkan semua data todo
 *     description: Mengambil daftar semua todo yang ada dalam database.
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Terjadi kesalahan internal server'
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
 *     description: Menambahkan todo baru ke dalam database.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       201:
 *         description: Created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Deskripsi todo harus diisi'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Terjadi kesalahan internal server'
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
 *     description: Memperbarui informasi todo yang sudah ada.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Todo'
 *     responses:
 *       200:
 *         description: Updated
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Todo'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Deskripsi todo harus diisi'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Todo tidak ditemukan'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Terjadi kesalahan internal server'
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
 *     description: Menghapus todo yang sudah ada dalam database.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 1
 *     responses:
 *       204:
 *         description: Deleted
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Todo tidak ditemukan'
 *       500:
 *         description: Internal Server Error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: 'Terjadi kesalahan internal server'
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
