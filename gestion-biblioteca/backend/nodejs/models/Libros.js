const { DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Asegúrate de importar bien la conexión

const Libros = sequelize.define('Libros', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  autor: {
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  tableName: 'libros',
  timestamps: false,
});

module.exports = Libros;
