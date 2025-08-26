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
    //Agregamos un evento click al icono del menu para poder mostrarlo en una barra lateral
    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('open');
    });

    //Para cerrar el menu. Creamos evento click en el btnCerrarMenu
    btnCerrarMenu.addEventListener('click', () => {
        nav.classList.remove('open');
    });

    /*
    ---- CONFIGURACIÓN DEL MODAL PARA INICIAR SESION ----
    */
    const nombreGuardado = localStorage.getItem("nombreUsuario");
    const emailGuardado = localStorage.getItem("emailUsuario");
/*Código que validará si el usuario se logueó y dejará el indicador en verde*/
    if(nombreGuardado && emailGuardado){
        document.getElementById("iconoUsuario").classList.add("logueado");
        console.log("Usuario logueado: " + nombreGuardado);
    }

    const usuarioLink = document.getElementById("usuarioIcono"); 
    const loginModal = document.getElementById("loginModal");
    const closeModal = document.querySelector(".close");
    const loginForm = document.getElementById("loginForm");

    usuarioLink.addEventListener("click", (e) => {
        const nombreGuardado = localStorage.getItem("nombreUsuario");
        const emailGuardado = localStorage.getItem("emailUsuario");
        //verificamos si el usuario esta logueado
        if(nombreGuardado !== null && emailGuardado !== null){
            //si está logueado, en vez de mostrar el form de iniciar sesion,
            //preguntamos si quiere cerrar sesion
            const deseaCerrarSesion = confirm("¿Está seguro que desea cerrar sesión?");
            if(deseaCerrarSesion === true){
                //borramos datos locales
                localStorage.removeItem("nombreUsuario");
                localStorage.removeItem("emailUsuario");
                document.getElementById("iconoUsuario").classList.remove("logueado");
            }
        }else{
            e.preventDefault();
            loginModal.style.display = "flex";
        }
        
    });

    // Cerrar modal con la X
    closeModal.addEventListener("click", () => {
        loginModal.style.display = "none";
    });

    // Cerrar modal si se hace click fuera del contenido
    window.addEventListener("click", (e) => {
        if(e.target === loginModal){
            loginModal.style.display = "none";
        }
    });

    // Evitamos que clicks dentro del modal cierren el modal
    loginModal.querySelector(".modal-content").addEventListener("click", (e) => {
        e.stopPropagation();
    });

    // Validación 
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();

        if(nombre !== "" && email.includes("@")){
            localStorage.setItem("nombreUsuario", nombre);
            localStorage.setItem("emailUsuario", email);
            document.getElementById("iconoUsuario").classList.add("logueado");
            alert(`Has iniciado sesión como ${nombre}.`);
        }
        loginModal.style.display = "none";
    });

    /*
    ---- CONFIGURACIÓN DEL CARRITO ----
    */
    let productosEnCarrito = localStorage.getItem("productos-en-carrito");
        productosEnCarrito = JSON.parse(productosEnCarrito)
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

