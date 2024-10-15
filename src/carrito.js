import data from "./data/productos";

// abrir el carrito
const carrito = document.getElementById("carrito");

// botones
const btnsAbrirCarrito = document.querySelectorAll(
    "[data-accion='abrir-carrito']"
);
const btnsCerrarCarrito = document.querySelectorAll(
    "[data-accion='cerrar-carrito']"
);
const btnAgregarAlCarrito = document.getElementById("agregar-al-carrito");

// contenedor producto
const producto = document.getElementById("producto");
const { productos } = data;
let productosCarrito = [];
// moneda
const formatoMoneda = new Intl.NumberFormat('es-CO', {style: 'currency', currency: 'COP'});

// abrir carrito
const abrirCarrito = () => {
    carrito.classList.add("carrito--active");

    // eliminar elementos anteriores del carrito
    const elementosAnteriores = carrito.querySelectorAll('.carrito__body .carrito__producto');
    if(elementosAnteriores){
        elementosAnteriores.forEach(producto => producto.remove());
    };

    // agregar elementos al DOM
    if(productosCarrito.length < 1){
        carrito.classList.add('carrito--vacio');
    }else{
        carrito.classList.remove('carrito--vacio');
        let total = 0;
        const cuerpoCarrito = carrito.querySelector(".carrito__body");
        productosCarrito.forEach((productoCarrito) => {
            // extraer precio
            productos.forEach((producto) => {
                if (producto.id === productoCarrito.idProducto) {
                    productoCarrito.precio = producto.precio;
    
                    total += producto.precio * productoCarrito.cantidad;
                }
            });
    
            //ruta del thumb
            let thumbSrc = producto.querySelectorAll(".producto__thumb-img")[0].src;
            if (productoCarrito.color === "rojo") {
                thumbSrc = "./img/tennis/rojo.jpg";
            } else if (productoCarrito.color === "amarillo") {
                thumbSrc = "./img/tennis/amarillo.jpg";
            }
    
            // contenedor del producto
            const contenedorProducto = document.createElement("div");
            contenedorProducto.classList.add("carrito__producto");
            const plantillaProducto = `
             <div class="carrito__producto-info">
                 <img src="${thumbSrc}" alt="producto" class="carrito__thumb" />
                 <div>
                     <p class="carrito__producto-nombre">
                         <span class="carrito__producto-cantidad">${productoCarrito.cantidad} x </span>${productoCarrito.nombre}
                     </p>
                     <p class="carrito__producto-propiedades">
                         Tamaño:<span>${productoCarrito.talla}</span> Color:<span>${productoCarrito.color}</span>
                     </p>
                 </div>
             </div>
             <div class="carrito__producto-contenedor-precio">
                 <button class="carrito__btn-eliminar-item" data-accion="eliminar-item-carrito">
                     <svg
                         xmlns="http://www.w3.org/2000/svg"
                         width="16"
                         height="16"
                         fill="currentColor"
                         viewBox="0 0 16 16"
                     >
                         <path
                             d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm3.354 4.646L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 1 1 .708-.708z"
                         />
                     </svg>
                 </button>
                 <p class="carrito__producto-precio">${formatoMoneda.format(productoCarrito.precio * productoCarrito.cantidad)}</p>
             </div>
            `;
    
            contenedorProducto.innerHTML = plantillaProducto;
            cuerpoCarrito.appendChild(contenedorProducto);
        });
    
        // total carrito
        carrito.querySelector('.carrito__total').innerText = formatoMoneda.format(total);
    }
};
btnsAbrirCarrito.forEach((btn) => {
    btn.addEventListener("click", abrirCarrito);
});

// cerrar carrito
btnsCerrarCarrito.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        carrito.classList.remove("carrito--active");
    });
});

// agregar producto al carrito
btnAgregarAlCarrito.addEventListener("click", (e) => {
    // datos para agregar un producto al carrito
    const datosProducto = {
        idProducto: producto.dataset.productoId,
        nombre: producto.querySelector(".producto__nombre").innerText,
        color: producto.querySelector("#propiedad-color input:checked").value,
        talla: producto.querySelector("#propiedad-tamaño input:checked").value,
        cantidad: parseInt(producto.querySelector("#cantidad").value),
    };

    if (productosCarrito.length > 0) {
        let productoEnCarrito = false;
        productosCarrito.forEach((producto) => {
            if (
                producto.idProducto === datosProducto.idProducto &&
                producto.nombre === datosProducto.nombre &&
                producto.color === datosProducto.color &&
                producto.talla === datosProducto.talla
            ) {
                producto.cantidad += datosProducto.cantidad;
                productoEnCarrito = true;
            }
        });

        // agrego elemento al carrito sino existe
        if(!productoEnCarrito){
            productosCarrito.push(datosProducto);
        }
    } else {
        // agrego elemento al carrito si esta vacio
        productosCarrito.push(datosProducto);
    }
    
    // notificacion
    const alerta = document.getElementById('notificacion');
    const imagenNotificacion = alerta.querySelector('.notificacion__thumb');

    // img notificacion
    let thumbSrc = producto.querySelectorAll('.producto__thumb-img')[0].src;
    if(datosProducto.color === 'amarillo'){
        thumbSrc = './img/thumbs/amarillo.jpg';
    }else if(datosProducto.color === 'rojo'){
        thumbSrc = './img/thumbs/rojo.jpg';
    }

    imagenNotificacion.src = thumbSrc;
    alerta.classList.add('notificacion--active');

    setTimeout(()=> {
        alerta.classList.remove('notificacion--active');
    }, 4500)
});

// eliminar del carrito
const contenedorCarrito = carrito.querySelector('.carrito__body');
contenedorCarrito.addEventListener('click', (e) => {
    if(e.target.closest('button')?.dataset?.accion === 'eliminar-item-carrito'){
        const producto = e.target.closest('.carrito__producto');
        const indexProducto = [...contenedorCarrito.querySelectorAll('.carrito__producto')].indexOf(producto);
        
        // eliminar elemento
        productosCarrito = productosCarrito.filter((producto, index) => {
            if(index !== indexProducto){
                return producto;
            }
        });
        abrirCarrito();
    }
});