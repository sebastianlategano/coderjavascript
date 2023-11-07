// Script para que las animaciones ocurran solo cuando esten en pantalla ------------------------------------------------------------->
function applyAnimation(className, delayClassName) {
  const elements = document.querySelectorAll("." + className);
  function handleIntersect(entries, observer) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.visibility = "visible";
        entry.target.style.opacity = 1;
        entry.target.classList.add("animate__animated", "animate__fadeInUp");
        observer.unobserve(entry.target);
      }
    });
  }

  const options = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver(handleIntersect, options);
  elements.forEach((element) => observer.observe(element));
}

applyAnimation("elemento-oculto");
applyAnimation("elemento-con-delay");

// Cambia color de fondo del navbar top, en desktop y mobile + Oculta/muestra botones Wpp y ScrollUp--------------------------------------->
window.addEventListener("load", () => {
  const mybutton = document.getElementById("scrollTop");
  const wppIcon = document.getElementById("wppIcon");
  const navTop = document.querySelector("#navTop");
  const hambTop = document.querySelector("#hambTop");

  window.onscroll = function () {
    scrollFunction();
    handleScrollEffects();
  };

  function scrollFunction() {
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      mybutton.classList.add("show");
      wppIcon.classList.add("show");
    } else {
      mybutton.classList.remove("show");
      wppIcon.classList.remove("show");
    }
  }

  function handleScrollEffects() {
    if (window.scrollY <= 10) {
      navTop.className = "coverLinks";
      hambTop.className = "menuHamburguesa";
    } else {
      navTop.className = "scroll";
      hambTop.className = "hambScroll";
    }
  }

  mybutton.addEventListener("click", function () {
    topFunction();
  });

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
});

// Le da stop al video de youtube cuando se cierra el popup -------------------------------------------------------------->
function stop() {
  let video = document.getElementById("videoId");
  video.contentWindow.postMessage(
    '{"event":"command", "func":"stopVideo", "args":""}',
    "*"
  );
}

// Modo oscuro ----------------------------------------------------------------------------------------------------------->
const themeToggle = document.getElementById("theme-toggle");
const carouselExampleDark = document.getElementById("carouselExampleDark");
const carouselExampleDark2 = document.getElementById("carouselExampleDark2");

const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  document.documentElement.setAttribute("data-theme", savedTheme);
  if (savedTheme === "light") {
    themeToggle.checked = true;
    if (carouselExampleDark) {
      carouselExampleDark.classList.add("carousel-dark");
      carouselExampleDark2.classList.add("carousel-dark");
    }
  } else {
    themeToggle.checked = false;
    if (carouselExampleDark) {
      carouselExampleDark.classList.remove("carousel-dark");
      carouselExampleDark2.classList.remove("carousel-dark");
    }
  }
}

themeToggle.addEventListener("change", () => {
  if (themeToggle.checked) {
    document.documentElement.setAttribute("data-theme", "light");
    localStorage.setItem("theme", "light");
    if (carouselExampleDark) {
      carouselExampleDark.classList.add("carousel-dark");
      carouselExampleDark2.classList.add("carousel-dark");
    }
  } else {
    document.documentElement.setAttribute("data-theme", "darktheme");
    localStorage.setItem("theme", "darktheme");
    if (carouselExampleDark) {
      carouselExampleDark.classList.remove("carousel-dark");
      carouselExampleDark2.classList.remove("carousel-dark");
    }
  }
});

//Animacion solo cuando es pulsado el boton
let togglerAnimation = document.querySelector("div.wrapper");

document.addEventListener("keydown", function(e) {
  togglerAnimation.classList.add('switch:after')
})
togglerAnimation.addEventListener("animationend", function(e) {
  togglerAnimation.classList.remove('switch:after')
});

//Mostrar-Ocultar carrito
const btnCart = document.querySelector('.container-cart-icon');
const containerCartProducts = document.querySelector('.container-cart-products');

btnCart.addEventListener('click', () => {
    containerCartProducts.classList.toggle('hidden-cart');
});

//Carrito
const cartInfo = document.querySelector('cart-product');
const rowProduct = document.querySelector('.row-product');
const cartEmpty = document.querySelector('.cart-empty');
const cartTotal = document.querySelector('.cart-total');

//Lista de todos los contenedores de productos
const productsList = document.querySelector('.catalogo');

//Variable de arreglos de productos
let allProducts = [];

const valorTotal = document.querySelector('.total-pagar');
const countProducts = document.querySelector('#contador-productos');

productsList.addEventListener('click', e => {
  if(e.target.classList.contains('carrito')){
    const product = e.target.parentElement.parentNode;

    const infoProduct = {
      quantity: 1,
      title: product.querySelector('h3').textContent,
      price: product.querySelector('.precio').textContent,
    };

    Toastify({
      text: "Producto agregado",
      offset: {
        x: 50, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
        y: 50 // vertical axis - can be a number or a string indicating unity. eg: '2em'
      },
      duration: 1000,
      destination: "https://github.com/apvarun/toastify-js",
      newWindow: true,
      close: true,
      gravity: "top", // `top` or `bottom`
      position: "right", // `left`, `center` or `right`
      stopOnFocus: true, // Prevents dismissing of toast on hover
      style: {
        background: "linear-gradient(to right, #e7acaa, #e2b995)",
      },
    }).showToast();

    const exists = allProducts.some(product => product.title === infoProduct.title);
    
    if (exists) {
      const products = allProducts.map(product => {
        if (product.title === infoProduct.title){
          product.quantity++;
          return product;
        } else {
          return product;
        }
      });
      allProducts = [...products];
    } else {
      allProducts = [...allProducts, infoProduct];
    }

    showHTML();

    // Guardar el carrito en localStorage
    localStorage.setItem('carrito', JSON.stringify(allProducts));
  }
});

window.addEventListener('load', () => {
  const savedCart = localStorage.getItem('carrito');

  if (savedCart) {
    allProducts = JSON.parse(savedCart);
    showHTML();
  }
});

rowProduct.addEventListener('click', e => {
	if (e.target.classList.contains('icon-close')) {
		const product = e.target.parentElement;
		const title = product.querySelector('p').textContent;

    allProducts = allProducts.filter(
      product => product.title !== title
      );
      showHTML();
  }
});

//Funcion para mostrar HTML
const showHTML = () => {


	if (!allProducts.length) {
		cartEmpty.classList.remove('hidden-cart');
		rowProduct.classList.add('hidden-cart');
		cartTotal.classList.add('hidden-cart');
	} else {
		cartEmpty.classList.add('hidden-cart');
		rowProduct.classList.remove('hidden-cart');
		cartTotal.classList.remove('hidden-cart');
	}

  //Limpair carrito
  rowProduct.innerHTML = '';

  let total = 0;
  let totalOfProducts = 0;

  allProducts.forEach(product => {
    const containerProduct = document.createElement('div');
    containerProduct.classList.add('cart-product');
    
    containerProduct.innerHTML = `
    <div class="info-cart-product">
      <span class="cantidad-producto-carrito">${product.quantity}</span>
      <div class="controls">
          <button id="btnAdd" class="buttonsQuantity">+</button>
          <button id="btnRemove" class="buttonsQuantity">-</button>
      </div>
      <p class="titulo-producto-carrito">${product.title}</p>
      <span class="precio-producto-carrito">$${product.quantity * product.price.slice(1)}</span>
    </div>
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
    
    `;
    
    rowProduct.append(containerProduct);
    total = total + parseInt(product.quantity * product.price.slice(1));
    totalOfProducts = totalOfProducts + product.quantity;
  });

  valorTotal.innerText = `$${total}`;
  countProducts.innerText = totalOfProducts;
};

//Cerrar carrito si se hace click afuera
document.addEventListener('click', function (event) {
  if (!containerCartProducts.contains(event.target) && !btnCart.contains(event.target) && !event.target.classList.contains('icon-close') && !event.target.classList.contains('buttonsQuantity')) {
      containerCartProducts.classList.add('hidden-cart');
  }
});



// Evento confirmar compra
const btnConfirmarCompra = document.getElementById("btnConfirmarCompra");

btnConfirmarCompra.addEventListener("click", () => {
      Swal.fire({
        title: "Muchas gracias!",
        text: "Tu compra ha sido realizada",
        icon: "success",
        confirmButtonColor: "#3085d6",
      });
      containerCartProducts.classList.add('hidden-cart');

      allProducts = [];
      showHTML();
      localStorage.setItem("carrito", JSON.stringify(allProducts));
    }
);



rowProduct.addEventListener('click', e => {
  if (e.target.classList.contains('buttonsQuantity')) {
    const productId = e.target.parentElement.parentElement.parentElement.querySelector('.titulo-producto-carrito').textContent;

    if (e.target.id === 'btnAdd') {
      // Busca el producto por su título
      const product = allProducts.find(product => product.title === productId);
      
      if (product) {
        product.quantity++;
      }
    } else if (e.target.id === 'btnRemove') {
      // Implementa la lógica para disminuir la cantidad si se presiona el botón "-"
      const product = allProducts.find(product => product.title === productId);
      
      if (product && product.quantity > 1) {
        product.quantity--;
      }
    }

    showHTML();
    // Actualiza el carrito en el localStorage
    localStorage.setItem('carrito', JSON.stringify(allProducts));
  }
});



//FETCH ------------------------------------------------------------------------
let articulo = [];

fetch("/productos.json")
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo cargar el archivo de productos.');
        }
        return response.json();
    })
    .then(data => {
        articulo = data;
        cargarProductos(articulo);

        // Verifica si la página actual es la página de inicio
        if (window.location.pathname === '/' || window.location.pathname === '/index.html') {
            // Selecciona el botón de "Destacados"
            const botonDestacados = document.getElementById("destacados");

            // Si el botón de "Destacados" existe, haz clic en él
            if (botonDestacados) {
                botonDestacados.click();
            }
        }
    })
    .catch(error => {
        console.error('Error en la solicitud fetch:', error);
    });

//Armar productos en tienda
const contenedorProductos = document.querySelector("#contenedor-productos");

function cargarProductos(productosElegidos) {

  contenedorProductos.innerHTML = "";

  productosElegidos.forEach(articulo => {
    const div = document.createElement("div");
    div.classList.add("articulo", "col-12", "col-sm-6", "col-md-6", "col-lg-6", "col-xl-3", "d-inline-block", "mx-auto");
    div.innerHTML = `
      <div class="dontOverflow">
        <figure>
          <img class="img-fluid catalogoImagen" src="${articulo.imagen}" alt="${articulo.nombre}">
        </figure>
      </div>
      <div class="infoProducto">
        <h3 class="mt-3 h3">${articulo.nombre}</h3>
        <p>${articulo.descripcion}</p>
        <p class="precio lead">${articulo.precio}</p>
        <button class="btn-add-cart">
          <img class="carrito img-fluid" src="../assets/img/addtocart.png" alt="Carrito">
        </button>
      </div>
    `;

    contenedorProductos.append(div)
  })
}



//Filtrar con botones los productos
const botonesCategorias = document.querySelectorAll(".boton-categoria");

botonesCategorias.forEach(boton => {
  boton.addEventListener("click", (e) => {
    botonesCategorias.forEach(boton => boton.classList.remove("active"));

    e.currentTarget.classList.add("active");

    if (e.currentTarget.id != "todos") {
      const productosBoton = articulo.filter(articulo => articulo.categoria.id === e.currentTarget.id);
      cargarProductos(productosBoton);
    } else {
      cargarProductos(articulo);
    }
  });
});

// Agrega un evento de escucha para el botón de "Destacados"
const botonDestacados = document.getElementById("destacados");

botonDestacados.addEventListener("click", () => {
  // Filtra los productos destacados
  const productosDestacados = articulo.filter(articulo => articulo.destacado === "si");
  cargarProductos(productosDestacados);
  
  // Remueve la clase "active" de los otros botones de categoría
  botonesCategorias.forEach(boton => boton.classList.remove("active"));
  
  // Agrega la clase "active" al botón de "Destacados"
  botonDestacados.classList.add("active");
});



