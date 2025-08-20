document.addEventListener("DOMContentLoaded", () => {
  // ---- HEADER ----
  fetch("header.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("header-container").innerHTML = data;

      const menuIcon = document.getElementById('menu');
    const nav = document.querySelector('header nav');
    const btnCerrarMenu = document.getElementById('btnCerrarMenu');

    /*
    ---- CONFIGURACIÓN DEL ICONO MENU ----
    */ 
    //Agregamos un evento click al icono del menu para poder mostrar
    //una barra lateral con el mismo (desde celu)
    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    //Para cerrar el menu. Creamos evento click en el btnCerrarMenu
    btnCerrarMenu.addEventListener('click', () => {
        nav.classList.remove('open');
    });
    const contenedorProductos = document.querySelector("#contenedor-productos");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");

function cargarProductos () {
    productos.forEach(producto => {
        const div = document.createElement("div");
        div.classList.add("producto");
        div.innerHTML=`<a href="#productoinfo">
                <img src="${producto.imagen}" class="producto-imagen" alt="${producto.titulo}">
                </a>
                <div class="producto-detalles">
                    <h3 class="producto-titulo">${producto.titulo}</h3>
                    <span class="producto-precio">$${producto.Precio}</span>
                    <button class="producto-agregar" id="${producto.id}">Agregar al Carrito</button>
                </div> `
                contenedorProductos.append(div);
    })
    actualizarBotonesAgregar();
}


cargarProductos(productos)

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll(".producto-agregar")
    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    })
};

let productosEnCarrito = [];
let productosEnCarritoLS= localStorage.getItem("productos-en-carrito");

if (productosEnCarritoLS) {
    productosEnCarrito = JSON.parse(productosEnCarritoLS);
    actualizarNumerito();
}else {
    const productosEnCarrito = [];
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

  })
    .catch(err => console.error("Error cargando header:", err));

    // ---- FOOTER ----
    fetch("footer.html")
    .then(res => res.text())
    .then(data => {
      document.getElementById("footer-container").innerHTML = data;
    })
    .catch(err => console.error("Error cargando footer:", err));
});

