const productos = [
    {
        id: "Aparador-Uspallata",
        nombre: "Aparador Uspallata",
        descripcion: "Aparador de seis puertas fabricado en nogal sostenible con tiradores metálicos en acabado latón. Su silueta minimalista realza el veteado natural de la madera, creando una pieza que combina funcionalidad y elegancia atemporal para espacios contemporáneos.",
        medidas: "180 × 45 × 75 cm",
        materiales: "Nogal macizo FSC®, herrajes de latón",
        acabado: "Aceite natural ecológico",
        capacidad: "6 compartimentos interiores",
        imagen: "../Images/Catalogo/Aparador Uspallata.jpg",
        añadir: "añadir al carrito"
    },
    {
        id: "Biblioteca-Recoleta",
        nombre: "Biblioteca Recoleta",
        descripcion: "Sistema modular de estantes abierto que combina estructura de acero Sage Green y repisas en roble claro. Perfecta para colecciones y objetos de diseño, su diseño versátil se adapta a cualquier espacio contemporáneo con elegancia funcional.",
        medidas: "100 × 35 × 200 cm",
        materiales: "Estructura de acero, estantes de roble",
        acabado: "Laca mate ecológica",
        capacidad: "45 kg por estante",
        modulares: "5 estantes ajustables",
        imagen: "../Images/Catalogo/Biblioteca Recoleta.jpg",
        añadir: "añadir al carrito"
    },
    {
        id: "Butaca-Mendoza",
        nombre: "Butaca Mendoza",
        descripcion: "Butaca tapizada en bouclé Dusty Rose con base de madera de guatambú. El respaldo curvo abraza el cuerpo y ofrece máximo confort, mientras que su diseño orgánico aporta calidez y sofisticación a cualquier ambiente contemporáneo.",
        medidas: "80 × 75 × 85 cm",
        materiales: "Guatambú macizo, tela bouclé",
        acabado: "Cera vegetal, tapizado premium",
        tapizado: "Repelente al agua y manchas",
        confort: "Espuma alta densidad",
        imagen: "../Images/Catalogo/Butaca Mendoza.jpg",
        añadir: "añadir al carrito"
    },
    {
        id: "Sillón-Copacabana",
        nombre: "Sillón Copacabana",
        descripcion: "Sillón lounge en cuero cognac con base giratoria en acero Burnt Sienna. Inspirado en la estética brasilera moderna de los 60, combina comodidad excepcional con un diseño icónico que trasciende tendencias y épocas.",
        medidas: "90 × 85 × 95 cm",
        materiales: "Cuero curtido vegetal, acero pintado",
        acabado: "Cuero anilina premium",
        rotacion: "360° silenciosa y suave",
        garantia: "10 años en estructura",
        imagen: "../Images/Catalogo/Sillón Copacabana.jpg",
        añadir: "añadir al carrito"
    },
    {
        id: "Mesa-de-Centro-Araucaria",
        nombre: "Mesa de Centro Araucaria",
        descripcion: "Mesa de centro con sobre circular de mármol Patagonia y base de tres patas en madera de nogal. Su diseño minimalista se convierte en el punto focal perfecto para cualquier sala de estar contemporánea, combinando la frialdad del mármol con la calidez de la madera.",
        medidas: "90 × 90 × 45 cm",
        materiales: "Sobre de mármol Patagonia, patas de nogal",
        acabado: "Mármol pulido, aceite natural en madera",
        peso: "42 kg",
        carga_max: "25 kg distribuidos",
        imagen: "../Images/Catalogo/Mesa de Centro Araucaria.jpg",
        añadir: "añadir al carrito"
    },
    {
        id: "Mesa-de-Noche-Aconcagua",
        nombre: "Mesa de Noche Aconcagua",
        descripcion: "Mesa de noche con cajón oculto y repisa inferior en roble certificado FSC®. Su diseño limpio y funcional permite convivir con diferentes estilos de dormitorio, ofreciendo almacenamiento discreto y elegante para objetos personales.",
        medidas: "45 × 35 × 60 cm",
        materiales: "Roble macizo FSC®, herrajes soft-close",
        acabado: "Barniz mate de poliuretano",
        almacenamiento: "1 cajón + repisa inferior",
        caracteristicas: "Cajón con cierre suave",
        imagen: "../Images/Catalogo/Mesa de Noche Aconcagua.jpg",
        añadir: "añadir al carrito"
    },
    {
        id: "Cama-Neuquén",
        nombre: "Cama Neuquén",
        descripcion: "Cama plataforma con cabecero flotante tapizado en lino natural y estructura de madera maciza. Su diseño minimalista y sofisticado crea un ambiente de serenidad y elegancia, perfecto para dormitorios contemporáneos que buscan paz y simplicidad.",
        medidas: "160 × 200 × 90 cm",
        materiales: "Roble macizo FSC®, tapizado lino",
        acabado: "Aceite natural, tapizado premium",
        colchon: "Compatible con colchón 160×200",
        caracteristicas: "Cabecero flotante acolchado",
        imagen: "../Images/Catalogo/Cama Neuquén.jpg",
        añadir: "añadir al carrito"
    },
    {
        id: "Sofá-Palermo",
        nombre: "Sofá Palermo",
        descripcion: "Sofá de tres cuerpos tapizado en lino Warm Alabaster con patas cónicas de madera. Los cojines combinan espuma de alta resiliencia con plumón reciclado, ofreciendo comodidad duradera y sostenible para el hogar moderno.",
        medidas: "220 × 90 × 80 cm",
        estructura: "Madera de eucalipto certificada FSC®",
        tapizado: "Lino 100% natural premium",
        relleno: "Espuma HR + plumón reciclado",
        sostentibilidad: "Materiales 100% reciclables",
        imagen: "../Images/Catalogo/Sofá Palermo.jpg",
        añadir: "añadir al carrito"
    },
    {
        id: "Mesa-Comedor-Pampa",
        nombre: "Mesa Comedor Pampa",
        descripcion: "Mesa extensible de roble macizo con tablero biselado y sistema de apertura suave. Su diseño robusto y elegante se adapta perfectamente a reuniones íntimas o grandes celebraciones familiares, extendiéndose de 6 a 10 comensales.",
        medidas: "160-240 × 90 × 75 cm",
        estructura: "Roble macizo FSC®, mecanismo alemán",
        acabado: "Aceite-cera natural",
        capacidad: "6-10 comensales",
        extension: "Sistema de mariposa central",
        imagen: "../Images/Catalogo/Mesa Comedor Pampa.jpg",
        añadir: "añadir al carrito"
    },
    {
        id: "Sillas-Córdoba",
        nombre: "Sillas Córdoba",
        descripcion: "Set de cuatro sillas apilables en contrachapado moldeado de nogal y estructura tubular pintada en Sage Green. Su diseño ergonómico y materiales de calidad garantizan comodidad y durabilidad en el uso diario, perfectas para comedores contemporáneos.",
        medidas: "45 × 52 × 80 cm (cada una)",
        materiales: "Contrachapado nogal, tubo de acero",
        acabado: "Laca mate, pintura epoxi",
        Apilables: "Hasta 6 sillas",
        apilables: "Set de 4 sillas",
        imagen: "../Images/Catalogo/Sillas Córdoba.jpg",
        añadir: "añadir al carrito"
    },
    {
        id: "Escritorio-Costa",
        nombre: "Escritorio Costa",
        descripcion: "Escritorio compacto con cajón organizado y tapa pasacables integrada en bambú laminado. Ideal para espacios de trabajo en casa, combina funcionalidad moderna con estética minimalista y sostenible, perfecto para el trabajo remoto.",
        medidas: "120 × 60 × 75 cm",
        materiales: "Bambú laminado, herrajes ocultos",
        acabado: "Laca mate resistente",
        almacenamiento: "1 cajón con organizador",
        cables: "Pasacables integrado",
        imagen: "../Images/Catalogo/Escritorio Costa.jpg",
        añadir: "añadir al carrito"
    },
    {
        id: "Silla-de-Trabajo Belgrano",
        nombre: "Silla de Trabajo Belgrano",
        descripcion: "Silla ergonómica regulable en altura con respaldo de malla transpirable y asiento tapizado en tejido reciclado. Diseñada para largas jornadas de trabajo con máximo confort y apoyo lumbar, ideal para oficinas en casa y espacios de coworking.",
        medidas: "60 × 60 × 90-100 cm",
        materiales: "Malla técnica, tejido reciclado",
        acabado: "Base cromada, tapizado premium",
        regulacion: "Altura + inclinación respaldo",
        certificacion: "Ergonomía europea EN 1335",
        imagen: "../Images/Catalogo/Silla de Trabajo Belgrano.jpg",
        añadir: "añadir al carrito"
    }
];

const params = new URLSearchParams(window.location.search);
const idProducto = params.get("id");

function mostrarProducto() {
  const contenedor = document.getElementById("detalle_producto");
  const producto = productos.find(p => p.id === idProducto);

  if (producto) {
    contenedor.innerHTML = `
      <div class="detalle_producto">
        <img src="${producto.imagen}" alt="${producto.nombre}">
        <div class="info-detalle">
          <h2>${producto.nombre}</h2>
          <p>${producto.descripcion}</p>
          <ul>
            ${producto.medidas ? `<li><strong>Medidas:</strong> ${producto.medidas}</li>` : ""}
            ${producto.materiales ? `<li><strong>Materiales:</strong> ${producto.materiales}</li>` : ""}
            ${producto.acabado ? `<li><strong>Acabado:</strong> ${producto.acabado}</li>` : ""}
            ${producto.peso ? `<li><strong>Peso:</strong> ${producto.peso}</li>` : ""}
            ${producto.regulacion ? `<li><strong>Regulación:</strong> ${producto.regulacion}</li>` : ""}
            ${producto.certificacion ? `<li><strong>Certificación:</strong> ${producto.certificacion}</li>` : ""}
            ${producto.capacidad ? `<li><strong>Capacidad:</strong> ${producto.capacidad}</li>` : ""}
            ${producto.colchon ? `<li><strong>Colchón:</strong> ${producto.colchon}</li>` : ""}
            ${producto.carga_max ? `<li><strong>Carga máxima:</strong> ${producto.carga_max}</li>` : ""}
            ${producto.garantia ? `<li><strong>Garantía:</strong> ${producto.garantia}</li>` : ""}
            ${producto.modulares ? `<li><strong>Módulos:</strong> ${producto.modulares}</li>` : ""}
            ${producto.tapizado ? `<li><strong>Tapizado:</strong> ${producto.tapizado}</li>` : ""}
            ${producto.confort ? `<li><strong>Confort:</strong> ${producto.confort}</li>` : ""}
            ${producto.rotacion ? `<li><strong>Rotación:</strong> ${producto.rotacion}</li>` : ""}
            ${producto.almacenamiento ? `<li><strong>Almacenamiento:</strong> ${producto.almacenamiento}</li>` : ""}
            ${producto.caracteristicas ? `<li><strong>Características:</strong> ${producto.caracteristicas}</li>` : ""}
            ${producto.estructura ? `<li><strong>Estructura:</strong> ${producto.estructura}</li>` : ""}
            ${producto.relleno ? `<li><strong>Relleno:</strong> ${producto.relleno}</li>` : ""}
            ${producto.sostentibilidad ? `<li><strong>Sostenibilidad:</strong> ${producto.sostentibilidad}</li>` : ""}
            ${producto.extension ? `<li><strong>Extensión:</strong> ${producto.extension}</li>` : ""}
            ${producto.Apilables ? `<li><strong>Apilables:</strong> ${producto.Apilables}</li>` : ""}
            ${producto.apilables ? `<li><strong>Apilables:</strong> ${producto.apilables}</li>` : ""}
            ${producto.cables ? `<li><strong>Cables:</strong> ${producto.cables}</li>` : ""}
          </ul>
          <p class="precio">$${producto.Precio ? producto.Precio : "Consultar"}</p>
          <button id="btn-agregar">${producto.añadir}</button>
        </div>
      </div>
    `;
  } else {
    contenedor.innerHTML = `<p style="color:red;">Producto no encontrado</p>`;
  }
}

mostrarProducto();
