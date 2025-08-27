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
    ---- CONFIGURACIÓN DEL INICIO DE SESION + AVATARES ----
    */
    const iconoUsuario = document.getElementById("iconoUsuario");
    const usuarioLink = document.getElementById("usuarioIcono"); 
    const loginModal = document.getElementById("loginModal");
    const closeModal = document.querySelector(".close");
    const loginForm = document.getElementById("loginForm");
    const avatarMini = document.getElementById("avatarMini");

    const nombreGuardado = localStorage.getItem("nombreUsuario");
    const emailGuardado = localStorage.getItem("emailUsuario");

    function setAvatar(avatar) {
        iconoUsuario.innerHTML = `<img src="/Images/Avatares/avatar-${avatar}.png" alt="Avatar" class="avatar-icono">`;
    }

    function resetAvatar() {
        iconoUsuario.innerHTML = "account_circle"; // vuelve al ícono por defecto
    }

    // Funciones para el avatar mini dentro del modal
    function mostrarAvatarMini(avatar) {
        avatarMini.src = `/Images/Avatares/avatar-${avatar}.png`;
        avatarMini.classList.remove("oculto");
    }

    function ocultarAvatarMini() {
        avatarMini.src = "";
        avatarMini.classList.add("oculto");
    }

    /* Código que validará si el usuario se logueó y dejará el indicador en verde */
    if(nombreGuardado && emailGuardado){
        iconoUsuario.classList.add("logueado");
        console.log("Usuario logueado: " + nombreGuardado);
        
        const avatarGuardado = localStorage.getItem("avatarUsuario");
        if (avatarGuardado) {
            setAvatar(avatarGuardado);
            mostrarAvatarMini(avatarGuardado); // opcional: si querés que se vea en el modal
        } else {
            resetAvatar();
            ocultarAvatarMini();
        }
    }

    // Click en el icono del usuario
    usuarioLink.addEventListener("click", (e) => {
        const nombreGuardado = localStorage.getItem("nombreUsuario");
        const emailGuardado = localStorage.getItem("emailUsuario");

        if(nombreGuardado !== null && emailGuardado !== null){
            const deseaCerrarSesion = confirm("¿Está seguro que desea cerrar sesión?");
            if(deseaCerrarSesion === true){
                localStorage.removeItem("nombreUsuario");
                localStorage.removeItem("emailUsuario");
                localStorage.removeItem("avatarUsuario");
                iconoUsuario.classList.remove("logueado");
                resetAvatar();
                ocultarAvatarMini();
            }
        } else {
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

    // Mostrar avatar mini al seleccionar uno
    document.querySelectorAll("input[name='avatar']").forEach(radio => {
        radio.addEventListener("change", () => {
            mostrarAvatarMini(radio.value);
        });
    });

    // Validación del formulario
    loginForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const avatar = document.querySelector("input[name='avatar']:checked");

        if(nombre !== "" && email.includes("@")){
            localStorage.setItem("nombreUsuario", nombre);
            localStorage.setItem("emailUsuario", email);
            if (avatar) {
                localStorage.setItem("avatarUsuario", avatar.value);
                setAvatar(avatar.value);
                mostrarAvatarMini(avatar.value);
            } else {
                localStorage.removeItem("avatarUsuario");
                resetAvatar();
                ocultarAvatarMini();
            }
            iconoUsuario.classList.add("logueado");
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

    // ---- CARRITO EN BARRA LATERAL ----
    fetch("carrito-lateral.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("carrito-container").innerHTML = data;
        
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
            if (numerito) {
                numerito.innerText = productosEnCarrito.reduce((acc, p) => acc + p.cantidad, 0);
            }
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
        } function mostrarToast(mensaje, tipo = "info") {
            const contenedor = document.querySelector("#notificaciones");
            if(!contenedor) return;
            const toast = document.createElement("div");
            toast.classList.add("toast", tipo);
            toast.innerText = mensaje;
            contenedor.appendChild(toast);
            setTimeout(() => toast.remove(), 2000);
        }

        function actualizarCarrito() {
            if (!carritoProductos) return;
            let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
            
            carritoProductos.innerHTML = "";
            let total = 0;

            if(productosEnCarrito.length === 0) {
                carritoProductos.innerHTML = `<p class="carrito-vacio">Tu carrito está vacío 🛒</p>`;
                if (carritoTotal) carritoTotal.innerText = "$0";
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

            if (carritoTotal) carritoTotal.innerText = `$${total}`;
            actualizarNumerito();
        }
        // Escuchar evento de actualización del carrito
        document.addEventListener('carritoActualizado', function(e) {
            productosEnCarrito = e.detail.productos;
            actualizarCarrito();
            animarNumerito();
        });

        // ---------- EVENTOS ----------
        // Abrir/cerrar carrito
        if (btnCarrito) {
            btnCarrito.addEventListener("click", e => { 
                e.preventDefault(); 
                abrirCarrito(); 
            });
        }
        
        if (cerrarCarritoBtn) {
            cerrarCarritoBtn.addEventListener("click", cerrarCarrito);
        }
        
        if (overlay) {
            overlay.addEventListener("click", cerrarCarrito);
        }

        if (carritoProductos) {
            carritoProductos.addEventListener("click", e => {
            const id = e.target.dataset.id;
            if(!id) return;

            // Siempre obtener la versión más actual del carrito
            let productosEnCarrito = JSON.parse(localStorage.getItem("productos-en-carrito")) || [];
            const producto = productosEnCarrito.find(p => p.id === id);

            if(e.target.classList.contains("btn-sumar")) {
                producto.cantidad++;
            } else if(e.target.classList.contains("btn-restar")) {
                if(producto.cantidad > 1) {
                    producto.cantidad--;
                } else {
                    productosEnCarrito = productosEnCarrito.filter(p => p.id !== id);
                    mostrarToast(`${producto.titulo} eliminado del carrito`, "error");
                }
            } else if(e.target.classList.contains("btn-eliminar")) {
                productosEnCarrito = productosEnCarrito.filter(p => p.id !== id);
                mostrarToast(`${producto.titulo} eliminado del carrito`, "error");
            }

            // Guardar cambios
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito));
            actualizarCarrito();
            animarNumerito();
            
            // Disparar evento para sincronizar con otros componentes
            document.dispatchEvent(new CustomEvent('carritoActualizado', {
                detail: { productos: productosEnCarrito }
            }));
        });
    }

        // Cargar carrito inicial
        actualizarCarrito();
    
    })
    .catch(err => console.error("Error cargando footer:", err));
});