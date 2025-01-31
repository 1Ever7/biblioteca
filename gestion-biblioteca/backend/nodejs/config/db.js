const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('postgres://postgres:123@localhost:5433/biblioteca', {
  dialect: 'postgres',
  logging: false, // Desactiva los logs de SQL
});

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexión a la base de datos exitosa');
  } catch (error) {
    console.error('No se pudo conectar a la base de datos:', error);
  }
};

module.exports = { sequelize, connectDB };
