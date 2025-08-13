document.addEventListener('DOMContentLoaded', function() {
    const carrusel = document.querySelector('.carrusel');
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const indicadoresContainer = document.getElementById('indicadores');
    const menuIcon = document.getElementById('menu');
    const nav = document.querySelector('header nav');
            
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

    /*
    ---- CONFIGURACIÓN AL SCROLLEAR ----
    */ 
    //Inicialmente el header no tiene fondo. Al detectar el scroll 
    //con css lo "pegamos" al inicio y se le coloca uno para q se vea
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header-sticky');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });


    /*
    ---- CONFIGURACIÓN DEL ICONO MENU ----
    */ 
    //Agregamos un evento click al icono del menu para poder mostrar
    //una barra lateral con el mismo (desde celu)
    menuIcon.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
            
    // Iniciar
    startSlideShow();
});