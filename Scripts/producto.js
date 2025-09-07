const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");
let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

function obtenerProducto(id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const producto = productos.find(p => p.id === id);
      if (producto) resolve(producto);
      else reject("Producto no encontrado");
    }, 500);
  });
}

async function mostrarProducto() {
  const contenedor = document.getElementById("detalle_producto");
  try {
    const producto = await obtenerProducto(idProducto);
    contenedor.innerHTML = `
      <div class="detalle_producto">
        <img src="${producto.imagen}" alt="${producto.titulo}">
        <div class="info-detalle">
          <h2>${producto.titulo}</h2>
          <p>${producto.descripcion}</p>
          <ul>
            ${producto.medidas ? `<li><strong>Medidas:</strong> ${producto.medidas}</li>` : ""}
            ${producto.materiales ? `<li><strong>Materiales:</strong> ${producto.materiales}</li>` : ""}
            ${producto.acabado ? `<li><strong>Acabado:</strong> ${producto.acabado}</li>` : ""}
            ${producto.peso ? `<li><strong>Peso:</strong> ${producto.peso}</li>` : ""}
            ${producto.regulacion ? `<li><strong>Regulación:</strong> ${producto.regulacion}</li>` : ""}
            ${producto.certificacion ? `<li><strong>Certificación:</strong> ${producto.certificacion}</li>` : ""}
            ${producto.capacidad ? `<li><strong>Capacidad:</strong> ${producto.capacidad}</li>` : ""}
            ${producto.colchon ? `<li><strong>Colchón:</strong> ${producto.colchon}</li>` : ""}
            ${producto.carga_max ? `<li><strong>Carga máxima:</strong> ${producto.carga_max}</li>` : ""}
            ${producto.garantia ? `<li><strong>Garantía:</strong> ${producto.garantia}</li>` : ""}
            ${producto.modulares ? `<li><strong>Módulos:</strong> ${producto.modulares}</li>` : ""}
            ${producto.tapizado ? `<li><strong>Tapizado:</strong> ${producto.tapizado}</li>` : ""}
            ${producto.confort ? `<li><strong>Confort:</strong> ${producto.confort}</li>` : ""}
            ${producto.rotacion ? `<li><strong>Rotación:</strong> ${producto.rotacion}</li>` : ""}
            ${producto.almacenamiento ? `<li><strong>Almacenamiento:</strong> ${producto.almacenamiento}</li>` : ""}
            ${producto.caracteristicas ? `<li><strong>Características:</strong> ${producto.caracteristicas}</li>` : ""}
            ${producto.estructura ? `<li><strong>Estructura:</strong> ${producto.estructura}</li>` : ""}
            ${producto.sostenibilidad ? `<li><strong>Sostenibilidad:</strong> ${producto.sostenibilidad}</li>` : ""}
            ${producto.extension ? `<li><strong>Extensión:</strong> ${producto.extension}</li>` : ""}
            ${producto.apilables ? `<li><strong>Apilables:</strong> ${producto.apilables}</li>` : ""}
            ${producto.cables ? `<li><strong>Cables:</strong> ${producto.cables}</li>` : ""}
          </ul>
          <p class="precio">$${producto.Precio ? producto.Precio : "Consultar"}</p>
          <button class="btn-agregarcarrito" data-id="${producto.id}">Añadir al carrito</button>
        </div>
      </div>
    `;

    const boton = document.querySelector(".btn-agregarcarrito");
    if (boton) boton.addEventListener("click", agregarAlCarrito);

  } catch (error){
    contenedor.innerHTML = `<p style="color:red;">${error}</p>`;
  }


}

function agregarAlCarrito(e) {
  const id = e.currentTarget.dataset.id;
  const productoAgregado = productos.find(p => p.id === id);

  if (productosEnCarrito.some(p => p.id === id)) {
    const index = productosEnCarrito.findIndex(p => p.id === id);
    productosEnCarrito[index].cantidad++;
  } else {
    productosEnCarrito.push({ ...productoAgregado, cantidad: 1 });
  }

  localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
  

  document.dispatchEvent(new CustomEvent("carritoActualizado", {
    detail: { productos: productosEnCarrito }
}));

mostrarToast(`${productoAgregado.titulo} añadido al carrito`);

}

function actualizarNumerito() {
  const numerito = document.querySelector("#numerito");
  if (numerito) {
    const total = productosEnCarrito.reduce((acc, p) => acc + p.cantidad, 0);
    numerito.innerText = total;
    numerito.classList.add("animar");
    setTimeout(() => numerito.classList.remove("animar"), 400);
   }
}

function mostrarToast(mensaje, tipo = "info") {
        const contenedor = document.querySelector("#notificaciones");
        if(!contenedor) return;
        const toast = document.createElement("div");
        toast.classList.add("toast", tipo);
        toast.innerText = mensaje;
        contenedor.appendChild(toast);
        setTimeout(() => toast.remove(), 2000);
    }

document.addEventListener('carritoActualizado', function(e) {
        productosEnCarrito = e.detail.productos;
        actualizarNumerito();
    });

document.addEventListener('DOMContentLoaded', () => {
    mostrarProducto();
});
