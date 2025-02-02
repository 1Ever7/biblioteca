const express = require('express');
const router = express.Router();
const libroController = require('../controllers/librosController');

// Rutas para libros
router.get('/', libroController.getAllLibros); // Obtener todos los libros
router.get('/:id', libroController.getLibroById); // Obtener un libro por ID
router.post('/', libroController.createLibro); // Crear un nuevo libro
router.put('/:id', libroController.updateLibro); // Actualizar un libro
router.delete('/:id', libroController.deleteLibro); // Eliminar un libro

module.exports = router;