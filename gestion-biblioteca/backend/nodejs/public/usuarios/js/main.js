document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('usuario-form');
    const tableBody = document.getElementById('usuarios-table-body');
    const formTitle = document.getElementById('form-title');
    const cancelEditButton = document.getElementById('cancel-edit');
    const usuarioIdInput = document.getElementById('usuario-id');

    let usuarios = [];
    let editMode = false;

    // Cargar usuarios al iniciar
    fetchUsuarios();

    // Función para cargar usuarios desde el backend
    async function fetchUsuarios() {
        try {
            const response = await axios.get('/api/usuarios');
            usuarios = response.data;
            renderUsuarios();
        } catch (error) {
            console.error('Error al cargar usuarios:', error);
        }
    }

    // Función para renderizar usuarios en la tabla
    function renderUsuarios() {
        tableBody.innerHTML = '';
        usuarios.forEach(usuario => {
            const row = `
                <tr>
                    <td>${usuario.id}</td>
                    <td>${usuario.nombre}</td>
                    <td>${usuario.correo}</td>
                    <td>${usuario.telefono || '-'}</td>
                    <td>${usuario.rol}</td>
                    <td>
                        <button class="btn btn-warning btn-sm me-2" onclick="editUsuario(${usuario.id})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteUsuario(${usuario.id})">Eliminar</button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }

    // Manejar el envío del formulario
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const nombre = document.getElementById('nombre').value;
        const correo = document.getElementById('correo').value;
        const telefono = document.getElementById('telefono').value;
        const rol = document.getElementById('rol').value;

        try {
            if (editMode) {
                // Actualizar usuario
                await axios.put(`/api/usuarios/${usuarioIdInput.value}`, { nombre, correo, telefono, rol });
                editMode = false;
                formTitle.textContent = 'Crear Usuario';
                cancelEditButton.style.display = 'none';
            } else {
                // Crear nuevo usuario
                await axios.post('/api/usuarios', { nombre, correo, telefono, rol });
            }
            form.reset();
            fetchUsuarios();
        } catch (error) {
            console.error('Error al guardar usuario:', error);
        }
    });

    // Función para editar un usuario
    window.editUsuario = async (id) => {
        const usuario = usuarios.find(u => u.id == id);
        if (usuario) {
            document.getElementById('nombre').value = usuario.nombre;
            document.getElementById('correo').value = usuario.correo;
            document.getElementById('telefono').value = usuario.telefono || '';
            document.getElementById('rol').value = usuario.rol;
            usuarioIdInput.value = usuario.id;
            formTitle.textContent = 'Editar Usuario';
            cancelEditButton.style.display = 'inline-block';
            editMode = true;
        }
    };

    // Función para cancelar la edición
    cancelEditButton.addEventListener('click', () => {
        form.reset();
        formTitle.textContent = 'Crear Usuario';
        cancelEditButton.style.display = 'none';
        editMode = false;
    });

    // Función para eliminar un usuario
    window.deleteUsuario = async (id) => {
        if (confirm('¿Estás seguro de eliminar este usuario?')) {
            try {
                await axios.delete(`/api/usuarios/${id}`);
                fetchUsuarios();
            } catch (error) {
                console.error('Error al eliminar usuario:', error);
            }
        }
    };
});