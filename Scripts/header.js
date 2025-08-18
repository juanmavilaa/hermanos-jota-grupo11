document.addEventListener("DOMContentLoaded", () => {
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
    })
    .catch(err => console.error("Error cargando header:", err));
});