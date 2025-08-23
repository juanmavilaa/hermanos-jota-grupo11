
function renderProductos(lista) {
    const contenedor = document.getElementById('contenedor-tarjetas');
    contenedor.innerHTML = '';
    lista.forEach(prod => {
        contenedor.innerHTML += `
            <a href="producto.html" class="tarjeta-producto">
                <img src="${prod.imagen}" alt="${prod.titulo}" class="tarjeta-foto">
                <h3>${prod.titulo}</h3>
                <p>$${prod.Precio}</p>
                <button class="btn-agregarcarrito" type="button">Agregar al carrito</button>
            </a>
        `;
    });
}

renderProductos(productos);
    const inputBusqueda = document.querySelector('input[name="busca"]');
    inputBusqueda.addEventListener('input', function(e) {
        const valor = e.target.value.toLowerCase();
        const filtrados = productos.filter(p => p.titulo.toLowerCase().includes(valor));
        renderProductos(filtrados);
});