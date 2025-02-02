const {
    getAllPrestamos,
    getPrestamoById,
    createPrestamo,
    updatePrestamo,
    deletePrestamo
} = require('../models/Prestamos');

// Obtener todos los préstamos
exports.getAllPrestamos = async (req, res) => {
    try {
        const prestamos = await getAllPrestamos();
        res.json(prestamos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener préstamos' });
    }
};

// Obtener un préstamo por ID
exports.getPrestamoById = async (req, res) => {
    try {
        const { id } = req.params;
        const prestamo = await getPrestamoById(id);
        if (!prestamo) {
            return res.status(404).json({ error: 'Préstamo no encontrado' });
        }
        res.json(prestamo);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener préstamo' });
    }
};

// Crear un nuevo préstamo
exports.createPrestamo = async (req, res) => {
    try {
        const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado } = req.body;
        const nuevoPrestamo = await createPrestamo(usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado);
        res.status(201).json(nuevoPrestamo);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear préstamo' });
    }
};

// Actualizar un préstamo
exports.updatePrestamo = async (req, res) => {
    try {
        const { id } = req.params;
        const { usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado } = req.body;
        const prestamoActualizado = await updatePrestamo(id, usuario_id, libro_id, fecha_prestamo, fecha_devolucion, estado);
        if (!prestamoActualizado) {
            return res.status(404).json({ error: 'Préstamo no encontrado' });
        }
        res.json(prestamoActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar préstamo' });
    }
};

// Eliminar un préstamo
exports.deletePrestamo = async (req, res) => {
    try {
        const { id } = req.params;
        await deletePrestamo(id);
        res.json({ message: 'Préstamo eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar préstamo' });
    }
};