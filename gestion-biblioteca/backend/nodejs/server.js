const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { connectDB } = require('./config/db');
const usuarioRoutes = require('./routes/usuarioRoutes');
const path = require('path');
const Libros = require('./models/Libros');
const Prestamo = require('./models/Prestamo');



const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexión a la base de datos
connectDB();

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Configurar EJS como motor de plantillas
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Ruta para la página principal
app.get('/', async (req, res) => {
  try {
      // Obtener todos los usuarios desde la base de datos
      const usuarios = await Usuario.findAll();
      // Pasar la variable "usuarios" a la vista
      res.render('index', { usuarios });
  } catch (error) {
      console.error('Error al obtener los usuarios:', error);
      res.status(500).send('Error al obtener los usuarios');
  }
});

// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor de Node.js corriendo en puerto 3000');
});
