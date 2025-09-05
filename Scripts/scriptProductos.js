document.addEventListener('DOMContentLoaded', function() {
    console.log("DOM cargado");

    let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
    
    renderProductos(productos);
    actualizarNumerito();

    /* parte de búsqueda */
    function renderProductos(lista) {
        const contenedor = document.getElementById('contenedor-tarjetas');
        contenedor.innerHTML = '';
        lista.forEach(prod => {
            contenedor.innerHTML += `
            <div class="detalle_producto">
                <a href="producto.html?id=${prod.id}">
                    <img src="${prod.imagen}" alt="${prod.titulo}" class="tarjeta-foto">
                    <h3>${prod.titulo}</h3>
                    <p>$${prod.Precio}</p>
                </a>
                <button class="btn-agregarcarrito" type="button" data-id="${prod.id}">Agregar al carrito</button>
            </div>`;
        });
        actualizarBotonesAgregar();
    }

    const inputBusqueda = document.querySelector('input[name="busca"]');
    if (inputBusqueda) {
        inputBusqueda.addEventListener('input', function(e) {
            const valor = e.target.value.toLowerCase();
            const filtrados = productos.filter(p => p.titulo.toLowerCase().includes(valor));
            renderProductos(filtrados);
        });
    }

    function actualizarBotonesAgregar() {
        const botonesAgregar = document.querySelectorAll(".btn-agregarcarrito");
        botonesAgregar.forEach(boton => {
            boton.addEventListener("click", agregarAlCarrito);
        });
    }

    function agregarAlCarrito(e) {
        const idProducto = e.currentTarget.dataset.id;
        const productoAgregado = productos.find(producto => producto.id === idProducto);

        if (productosEnCarrito.some(p => p.id === idProducto)) {
            const index = productosEnCarrito.findIndex(p => p.id === idProducto);
            productosEnCarrito[index].cantidad++;
        } else {
            productosEnCarrito.push({ 
                ...productoAgregado, 
                cantidad: 1 
            });
        }

        localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
        actualizarNumerito();
        
        document.dispatchEvent(new CustomEvent('carritoActualizado', {
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
});
