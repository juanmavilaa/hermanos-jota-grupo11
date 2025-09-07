let productosEnCarrito = localStorage.getItem("productos-en-carrito");
    productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
let contenedorBotonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");
const contenedorBotonVaciar = document.querySelector(".carrito-acciones-izquierda");

function cargarProductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.length > 0){
        botonVaciar.style.visibility = "visible";
        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")

        contenedorCarritoProductos.innerHTML = ""

        productosEnCarrito.forEach(producto => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td data-label="Imagen">
                    <a href="producto.html?id=${producto.id}">
                        <img src="${producto.imagen}" alt="${producto.titulo}" class="carrito-producto-img">
                    </a>
                </td>
                <td data-label="Título" id="titulo-producto">
                    <a href="producto.html?id=${producto.id}" class="carrito-producto-link">
                        ${producto.titulo}
                    </a>
                </td>
                <td data-label="Cantidad">
                    <div class="cantidad-botones">
                        <button class="btn-cantidad btn-restar" data-id="${producto.id}">−</button>
                        <span class="cantidad-numero">${producto.cantidad}</span>
                        <button class="btn-cantidad btn-sumar" data-id="${producto.id}">+</button>
                    </div>
                </td>
                <td data-label="Precio">$${producto.Precio}</td>
                <td data-label="Subtotal" id="subtotal-producto">$${producto.Precio * producto.cantidad}</td>
                <td data-label="Acción">
                    <button class="carrito-producto-eliminar" id="${producto.id}" title="Eliminar Producto">
                        <span class="material-symbols-outlined">delete</span>
                    </button>
                </td>
                `;

            contenedorCarritoProductos.append(tr);
        });
    }
    else {
        botonVaciar.style.visibility = "hidden";
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
        contenedorCarritoProductos.innerHTML = "";
    }

    actualizarBotonesCarrito();
    actualizarTotal();
}


cargarProductosCarrito()


function actualizarBotonesCarrito() {
    // Boton eliminar
    document.querySelectorAll(".carrito-producto-eliminar").forEach(boton => {
        boton.addEventListener("click", () => {
            const id = boton.id;
            const producto = productosEnCarrito.find(p => p.id === id);
            const confirmar = confirm(`¿Está seguro que desea eliminar "${producto.titulo}" del carrito?`);
            if (confirmar) {
                productosEnCarrito = productosEnCarrito.filter(p => p.id !== id);
                guardarYActualizar();
            }
            guardarYActualizar();
        });
    });

    // Boton sumar
    document.querySelectorAll(".btn-sumar").forEach(boton => {
        boton.addEventListener("click", () => {
            const id = boton.dataset.id;
            const producto = productosEnCarrito.find(p => p.id === id);
            producto.cantidad++;
            guardarYActualizar(id);
        });
    });

    // Boton restar
    document.querySelectorAll(".btn-restar").forEach(boton => {
        boton.addEventListener("click", () => {
            const id = boton.dataset.id;
            const producto = productosEnCarrito.find(p => p.id === id);

            if (producto.cantidad > 1) {
                producto.cantidad--;

                // Confirmar si queda 1 y van a restar
                if (producto.cantidad === 0) {
                    const confirmRestar = confirm(`Queda 1 unidad de "${producto.titulo}". Si resta 1 se eliminará del carrito. ¿Desea continuar?`);
                    if (!confirmRestar) {
                        producto.cantidad++; // revertimos la resta
                        return;
                    } else {
                        productosEnCarrito = productosEnCarrito.filter(p => p.id !== id);
                    }
                }

                guardarYActualizar(id);
            } else {
                const confirmEliminar = confirm(`Queda 1 unidad de "${producto.titulo}". Si resta 1 se eliminará del carrito. ¿Desea continuar?`);
                if (confirmEliminar) {
                    productosEnCarrito = productosEnCarrito.filter(p => p.id !== id);
                    guardarYActualizar();
                }
            }
        });
    });
}


// Función para guardar cambios y actualizar la vista
function guardarYActualizar(animarId = null) {
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

    if (animarId) {
        const spanCantidad = document.querySelector(`.btn-sumar[data-id="${animarId}"]`).parentElement.querySelector(".cantidad-numero");
        spanCantidad.classList.add("animar");
        setTimeout(() => spanCantidad.classList.remove("animar"), 400);
    }
}

function eliminarDelCarrito(e) {
    let idboton = e.currentTarget.id;
    const index = productosEnCarrito.findIndex(producto => producto.id === idboton);
    productosEnCarrito.splice(index,1);
    cargarProductosCarrito()
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

botonVaciar.addEventListener("click", vaciarCarrito)

function vaciarCarrito() {
    if (productosEnCarrito.length === 0) return;

    const confirmar = confirm("¿Está seguro que desea vaciar todo el carrito?");
    if (confirmar) {
        productosEnCarrito = [];
        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        cargarProductosCarrito();
    }

}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.Precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`
}


botonComprar.addEventListener("click", comprarCarrito)
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");
    contenedorBotonVaciar.classList.add("disabled");
    contenedorCarritoProductos.innerHTML = "";
    actualizarTotal();
}