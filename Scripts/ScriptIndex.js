document.addEventListener('DOMContentLoaded', function() {
    const carrusel = document.querySelector('.carrusel');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicadoresContainer = document.getElementById('indicadores');
            
    let currentIndex = 0;
    let slideInterval;
    const slideTime = 6000; // 6 segundos
    /*
    ---- CONFIGURACIÓN PARA LOS SLIDES INICIALES ----
    */      
    // Crear indicadores
    slides.forEach((_, index) => {
        const indicador = document.createElement('div');
        indicador.classList.add('indicador');
        if(index === 0) indicador.classList.add('activo');
        indicador.addEventListener('click', () => goToSlide(index));
        indicadoresContainer.appendChild(indicador);
    });
            
    const indicadores = document.querySelectorAll('.indicador');
            
    // Función para mover el carrusel
    function moveToSlide(index) {
        if(index >= slides.length) {
            currentIndex = 0;
        } else if(index < 0) {
            currentIndex = slides.length - 1;
        } else {
            currentIndex = index;
        }
                
        carrusel.style.transform = `translateX(-${currentIndex * 100}%)`;
                
        // Actualizar indicadores
        indicadores.forEach((ind, i) => {
            ind.classList.toggle('activo', i === currentIndex);
        });
    }
            
    // Función para ir a un slide específico
    function goToSlide(index) {
        clearInterval(slideInterval);
        moveToSlide(index);
        startSlideShow();
    }
            
    // Navegación
    prevBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        moveToSlide(currentIndex - 1);
        startSlideShow();
    });
            
    nextBtn.addEventListener('click', () => {
        clearInterval(slideInterval);
        moveToSlide(currentIndex + 1);
        startSlideShow();
    });
            
    // Iniciar el slideshow automático
    function startSlideShow() {
        slideInterval = setInterval(() => {
            moveToSlide(currentIndex + 1);
        }, slideTime);
    }

    const carousel = document.querySelector(".carousel-principios");
    const principios = document.querySelectorAll(".principio");
    const dotsContainer = document.querySelector(".dots-container");

    // Cantidad de elementos visibles según pantalla
    function visibleElements() {
        if(window.innerWidth >= 1024) return 3;
        return 1;
    }

    // Crear dots
    function crearDots() {
        dotsContainer.innerHTML = "";
        const vis = visibleElements();
        const cantidadDots = Math.ceil(principios.length / vis);
        
        for(let i=0; i<cantidadDots; i++){
            const dot = document.createElement("span");
            dot.classList.add("dot");
            if(i===0) dot.classList.add("active");
            dot.addEventListener("click", ()=> {
            carousel.scrollTo({
                left: i * carousel.offsetWidth,
                behavior: "smooth"
            });
            setActiveDot(i);
            });
            dotsContainer.appendChild(dot);
        }
    }

    function setActiveDot(index) {
    const dots = document.querySelectorAll(".dot");
    dots.forEach(d => d.classList.remove("active"));
        if(dots[index]) dots[index].classList.add("active");
    }

    // Actualizar dots al hacer scroll
    carousel.addEventListener("scroll", () => {
        const vis = visibleElements();
        const index = Math.round(carousel.scrollLeft / carousel.offsetWidth);
        setActiveDot(index);
    });

    window.addEventListener("resize", crearDots);
    crearDots();

    const contenedorProductosMasVendidos = document.querySelector("#carousel-container-productos-mas-vendidos");
    const contenedorTarjetas = document.createElement("div");
    contenedorTarjetas.classList.add("contenedor-tarjetas");
    contenedorTarjetas.id = "contenedor-mas-vendidos";

    function cargarProductosMasVendidos () {
        productos.forEach(producto => {
            if(producto.masVendidos){
                const tarjeta = document.createElement("a");
                tarjeta.href = `producto.html?id=${producto.id}`;
                tarjeta.classList.add("tarjeta-producto");
                tarjeta.innerHTML = `
                    <img src="${producto.imagen}" alt="imagen producto" class="tarjeta-foto"> 
                    <h3>${producto.titulo}</h3>
                    <p>$${producto.Precio}</p>
                `;
                contenedorTarjetas.appendChild(tarjeta);
            }
            
        });
        contenedorProductosMasVendidos.appendChild(contenedorTarjetas);
    }

    cargarProductosMasVendidos();

    const contenedorProductosAlAzar = document.querySelector("#carousel-productos-ver-todos");
    const contenedorTarjetasAlAzar = document.createElement("div");
    contenedorTarjetasAlAzar.classList.add("contenedor-tarjetas");
    contenedorTarjetasAlAzar.id = "contenedor-tarjetas-ver-todos";

    function cargarProductosAlAzar () {
        const productosMezclados = productos.sort(() => Math.random() - 0.5);
        const productosSeleccionadosAlAzar = productosMezclados.slice(0, 3);
        productosSeleccionadosAlAzar.forEach(producto => {
            const tarjeta = document.createElement("a");
            tarjeta.href = `producto.html?id=${producto.id}`;
            tarjeta.classList.add("tarjeta-producto");
            tarjeta.innerHTML = `
                <img src="${producto.imagen}" alt="imagen producto" class="tarjeta-foto"> 
                <h3>${producto.titulo}</h3>
                <p>$${producto.Precio}</p>
            `;
            contenedorTarjetasAlAzar.appendChild(tarjeta);
            
        });
        contenedorProductosAlAzar.appendChild(contenedorTarjetasAlAzar);
    }

    cargarProductosAlAzar();
                
    // Iniciar
    startSlideShow();
});

