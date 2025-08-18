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
            
    // Iniciar
    startSlideShow();
});