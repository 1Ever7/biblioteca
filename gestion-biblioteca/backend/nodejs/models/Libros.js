const pool = require('../config/db');

// Obtener todos los libros
const getAllLibros = async () => {
    const result = await pool.query('SELECT * FROM libros');
    return result.rows;
};

// Obtener un libro por ID
const getLibroById = async (id) => {
    const result = await pool.query('SELECT * FROM libros WHERE id = $1', [id]);
    return result.rows[0];
};

// Crear un nuevo libro
const createLibro = async (titulo, autor, categoria, stock) => {
    const result = await pool.query(
        'INSERT INTO libros (titulo, autor, categoria, stock) VALUES ($1, $2, $3, $4) RETURNING *',
        [titulo, autor, categoria, stock]
    );
    return result.rows[0];
};

// Actualizar un libro
const updateLibro = async (id, titulo, autor, categoria, stock) => {
    const result = await pool.query(
        'UPDATE libros SET titulo = $1, autor = $2, categoria = $3, stock = $4 WHERE id = $5 RETURNING *',
        [titulo, autor, categoria, stock, id]
    );
    return result.rows[0];
};

// Eliminar un libro
const deleteLibro = async (id) => {
    await pool.query('DELETE FROM libros WHERE id = $1', [id]);
};

module.exports = {
    getAllLibros,
    getLibroById,
    createLibro,
    updateLibro,
    deleteLibro,
};