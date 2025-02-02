const { 
  getAllUsuarios, 
  getUsuarioById, 
  createUsuario, 
  updateUsuario, 
  deleteUsuario 
} = require('../models/Usuario');

// Obtener todos los usuarios
exports.getAllUsuarios = async (req, res) => {
  try {
      const usuarios = await getAllUsuarios();
      res.json(usuarios);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuarios' });
  }
};

// Obtener un usuario por ID
exports.getUsuarioById = async (req, res) => {
  try {
      const { id } = req.params;
      const usuario = await getUsuarioById(id);
      if (!usuario) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(usuario);
  } catch (error) {
      res.status(500).json({ error: 'Error al obtener usuario' });
  }
};

// Crear un nuevo usuario
exports.createUsuario = async (req, res) => {
  try {
      const { nombre, correo, telefono, rol } = req.body;
      const nuevoUsuario = await createUsuario(nombre, correo, telefono, rol);
      res.status(201).json(nuevoUsuario);
  } catch (error) {
      res.status(500).json({ error: 'Error al crear usuario' });
  }
};

// Actualizar un usuario
exports.updateUsuario = async (req, res) => {
  try {
      const { id } = req.params;
      const { nombre, correo, telefono, rol } = req.body;
      const usuarioActualizado = await updateUsuario(id, nombre, correo, telefono, rol);
      if (!usuarioActualizado) {
          return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(usuarioActualizado);
  } catch (error) {
      res.status(500).json({ error: 'Error al actualizar usuario' });
  }
};

// Eliminar un usuario
exports.deleteUsuario = async (req, res) => {
  try {
      const { id } = req.params;
      await deleteUsuario(id);
      res.json({ message: 'Usuario eliminado correctamente' });
  } catch (error) {
      res.status(500).json({ error: 'Error al eliminar usuario' });
  }
};