let productos = [
  {
    nombre: "Laptop Dell XPS",
    precio: "$1200",
    descripcion: "Ultraliviana, con pantalla táctil y 512GB SSD."
  },
  {
    nombre: "Impresora HP Laser",
    precio: "$180",
    descripcion: "Impresora láser monocromática rápida y eficiente."
  }
];

// Renderiza los productos
function renderizarProductos() {
  const contenedor = document.getElementById("lista-productos");
  contenedor.innerHTML = "";

  productos.forEach((producto, index) => {
    const card = document.createElement("div");
    card.className = "col-md-4 mb-3";

    card.innerHTML = `
      <div class="card h-100 shadow-sm">
        <div class="card-body d-flex flex-column">
          <div class="form-check mb-2">
            <input class="form-check-input seleccionar" type="checkbox" value="${index}">
            <label class="form-check-label fw-bold text-primary">
              ${producto.nombre}
            </label>
          </div>
          <p><strong>💵 Precio:</strong> ${producto.precio}</p>
          <p><strong>📝</strong> ${producto.descripcion}</p>
        </div>
      </div>
    `;
    contenedor.appendChild(card);
  });

  actualizarAcciones();
}

// Agregar producto
document.getElementById("formAgregar").addEventListener("submit", e => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const precio = document.getElementById("precio").value;
  const descripcion = document.getElementById("descripcion").value;

  productos.push({ nombre, precio, descripcion });
  renderizarProductos();
  e.target.reset();
  bootstrap.Modal.getInstance(document.getElementById("modalAgregar")).hide();
});

// Editar producto desde selección
document.getElementById("editarSeleccionado").addEventListener("click", () => {
  const seleccionados = [...document.querySelectorAll(".seleccionar:checked")].map(cb => parseInt(cb.value));
  if (seleccionados.length === 1) {
    const i = seleccionados[0];
    document.getElementById("editarNombre").value = productos[i].nombre;
    document.getElementById("editarPrecio").value = productos[i].precio;
    document.getElementById("editarDescripcion").value = productos[i].descripcion;
    document.getElementById("editarIndice").value = i;
    new bootstrap.Modal(document.getElementById("modalEditar")).show();
  }
});

// Guardar cambios en edición
document.getElementById("formEditar").addEventListener("submit", e => {
  e.preventDefault();
  const i = document.getElementById("editarIndice").value;
  productos[i] = {
    nombre: document.getElementById("editarNombre").value,
    precio: document.getElementById("editarPrecio").value,
    descripcion: document.getElementById("editarDescripcion").value
  };
  renderizarProductos();
  bootstrap.Modal.getInstance(document.getElementById("modalEditar")).hide();
});

// Eliminar seleccionados
document.getElementById("eliminarSeleccionado").addEventListener("click", () => {
  const seleccionados = [...document.querySelectorAll(".seleccionar:checked")].map(cb => parseInt(cb.value));
  productos = productos.filter((_, index) => !seleccionados.includes(index));
  renderizarProductos();
});

// Activar/desactivar botones según selección
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("seleccionar")) {
    actualizarAcciones();
  }
});

function actualizarAcciones() {
  const seleccionados = document.querySelectorAll(".seleccionar:checked");
  document.getElementById("eliminarSeleccionado").disabled = seleccionados.length === 0;
  document.getElementById("editarSeleccionado").disabled = seleccionados.length !== 1;
}

// Render inicial
window.addEventListener("DOMContentLoaded", renderizarProductos);
