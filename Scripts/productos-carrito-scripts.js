// Lista de productos
const productos = [
    { id: "Aparador-Uspallata", titulo: "Aparador Uspallata", imagen:"../Images/catalogo/Aparador Uspallata.png", Precio: 1000 },
    { id: "Biblioteca-Recoleta", titulo: "Biblioteca Recoleta", imagen:"../IMAGES/catalogo/Biblioteca Recoleta.png", Precio: 1000 },
    { id: "Butaca-Mendoza", titulo: "Butaca Mendoza", imagen:"../Images/catalogo/Butaca Mendoza.png", Precio: 1000 },
    { id: "Escritorio-Costa", titulo: "Escritorio Costa", imagen:"../Images/catalogo/Escritorio Costa.png", Precio: 1000 },
    { id: "Mesa-Comedor-Pampa", titulo: "Mesa Comedor Pampa", imagen:"../Images/catalogo/Mesa Comedor Pampa.png", Precio: 1000 },
    { id: "Mesa-de-Centro-Araucaria", titulo: "Mesa de Centro Araucaria", imagen:"../Images/catalogo/Mesa de Centro Araucaria.png", Precio: 1000 },
    { id: "Mesa-de-Noche-Aconcagua", titulo: "Mesa de Noche Aconcagua", imagen:"../Images/catalogo/Mesa de Noche Aconcagua.png", Precio: 1000 },
    { id: "Silla-de-Trabajo-Belgrano", titulo: "Silla de Trabajo Belgrano", imagen:"../Images/catalogo/Silla de Trabajo Belgrano.png", Precio: 1000 },
    { id: "Sillas-Córdoba", titulo: "Sillas Córdoba", imagen:"../Images/catalogo/Sillas Córdoba.png", Precio: 1000 },
    { id: "Sillón-Copacabana", titulo: "Sillón Copacabana", imagen:"../Images/catalogo/Sillón Copacabana.png", Precio: 1000 },
    { id: "Sofá-Patagonia", titulo: "Sofá Patagonia", imagen:"../Images/catalogo/Sofá Patagonia.png", Precio: 1000 },
];

// Contenedor de productos
const contenedorProductos = document.querySelector("#contenedor-productos");

function cargarProductos() {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML = `
            <a href="#productoinfo">
                <img src="${producto.imagen}" class="producto-imagen" alt="${producto.titulo}">
            </a>
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <span class="producto-precio">$${producto.Precio}</span>
                <button class="producto-agregar" id="${producto.id}">Agregar al Carrito</button>
            </div>
        `;
        contenedorProductos.append(div);
    });
    actualizarBotonesAgregar();
}



function actualizarBotonesAgregar() {
    const botonesAgregar = document.querySelectorAll(".producto-agregar");
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
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



// Inicializar
cargarProductos();