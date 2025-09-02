const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

function mostrarProducto() {
  const contenedor = document.getElementById("detalle_producto");
  const producto = productos.find(p => p.id === idProducto);

  if (producto) {
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
            ${producto.sostenibilidad ? `<li><strong>Sostenibilidad:</strong> ${producto.sostentibilidad}</li>` : ""}
            ${producto.extension ? `<li><strong>Extensión:</strong> ${producto.extension}</li>` : ""}
            ${producto.apilables ? `<li><strong>Apilables:</strong> ${producto.apilables}</li>` : ""}
            ${producto.apilables ? `<li><strong>Apilables:</strong> ${producto.apilables}</li>` : ""}
            ${producto.cables ? `<li><strong>Cables:</strong> ${producto.cables}</li>` : ""}
          </ul>
          <p class="precio">$${producto.Precio ? producto.Precio : "Consultar"}</p>
          <button id="btn-agregarcarrito">Añadir al carrito</button>
        </div>
      </div>
    `;
  } else {
    contenedor.innerHTML = `<p style="color:red;">Producto no encontrado</p>`;
  }
}

mostrarProducto();
