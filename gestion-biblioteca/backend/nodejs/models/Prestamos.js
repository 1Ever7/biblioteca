const pool = require('../config/db');

class Prestamo {
    static async getAllPrestamos() {
        const result = await pool.query(
             'SELECT prestamos_prestamo.id, prestamos_usuario.nombre AS usuario_nombre, prestamos_libro.titulo AS libro_titulo, prestamos_prestamo.fecha_prestamo, prestamos_prestamo.fecha_devolucion, prestamos_prestamo.estado FROM prestamos_prestamo JOIN prestamos_usuario ON prestamos_prestamo.usuario_id = prestamos_usuario.id JOIN prestamos_libro ON prestamos_prestamo.libro_id = prestamos_libro.id ');
         return result.rows;
    }

    static async getById(id) {
        const result = await pool.query('SELECT * FROM prestamos WHERE ID = $1', [id]);
        return result.rows[0];
    }

    static async create(data) {
        const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado } = data;
        const result = await pool.query(
            'INSERT INTO prestamos (usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado]
        );
        return result.rows[0];
    }

    static async update(id, data) {
        const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado } = data;
        const result = await pool.query(
            'UPDATE prestamos SET usuario_id = $1, libro_id = $2, fecha_prestamo = $3, fecha_devolucion = $4, estado = $5 WHERE ID = $6 RETURNING *',
            [usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado, id]
        );
        return result.rows[0];
    }

    static async delete(id) {
        const result = await pool.query('DELETE FROM prestamos WHERE ID = $1', [id]);
        return result.rowCount > 0;
    }
}

module.exports = Prestamo;