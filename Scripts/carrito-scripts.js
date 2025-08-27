let productosEnCarrito = localStorage.getItem("productos-en-carrito");
    productosEnCarrito = JSON.parse(productosEnCarrito)

const contenedorCarritoVacio = document.querySelector("#carrito-vacio")
const contenedorCarritoProductos = document.querySelector("#carrito-productos")
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones")
const contenedorCarritoComprado = document.querySelector("#carrito-comprado")
let contenedorBotonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar")

function cargarProductosCarrito(){
    if(productosEnCarrito && productosEnCarrito.length > 0){
        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")

        contenedorCarritoProductos.innerHTML = ""

        productosEnCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
                <img src="${producto.imagen}" class="carrito-producto-img" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Titulo</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <div class="cantidad-botones">
                        <button class="btn-cantidad btn-restar" data-id="${producto.id}">−</button>
                        <span class="cantidad-numero">${producto.cantidad}</span>
                        <button class="btn-cantidad btn-sumar" data-id="${producto.id}">+</button>
                    </div>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.Precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.Precio * producto.cantidad}</p>
                </div>
                <button class="carrito-producto-eliminar" id="${producto.id}">
                    <span class="material-symbols-outlined">delete</span>
                </button>
            `;
            contenedorCarritoProductos.append(div);
        });
    }
    else {
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
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
            productosEnCarrito = productosEnCarrito.filter(p => p.id !== id);
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
                guardarYActualizar(id);
            } else {
                productosEnCarrito = productosEnCarrito.filter(p => p.id !== id);
                guardarYActualizar();
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
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
    cargarProductosCarrito();

}

function actualizarTotal() {
    const totalCalculado = productosEnCarrito.reduce((acc, producto) => acc + (producto.Precio * producto.cantidad), 0);
    total.innerText = `$${totalCalculado}`
}


botonComprar.addEventListener("click", comprarCarrito)
function comprarCarrito() {
    productosEnCarrito.length = 0;
    localStorage.setItem("productos-en-carrito",JSON.stringify(productosEnCarrito));
    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")
    
}

