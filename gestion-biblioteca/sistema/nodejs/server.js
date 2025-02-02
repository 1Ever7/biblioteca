const express = require('express');
const dotenv = require('dotenv');
const usuarioRoutes = require('./routes/usuarioRoutes');
const librosRoutes = require('./routes/librosRoutes');
const prestamosRoutes = require('./routes/prestamosRoutes');
const pool = require('./config/db');
const path = require('path');

// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación Express
const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Rutas del API
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/libros', librosRoutes);
app.use('/api/prestamos', prestamosRoutes);

// Servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Servir archivos estáticos desde subcarpetas específicas
app.use('/usuarios', express.static(path.join(__dirname, 'public/usuarios'))); 
app.use('/libros', express.static(path.join(__dirname, 'public/libros')));     
app.use('/prestamos', express.static(path.join(__dirname, 'public/prestamos'))); // Para préstamos

// Manejar la ruta raíz ("/") para cargar el archivo index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Probar la conexión a la base de datos una sola vez
(async () => {
    try {
        const client = await pool.connect();
        console.log('✅ Conexión exitosa a la base de datos PostgreSQL');
        client.release(); // Libera el cliente después de la prueba
    } catch (err) {
        console.error('❌ Error al conectar a la base de datos:', err.stack);
        process.exit(1); // Detiene la aplicación si hay un error crítico
    }
})();

// Middleware para manejar errores centralizadamente
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Ocurrió un error en el servidor' });
});

// Puerto del servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
