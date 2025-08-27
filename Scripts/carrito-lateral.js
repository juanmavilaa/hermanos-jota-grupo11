document.addEventListener("DOMContentLoaded", () => {
    const carritoLateral = document.querySelector("#carrito-lateral");
    const overlay = document.querySelector("#overlay");
    const cerrarCarritoBtn = document.querySelector("#cerrar-carrito");
    const carritoProductos = document.querySelector("#carrito-productos");
    const carritoTotal = document.querySelector("#carrito-total");
    const numerito = document.querySelector("#numerito");
    const btnCarrito = document.querySelector("#btn-carrito");
    const carritoIcono = document.querySelector("#carrito-icono");


    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    // ---------- FUNCIONES ----------

    function abrirCarrito() {
        actualizarCarrito();
        carritoLateral.classList.add("abierto");
        overlay.classList.add("activo");
    }

    function cerrarCarrito() {
        carritoLateral.classList.remove("abierto");
        overlay.classList.remove("activo");
    }

    function guardarCarrito() {
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    }

    function actualizarNumerito() {
        numerito.innerText = productosEnCarrito.reduce((acc, p) => acc + p.cantidad, 0);
    }

    function animarNumerito() {
        if(numerito) {
            numerito.classList.add("animar");
            setTimeout(() => numerito.classList.remove("animar"), 400);
        }
        if(carritoIcono) {
            carritoIcono.classList.add("animar");
            setTimeout(() => carritoIcono.classList.remove("animar"), 500);
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

    function actualizarCarrito() {
        carritoProductos.innerHTML = "";
        let total = 0;

        if(productosEnCarrito.length === 0) {
            carritoProductos.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío 🛒</p>`;
            carritoTotal.innerText = "$0";
            actualizarNumerito();
            return;
        }

        productosEnCarrito.forEach(prod => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img src="${prod.imagen}" alt="${prod.titulo}">
                <div class="carrito-info">
                    <h4>${prod.titulo}</h4>
                    <p>Precio unit: $${prod.Precio}</p>
                    <div class="carrito-controles">
                        <button class="btn-restar" data-id="${prod.id}">-</button>
                        <span class="cantidad">${prod.cantidad}</span>
                        <button class="btn-sumar" data-id="${prod.id}">+</button>
                    </div>
                    <p>Subtotal: $${prod.Precio * prod.cantidad}</p>
                </div>
                <button class="btn-eliminar" data-id="${prod.id}">❌</button>
            `;
            carritoProductos.append(div);
            total += prod.Precio * prod.cantidad;
        });

        carritoTotal.innerText = `$${total}`;
        actualizarNumerito();
    }

    function agregarProductoAlCarrito(idProducto, titulo, precio, imagen) {
        const productoExistente = productosEnCarrito.find(p => p.id === idProducto);
        if(productoExistente) {
            productoExistente.cantidad++;
        } else {
            productosEnCarrito.push({id: idProducto, titulo, Precio: precio, imagen, cantidad: 1});
        }
        guardarCarrito();
        actualizarCarrito();
        animarNumerito();
        mostrarToast(`${titulo} añadido al carrito`);
    }

    // ---------- EVENTOS ----------

    // Abrir/cerrar carrito
    btnCarrito?.addEventListener("click", e => { e.preventDefault(); abrirCarrito(); });
    cerrarCarritoBtn?.addEventListener("click", cerrarCarrito);
    overlay?.addEventListener("click", cerrarCarrito);

    carritoProductos.addEventListener("click", e => {
        const id = e.target.dataset.id;
        if(!id) return;

        const producto = productosEnCarrito.find(p => p.id === id);

        if(e.target.classList.contains("btn-sumar")) {
            producto.cantidad++;
            guardarCarrito();
            actualizarCarrito();
            animarNumerito();
        } else if(e.target.classList.contains("btn-restar")) {
            if(producto.cantidad > 1) producto.cantidad--;
            else {
                productosEnCarrito = productosEnCarrito.filter(p => p.id !== id);
                mostrarToast(`${producto.titulo} eliminado del carrito`, "error");
            }
            guardarCarrito();
            actualizarCarrito();
            animarNumerito();
        } else if(e.target.classList.contains("btn-eliminar")) {
            productosEnCarrito = productosEnCarrito.filter(p => p.id !== id);
            guardarCarrito();
            actualizarCarrito();
            mostrarToast(`${producto.titulo} eliminado del carrito`, "error");
            animarNumerito();
        }
    });

    document.body.addEventListener("click", e => {
        if(e.target.classList.contains("producto-agregar")) {
            const prodDiv = e.target.closest(".producto");
            const id = e.target.id;
            const titulo = prodDiv.querySelector(".producto-titulo").innerText;
            const precio = parseInt(prodDiv.querySelector(".producto-precio").innerText.replace("$",""));
            const imagen = prodDiv.querySelector(".producto-imagen").src;
            agregarProductoAlCarrito(id, titulo, precio, imagen);
        }
    });

    actualizarCarrito();
});