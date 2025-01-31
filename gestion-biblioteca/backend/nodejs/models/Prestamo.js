const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/db'); // Importa la conexión
const Libros = require('./Libros'); // Importa Libros

const Prestamo = sequelize.define('Prestamo', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  libroId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Libros,
      key: 'id',
    },
  },
  fechaPrestamo: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  fechaDevolucion: {
    type: DataTypes.DATE,
    allowNull: true,
  },
}, {
  tableName: 'prestamos',
  timestamps: false,
});

// Relación inversa
Prestamo.belongsTo(Libros, { foreignKey: 'libroId' });

module.exports = Prestamo;
