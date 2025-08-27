/* parte de busqueda*/
function renderProductos(lista) {
    const contenedor = document.getElementById('contenedor-tarjetas');
    contenedor.innerHTML = '';
    lista.forEach(prod => {
        contenedor.innerHTML += `
        <div class = "tarjeta-producto">
            <a href="producto.html" >
                <img src="${prod.imagen}" alt="${prod.titulo}" class="tarjeta-foto">
                <h3>${prod.titulo}</h3>
                <p>$${prod.Precio}</p>
            </a>
            <button class="btn-agregarcarrito" type="button" id="${prod.id}"> Agregar al carrito </button>
            </div>
            `
            ;
    });
    actualizarBotonesAgregar();
}


renderProductos(productos);
    const inputBusqueda = document.querySelector('input[name="busca"]');
    inputBusqueda.addEventListener('input', function(e) {
        const valor = e.target.value.toLowerCase();
        const filtrados = productos.filter(p => p.titulo.toLowerCase().includes(valor));
        renderProductos(filtrados);
});

/* agregar productos al carrito*/
function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll(".btn-agregarcarrito");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

if (productosEnCarritoLS) {
        productosEnCarrito = JSON.parse(productosEnCarritoLS);
        actualizarNumerito();
    }else {
        const productosEnCarrito = [];
    }

function agregarAlCarrito(e) {
        const idboton = e.currentTarget.id;
        const productoAgregado = productos.find(producto => producto.id === idboton);
        if(productosEnCarrito.some(producto => producto.id === idboton)) {

            const index = productosEnCarrito.findIndex(producto => producto.id === idboton);
            productosEnCarrito[index].cantidad++;
        } else {
            productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
            }
            actualizarNumerito()
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    }

    function actualizarNumerito() {
        let nuevoNumerito = productosEnCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
        numerito.innerText = nuevoNumerito;
        
    }
// Función para agregar productos al carrito
function agregarAlCarrito(e) {
    const idboton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idboton);

    // Traer carrito desde localStorage
    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];

    // Si ya existe el producto, sumar cantidad
    if(productosEnCarrito.some(p => p.id === idboton)) {
        const index = productosEnCarrito.findIndex(p => p.id === idboton);
        productosEnCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosEnCarrito.push(productoAgregado);
    }

    // Guardar en localStorage
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));

    //mostrar notificación
    mostrarToast(`${productoAgregado.titulo} añadido al carrito`);
}


