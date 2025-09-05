// autorellenar los campos del formulario tomando los datos del localStorage
function autorellenarFormulario() {
  const nombre = localStorage.getItem("nombreUsuario");
  const email = localStorage.getItem("emailUsuario");

  if (nombre) {
    document.getElementById("nombre").value = nombre;
  }
  if (email) {
    document.getElementById("email").value = email;
  }
}
document.addEventListener("DOMContentLoaded", autorellenarFormulario);

class ContactFormData {
  constructor(nombre, email, mensaje) {
    this.nombre = nombre;
    this.email = email;
    this.mensaje = mensaje;
  }
}

const formularios = [];

const formulario = document.getElementById("contactForm");

formulario.addEventListener("submit", function (event) {
  event.preventDefault();

  const nombre = formulario.elements.nombre.value;
  const email = formulario.elements.email.value;
  const mensaje = formulario.elements.mensaje.value;

  if (!(nombre && email && mensaje)) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Por favor, ingrese un correo electrónico válido.");
    return;
  }

  if (mensaje.length < 10) {
    alert("El mensaje debe tener al menos 10 caracteres.");
    return;
  }

  const formData = new ContactFormData(nombre, email, mensaje);

  console.log("Datos del formulario:", formData);

  const mensajeExito = document.createElement("p");
  mensajeExito.textContent = "Mensaje enviado con éxito!";
  mensajeExito.style.color = "#87a96b";
  mensajeExito.style.fontWeight = "700";
  formulario.appendChild(mensajeExito);

  // envio al servidor
  cargarDatosDelFormulario(formData);

  // guardo localmente
  formularios.push(formData);
  formulario.reset();
});

// conexion con el servidor
async function cargarDatosDelFormulario(formData) {
  try {
    const url = "/api/contacto"; // cuando tengamos el backend hay que cambiar aca
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      alert("Mensaje enviado al servidor correctamente");
    } else {
      alert("Error al enviar el mensaje al servidor");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Error de conexión");
  }
}
