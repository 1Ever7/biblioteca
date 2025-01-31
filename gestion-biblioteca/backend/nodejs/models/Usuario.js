const pool = require('../config/db');

// Obtener todos los usuarios
const getAllUsuarios = async () => {
    const result = await pool.query('SELECT * FROM usuarios');
    return result.rows;
};

// Obtener un usuario por ID
const getUsuarioById = async (id) => {
    const result = await pool.query('SELECT * FROM usuarios WHERE id = $1', [id]);
    return result.rows[0];
};

// Crear un nuevo usuario
const createUsuario = async (nombre, correo, telefono, rol) => {
    const result = await pool.query(
        'INSERT INTO usuarios (nombre, correo, telefono, rol) VALUES ($1, $2, $3, $4) RETURNING *',
        [nombre, correo, telefono, rol]
    );
    return result.rows[0];
};

// Actualizar un usuario
const updateUsuario = async (id, nombre, correo, telefono, rol) => {
    const result = await pool.query(
        'UPDATE usuarios SET nombre = $1, correo = $2, telefono = $3, rol = $4 WHERE id = $5 RETURNING *',
        [nombre, correo, telefono, rol, id]
    );
    return result.rows[0];
};

// Eliminar un usuario
const deleteUsuario = async (id) => {
    await pool.query('DELETE FROM usuarios WHERE id = $1', [id]);
};

module.exports = {
    getAllUsuarios,
    getUsuarioById,
    createUsuario,
    updateUsuario,
    deleteUsuario,
};