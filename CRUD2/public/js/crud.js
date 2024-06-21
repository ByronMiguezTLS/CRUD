document.addEventListener("DOMContentLoaded", function() {
    cargarDatos();
});

function cargarDatos() {
    fetch('/api/personas')
        .then(response => response.json())
        .then(personas => {
            let tabla = document.getElementById("tabla").getElementsByTagName("tbody")[0];
            tabla.innerHTML = ""; // Limpiamos la tabla antes de actualizar

            personas.forEach(persona => {
                let fila = tabla.insertRow();

                let cellNombre = fila.insertCell(0);
                cellNombre.textContent = persona.nombre;

                let cellApellido = fila.insertCell(1);
                cellApellido.textContent = persona.apellido;

                let cellPais = fila.insertCell(2);
                cellPais.textContent = persona.pais;

                let cellOpciones = fila.insertCell(3);
                cellOpciones.innerHTML = `<input class="btn btn-primary" type="button" onClick="Editarr(this)" value="Editar" data-id="${persona.id}">
                                          <input class="btn btn-danger" type="button" onClick="Borrarr(this)" value="Borrar" data-id="${persona.id}">`;
            });
        })
        .catch(error => console.error('Error al cargar datos:', error));
}

function onSubmit() {
    let DataForm = Leer();
    if (Fila == null) {
        InsertarDatos(DataForm);
    } else {
        Actualizar(DataForm);
        Vaciar();
    }
}

function Leer() {
    let DataForm = {};
    DataForm["nombre"] = document.getElementById("nombre").value;
    DataForm["apellido"] = document.getElementById("apellido").value;
    DataForm["pais"] = document.getElementById("pais").value;
    return DataForm;
}

function InsertarDatos(data) {
    fetch('/api/personas', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Registro insertado:', result);
        cargarDatos();
        Vaciar();
    })
    .catch(error => console.error('Error al insertar datos:', error));
}

function Vaciar() {
    document.getElementById("nombre").value = "";
    document.getElementById("apellido").value = "";
    document.getElementById("pais").value = "";
    Fila = null;
}

function Editarr(td) {
    Fila = td.parentElement.parentElement;
    document.getElementById("nombre").value = Fila.cells[0].innerHTML;
    document.getElementById("apellido").value = Fila.cells[1].innerHTML;
    document.getElementById("pais").value = Fila.cells[2].innerHTML;
    document.getElementById("nombre").dataset.id = td.dataset.id; // Guardar el ID en el campo de nombre
}


function Actualizar(DataForm) {
    const id = document.getElementById("nombre").dataset.id;
    fetch(`/api/personas/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(DataForm)
    })
    .then(response => response.json())
    .then(result => {
        console.log('Registro actualizado:', result);
        cargarDatos();
        Vaciar();
    })
    .catch(error => console.error('Error al actualizar datos:', error));
}


function Borrarr(td) {
    if (confirm('¿Seguro de borrar este registro?')) {
        const id = td.dataset.id;
        fetch(`/api/personas/${id}`, {
            method: 'DELETE'
        })
        .then(response => response.json())
        .then(result => {
            console.log('Registro eliminado:', result);
            cargarDatos();
            Vaciar();
        })
        .catch(error => console.error('Error al eliminar datos:', error));
    }
}

