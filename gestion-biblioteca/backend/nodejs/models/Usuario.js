const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('../config/db');

// Importa el modelo 'Prestamo'
const Prestamo = require('./Prestamo');

// Definimos el modelo 'Usuario' y vinculamos la tabla 'usuarios'
const Usuario = sequelize.define('Usuario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rol: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'usuarios', // Especificamos el nombre de la tabla
  timestamps: false, // Deshabilitamos las marcas de tiempo si no las usas
});

// Relación: un Usuario puede tener muchos Préstamos
Usuario.hasMany(Prestamo, {
  foreignKey: 'usuarioId', // La clave foránea en Préstamo
});

module.exports = Usuario;
