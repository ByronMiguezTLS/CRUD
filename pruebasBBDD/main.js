document.addEventListener('DOMContentLoaded', function() {
    // Función para validar los campos del formulario
    function validarForm() {
        let correo = document.getElementById('inputEmail').value.trim();
        let nombre = document.getElementById('inputName').value.trim();
        let telefono = document.getElementById('inputPhone').value.trim();

        // Validación del campo correo
        if (correo === '') {
            alert('El campo de correo es obligatorio');
            return false;
        } else if (!correo.includes('@')) {
            alert('El correo no es válido');
            return false;
        }

        // Validación del campo nombre
        if (nombre === '') {
            alert('El nombre es obligatorio');
            return false;
        }

        // Validación del campo teléfono
        if (telefono === '') {
            alert('El teléfono es obligatorio');
            return false;
        }

        return true; // Retorna true si todos los campos están validados correctamente
    }

    // Función para leer datos desde localStorage y mostrar en la tabla
    function leer() {
        let listarPersonas;
        if (localStorage.getItem('listarPersonas') == null){
            listarPersonas = [];
        }else{
            listarPersonas = JSON.parse(localStorage.getItem('listarPersonas'));
        }
        let html = '';

        listarPersonas.forEach(function(objeto, index) {
            html += '<tr>';
            html += '<td>' + objeto.correo + '</td>';
            html += '<td>' + objeto.nombre + '</td>';
            html += '<td>' + objeto.telefono + '</td>';
            html += '<td><button onclick="editData(' + index + ')" class="btn btn-warning">Modificar</button></td>';
            html += '</tr>';
        });

        document.getElementById('tableData').innerHTML = html;
    }

    // Función para agregar o actualizar datos en localStorage
    function añadir() {
        if (validarForm()) {
            let correo = document.getElementById('inputEmail').value.trim();
            let nombre = document.getElementById('inputName').value.trim();
            let telefono = document.getElementById('inputPhone').value.trim();

            let listarPersonas = JSON.parse(localStorage.getItem('listarPersonas')) || [];

            let data = {
                correo: correo,
                nombre: nombre,
                telefono: telefono,
            };

            // Verifica si se está editando o agregando nuevos datos
            let btnAdd = document.getElementById('btnAdd');
            let btnUpdate = document.getElementById('btnUpdate');

            if (btnAdd.style.display !== 'none') {
                // Agrega nuevos datos
                listarPersonas.push(data);
            } else {
                // Actualiza datos existentes
                let index = btnUpdate.getAttribute('data-index');
                listarPersonas[index] = data;
            }

            localStorage.setItem('listarPersonas', JSON.stringify(listarPersonas));

            leer(); // Actualiza la tabla después de agregar/actualizar datos

            // Reinicia el formulario y muestra el botón de agregar
            document.getElementById('formData').reset();
            btnAdd.style.display = 'block';
            btnUpdate.style.display = 'none';
        }
    }

    function eliminar(index) {

        let listarPersonas;
        if (localStorage.getItem('listarPersonas') == null){
            listarPersonas = [];
        }else{
            listarPersonas = JSON.parse(localStorage.getItem('listarPersonas'));
        }

        listarPersonas.splice(index ,1);
        localStorage.setItem('listarPersonas')
    }
    // Función para editar datos existentes
    window.editData = function(index) {
        let listarPersonas = JSON.parse(localStorage.getItem('listarPersonas')) || [];
        let data = listarPersonas[index];

        if (data) {
            document.getElementById('inputEmail').value = data.correo;
            document.getElementById('inputName').value = data.nombre;
            document.getElementById('inputPhone').value = data.telefono;

            // Muestra el botón de actualizar y oculta el botón de agregar
            let btnAdd = document.getElementById('btnAdd');
            let btnUpdate = document.getElementById('btnUpdate');

            btnAdd.style.display = 'none';
            btnUpdate.style.display = 'block';
            btnUpdate.setAttribute('data-index', index.toString());
        }
    };

    // Carga los datos iniciales al cargar la página
    leer();

    // Evento para el envío del formulario
    document.getElementById('formData').addEventListener('submit', function(event) {
        event.preventDefault(); 
        añadir(); 
    });
});
