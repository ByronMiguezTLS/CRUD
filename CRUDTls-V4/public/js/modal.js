// modals.js

// Abre el modal con el contenido adecuado basado en la acción especificada
function openModal(action) {
    const modal = document.getElementById("myModal");
    const modalHeader = document.getElementById("modalHeader");
    const modalBody = document.getElementById("modalBody");
    const saveButton = document.querySelector(".btn-save");

    modal.style.display = "block";

    if (action === 'add') {
        modalHeader.innerHTML = '<h2>Añadir Material</h2>';
        modalBody.innerHTML = `
            <form id="addForm">
                <label for="marca">Marca:</label>
                <input type="text" id="marca" name="marca"><br><br>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre"><br><br>
                <label for="modelo">Modelo:</label>
                <input type="text" id="modelo" name="modelo"><br><br>
                <label for="descripcion">Descripción:</label>
                <input type="text" id="descripcion" name="descripcion"><br><br>
                <label for="numSerie">Número de Serie:</label>
                <input type="text" id="numSerie" name="numSerie"><br><br>
                <label for="contenido">Contenido:</label>
                <input type="text" id="contenido" name="contenido"><br><br>
                <label for="disponible">Disponible:</label>
                <select id="disponible" name="disponible">
                    <option value="si">Sí</option>
                    <option value="no">No</option>
                </select><br><br>
                <label for="foto">Foto:</label>
                <input type="file" id="foto" name="foto"><br><br>
            </form>
        `;
        saveButton.innerHTML = 'Añadir';
        saveButton.onclick = () => {
            // Implementar lógica para añadir nuevo material
            alert('Añadir material');
            document.getElementById('addForm').submit();
        };
    } else if (action === 'edit') {
        modalHeader.innerHTML = '<h2>Editar Material</h2>';
        modalBody.innerHTML = `
            <form id="editForm">
                <label for="marca">Marca:</label>
                <input type="text" id="marca" name="marca" value="Apple"><br><br>
                <label for="nombre">Nombre:</label>
                <input type="text" id="nombre" name="nombre" value="iPhone"><br><br>
                <label for="modelo">Modelo:</label>
                <input type="text" id="modelo" name="modelo" value="12"><br><br>
                <label for="descripcion">Descripción:</label>
                <input type="text" id="descripcion" name="descripcion" value="Smartphone de Apple"><br><br>
                <label for="numSerie">Número de Serie:</label>
                <input type="text" id="numSerie" name="numSerie" value="ABC123"><br><br>
                <label for="contenido">Contenido:</label>
                <input type="text" id="contenido" name="contenido" value="Contenido del iPhone 12"><br><br>
                <label for="disponible">Disponible:</label>
                <select id="disponible" name="disponible">
                    <option value="si" selected>Sí</option>
                    <option value="no">No</option>
                </select><br><br>
                <label for="foto">Foto:</label>
                <input type="file" id="foto" name="foto"><br><br>
            </form>
        `;
        saveButton.innerHTML = 'Guardar Cambios';
        saveButton.onclick = () => {
            // Implementar lógica para guardar cambios
            alert('Guardar cambios');
            document.getElementById('editForm').submit();
        };
    } else if (action === 'delete') {
        modalHeader.innerHTML = '<h2>Eliminar Material</h2>';
        modalBody.innerHTML = `
            <p>¿Estás seguro de que quieres eliminar este material?</p>
        `;
        saveButton.innerHTML = 'Eliminar';
        saveButton.onclick = () => {
            // Implementar lógica para eliminar material
            alert('Eliminar material');
            // Aquí deberías enviar una solicitud para eliminar el material
        };
    }
}

// Cierra el modal
function closeModal() {
    document.getElementById("myModal").style.display = "none";
}

// Cierra el modal cuando se hace clic fuera del contenido del modal
window.onclick = function(event) {
    if (event.target === document.getElementById("myModal")) {
        closeModal();
    }
}
