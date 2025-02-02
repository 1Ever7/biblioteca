const { 
    getAllLibros, 
    getLibroById, 
    createLibro, 
    updateLibro, 
    deleteLibro 
} = require('../models/Libros');

// Obtener todos los libros
exports.getAllLibros = async (req, res) => {
    try {
        const libros = await getAllLibros();
        res.json(libros);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener libros' });
    }
};

// Obtener un libro por ID
exports.getLibroById = async (req, res) => {
    try {
        const { id } = req.params;
        const libro = await getLibroById(id);
        if (!libro) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        res.json(libro);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener libro' });
    }
};

// Crear un nuevo libro
exports.createLibro = async (req, res) => {
    try {
        const { titulo, autor, categoria, stock } = req.body;
        const nuevoLibro = await createLibro(titulo, autor, categoria, stock);
        res.status(201).json(nuevoLibro);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear libro' });
    }
};

// Actualizar un libro
exports.updateLibro = async (req, res) => {
    try {
        const { id } = req.params;
        const { titulo, autor, categoria, stock } = req.body;
        const libroActualizado = await updateLibro(id, titulo, autor, categoria, stock);
        if (!libroActualizado) {
            return res.status(404).json({ error: 'Libro no encontrado' });
        }
        res.json(libroActualizado);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar libro' });
    }
};

// Eliminar un libro
exports.deleteLibro = async (req, res) => {
    try {
        const { id } = req.params;
        await deleteLibro(id);
        res.json({ message: 'Libro eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar libro' });
    }
};