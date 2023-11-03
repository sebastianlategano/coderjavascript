function CalculoCortina(ancho, alto, cantidad, precioTotal) {
    this.ancho = ancho;
    this.alto = alto;
    this.cantidad = cantidad;
    this.precioTotal = precioTotal;
}


const calculos = [];
const calculosEliminados = [];

//CALCULAR COSTO
function calcularCosto() {
    let ancho = parseFloat(document.getElementById("ancho").value);
    let alto = parseFloat(document.getElementById("alto").value);
    let cantidad = parseInt(document.getElementById("cantidad").value);

    if (isNaN(ancho) || isNaN(alto) || isNaN(cantidad)) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Por favor, ingrese números válidos',
          })
        return;
    }

    if (ancho > 1.50) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El ancho máximo es de 1,50m',
          })
        return;
    }

    if (alto > 5) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'El alto máximo es de 5,00m',
          })
        return;
    }

    let area = ancho * alto;
    let precioM2 = 100; // Precio por metro cuadrado $100
    let descuento = 0;

    switch (true) {
        case (cantidad >= 2 && cantidad <= 6):
            for (let i = 1; i < cantidad; i++) {
                descuento = descuento + 0.02; // 2% de descuento adicional por cada unidad agregada
            }
            costoTotal = (area * precioM2 * cantidad * (1 - descuento));
            break;
        case (cantidad >= 7):
            costoTotal = (area * precioM2 * cantidad * 0.9); //Siempre 10% de descuento
            break;
        default:
            costoTotal = area * precioM2; //Sin descuento
            break;
    }

    const nuevoCalculo = new CalculoCortina(ancho, alto, cantidad, costoTotal.toFixed(2));

    calculos.push(nuevoCalculo);

    // Ocultar el contenedor del carrito
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.style.display = 'none';

    // Mostrar el resultado
    document.getElementById("resultado").innerHTML = "El precio total es de: $" + costoTotal.toFixed(2);

    // Mostrar el botón "Agregar al carrito" después de hacer el cálculo
    const botonAgregarAlCarrito = document.getElementById("agregar-al-carrito");
    botonAgregarAlCarrito.style.display = "block";
}

//AGREGAR AL CARRITO
function agregarAlCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const ultimoCalculo = calculos[calculos.length - 1];

    carrito.push(ultimoCalculo);

    localStorage.setItem('carrito', JSON.stringify(carrito));

    const confirmacionElement = document.getElementById('confirmacion');
    confirmacionElement.textContent = 'Cálculo agregado al carrito';
    confirmacionElement.style.display = 'block';

    setTimeout(() => {
        confirmacionElement.style.display = 'none';
    }, 3000);
}

//MOSTRAR CARRITO
function mostrarCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    const carritoList = document.getElementById('carrito-list');
    carritoList.innerHTML = '';

    if (carrito.length === 0) {
        const carritoVacioElement = document.getElementById('carrito-vacio');
        carritoVacioElement.style.display = 'block';

        setTimeout(() => {
            carritoVacioElement.style.display = 'none';
        }, 3000);
    } else {

        const carritoVacioElement = document.getElementById('carrito-vacio');
        carritoVacioElement.style.display = 'none';

        carrito.forEach((calculo, index) => {
            const listItem = document.createElement('li');
            listItem.className = 'list-group-item';

            const contenidoCalculo = `<strong>Cálculo ${index + 1}:</strong><br>
                Ancho: ${calculo.ancho}m, Alto: ${calculo.alto}m, Cantidad: ${calculo.cantidad}<br>
                Precio total: $${calculo.precioTotal}<br>`;

            const botonEliminar = document.createElement('button');
            botonEliminar.className = 'btn btn-danger btn-sm';
            botonEliminar.textContent = 'Eliminar del carrito';

            botonEliminar.addEventListener('click', () => eliminarDelCarrito(index));

            listItem.innerHTML = contenidoCalculo;
            listItem.appendChild(botonEliminar);

            carritoList.appendChild(listItem);
        });
    }
    
    const carritoContainer = document.getElementById('carrito-container');
    carritoContainer.style.display = 'block';
}

//ELIMINAR DEL CARRITO
function eliminarDelCarrito(index) {

    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    if (index >= 0 && index < carrito.length) {
        const calculoEliminado = carrito.splice(index, 1)[0];

        localStorage.setItem('carrito', JSON.stringify(carrito));

        const confirmacionEliminacionElement = document.getElementById('confirmacion-eliminacion');
        confirmacionEliminacionElement.textContent = `Se ha eliminado el cálculo ${index + 1} del carrito`;
        confirmacionEliminacionElement.style.display = 'block';

        mostrarCarrito();

        setTimeout(() => {
            confirmacionEliminacionElement.style.display = 'none';
        }, 3000);
    }
}

//MOSTRAR MEDIDAS ESTANDAR
function mostrarMedidasEstandar() {

    const medidasEstandar = [
        { ancho: 80, alto: 200, cantidad: 1, precioTotal: 100 },
        { ancho: 90, alto: 200, cantidad: 1, precioTotal: 200 },
        { ancho: 100, alto: 200, cantidad: 1, precioTotal: 300 }
    ];

    const medidasEstandarContainer = document.getElementById('medidas-estandar-container');

    medidasEstandarContainer.innerHTML = '';

    const listaMedidasEstandar = document.createElement('ul');
    listaMedidasEstandar.className = 'list-group';

    medidasEstandar.forEach((medida, index) => {
        const listItem = document.createElement('li');
        listItem.className = 'list-group-item';

        const contenidoMedida = `Ancho: ${medida.ancho} / Alto: ${medida.alto} / Cantidad: ${medida.cantidad} / Precio Total: $${medida.precioTotal} `;


        const botonAgregarAlCarrito = document.createElement('button');
        botonAgregarAlCarrito.className = 'btn btn-success btn-sm';
        botonAgregarAlCarrito.textContent = 'Agregar al carrito';
        botonAgregarAlCarrito.setAttribute('data-index', index);

        botonAgregarAlCarrito.addEventListener('click', (event) => {
            const index = event.target.getAttribute('data-index');
            agregarMedidaEstandarAlCarrito(medidasEstandar[index]);
        });

        listItem.textContent = contenidoMedida;
        listItem.appendChild(botonAgregarAlCarrito);

        listaMedidasEstandar.appendChild(listItem);
    });

    medidasEstandarContainer.appendChild(listaMedidasEstandar);
}

//AGREGAR MEDIDA ESTANDAR AL CARRITO
function agregarMedidaEstandarAlCarrito(medida) {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];

    carrito.push(medida);

    localStorage.setItem('carrito', JSON.stringify(carrito));
}


