// thumbs producto
const thumbs = document.querySelector(".producto__thumbs");
const imagenProducto = document.querySelector(".producto__imagen");
thumbs.addEventListener("click", (e) => {
    if (e.target.tagName === "IMG") {
        const indexImagen = e.target.src.lastIndexOf("/") + 1;
        const srcImagen = e.target.src.substr(indexImagen);
        imagenProducto.src = `./img/tennis/${srcImagen}`;
    }
});

// color
const colores = document.getElementById("propiedad-color");
colores.addEventListener("click", (e) => {
    if (e.target.closest("input")) {
        const color = e.target.value;
        imagenProducto.src = `./img/tennis/${color}.jpg`;
    }
});

// cantidad
const btnDisminuirCantidad = document.getElementById("disminuir-cantidad");
const btnAumentarCantidad = document.getElementById("incrementar-cantidad");
const cantidad = document.getElementById("cantidad");
btnDisminuirCantidad.addEventListener("click", () => {
    if (parseInt(cantidad.value) > 1) {
        cantidad.value = parseInt(cantidad.value) - 1;
    }
});

btnAumentarCantidad.addEventListener("click", () => {
    cantidad.value = parseInt(cantidad.value) + 1;
});
