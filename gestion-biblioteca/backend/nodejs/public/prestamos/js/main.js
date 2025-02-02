document.addEventListener('DOMContentLoaded', () => {
    const tableBody = document.getElementById('prestamos-table-body');
    let prestamos = [];

    // Función para cargar préstamos desde el backend
    async function fetchPrestamos() {
        try {
            const response = await axios.get('/api/prestamos');
            prestamos = response.data;
            renderPrestamos();
        } catch (error) {
            console.error('Error al cargar préstamos:', error);
        }
    }

    // Función para renderizar préstamos en la tabla
    function renderPrestamos() {
        tableBody.innerHTML = '';
        prestamos.forEach(prestamo => {
            const row = `
                <tr>
                    <td>${prestamo.id}</td>
                    <td>${prestamo.usuario_nombre}</td>
                    <td>${prestamo.libro_titulo}</td>
                    <td>${prestamo.fecha_prestamo}</td>
                    <td>${prestamo.fecha_devolucion || 'devuelto'}</td>
                    <td>${prestamo.estado}</td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    // Cargar préstamos al iniciar
    fetchPrestamos();
});