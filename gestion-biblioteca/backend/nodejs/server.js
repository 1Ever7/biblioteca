const express = require('express');
const dotenv = require('dotenv');
const usuarioRoutes = require('./routes/usuarioRoutes');
const pool = require('./config/db');
const path = require('path');

dotenv.config();

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas
app.use('/api/usuarios', usuarioRoutes);

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, '/public')));

// Manejar la ruta raíz ("/") para cargar el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

// Probar la conexión a la base de datos al iniciar el servidor
pool.connect((err, client, release) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.stack);
        process.exit(1); // Detiene la aplicación si hay un error de conexión
    }
    console.log('Conexión exitosa a la base de datos PostgreSQL');
    release(); // Libera el cliente de la conexión
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});