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
            
    // Iniciar
    startSlideShow();
});