document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('libro-form');
    const tableBody = document.getElementById('libros-table-body');
    const formTitle = document.getElementById('form-title');
    const cancelEditButton = document.getElementById('cancel-edit');
    const libroIdInput = document.getElementById('libro-id');
    let libros = [];
    let editMode = false;

    // Cargar libros al iniciar
    fetchLibros();

    // Función para cargar libros desde el backend
    async function fetchLibros() {
        try {
            const response = await axios.get('/api/libros');
            libros = response.data;
            renderLibros();
        } catch (error) {
            console.error('Error al cargar libros:', error);
        }
    }

    // Función para renderizar libros en la tabla
    function renderLibros() {
        tableBody.innerHTML = '';
        libros.forEach(libro => {
            const row = `
                <tr>
                    <td>${libro.id}</td>
                    <td>${libro.titulo}</td>
                    <td>${libro.autor}</td>
                    <td>${libro.categoria }</td>
                    <td>${libro.stock}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-2" onclick="editLibro(${libro.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteLibro(${libro.id})">Eliminar</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    // Manejar el envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const titulo = document.getElementById('titulo').value;
        const autor = document.getElementById('autor').value;
        const categoria = document.getElementById('categoria').value;
        const stock = document.getElementById('stock').value;

        try {
            if (editMode) {
                // Actualizar libro
                await axios.put(`/api/libros/${libroIdInput.value}`, { titulo, autor, categoria, stock });
                editMode = false;
                formTitle.textContent = 'Crear Libro';
                cancelEditButton.style.display = 'none';
            } else {
                // Crear nuevo libro
                await axios.post('/api/libros', { titulo, autor, categoria, stock });
            }
            form.reset();
            fetchLibros();
        } catch (error) {
            console.error('Error al guardar libro:', error);
        }
    });

    // Función para editar un libro
    window.editLibro = async (id) => {
        const libro = libros.find(l => l.id == id);
        if (libro) {
            document.getElementById('titulo').value = libro.titulo;
            document.getElementById('autor').value = libro.autor;
            document.getElementById('categoria').value = libro.categoria;
            document.getElementById('stock').value = libro.stock;
            libroIdInput.value = libro.id;
            formTitle.textContent = 'Editar Libro';
            cancelEditButton.style.display = 'inline-block';
            editMode = true;
        }
    };

    // Función para cancelar la edición
    cancelEditButton.addEventListener('click', () => {
        form.reset();
        formTitle.textContent = 'Crear Libro';
        cancelEditButton.style.display = 'none';
        editMode = false;
    });

    // Función para eliminar un libro
    window.deleteLibro = async (id) => {
        if (confirm('¿Estás seguro de eliminar este libro?')) {
            try {
                await axios.delete(`/api/libros/${id}`);
                fetchLibros();
            } catch (error) {
                console.error('Error al eliminar libro:', error);
            }
        }
    };
});