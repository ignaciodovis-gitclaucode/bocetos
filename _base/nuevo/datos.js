/* ==========================================================
   DATOS DEL PROSPECTO — todo el contenido de la tienda vive acá.
   Imágenes: guardalas en la carpeta img/ y escribí "img/archivo.jpg".
   Si una imagen falta o queda vacía (""), se muestra un recuadro "FOTO".
   Ejemplo completo y real: mirá ../ohlala/datos.js
   ========================================================== */
window.TIENDA = {
  nombre: "NOMBRE DE LA MARCA",
  bajada: "Breve descripción del rubro",
  logo: "",                        // ej: "img/logo.png" — vacío = se muestra el nombre en texto
  whatsapp: "5491100000000",
  instagram: "marca",              // usuario sin @ — los íconos llevan a su perfil
  instagramEjemplo: true,          // sacalo (o ponelo en false) cuando cargues el usuario real
  ciudad: "Ciudad",

  anuncios: [
    "Envíos a todo el país · Gratis desde $100.000",
    "3 cuotas sin interés con todas las tarjetas",
    "10% OFF pagando por transferencia"
  ],
  cuotas: 3,
  descuentoTransferencia: 10,
  envioGratisDesde: 100000,

  hero: {
    tag: "Nueva temporada",
    titulo: "Titular que vende el beneficio principal",
    bajada: "Una bajada corta que explique por qué esta tienda es la mejor opción para su cliente ideal.",
    boton: "Ver productos",
    imagenes: ["", "", ""]        // 3 fotos verticales (en celular se ve la primera)
  },

  beneficios: [                     // ico: envio | tarjeta | cambio | local
    { ico: "envio",   titulo: "Envíos a todo el país", texto: "Gratis desde $100.000" },
    { ico: "tarjeta", titulo: "3 cuotas sin interés",   texto: "Con todas las tarjetas" },
    { ico: "cambio",  titulo: "Cambios sin vueltas",    texto: "Dentro de los 30 días" },
    { ico: "local",   titulo: "Retiro en el local",     texto: "Sin costo" }
  ],

  /* nombreCorto: lo que aparece en el menú del diseño Editorial (opcional) */
  categorias: [
    { id: "cat1", nombre: "Categoría uno",    nombreCorto: "Uno",    img: "" },
    { id: "cat2", nombre: "Categoría dos",    nombreCorto: "Dos",    img: "" },
    { id: "cat3", nombre: "Categoría tres",   img: "" },
    { id: "cat4", nombre: "Categoría cuatro", img: "" }
  ],

  /* antes: precio anterior (0 si no está en oferta) · etiqueta: "nuevo" o "" */
  productos: [
    { id: "p1", nombre: "Producto destacado 1", cat: "cat1", precio: 49900, antes: 0,     etiqueta: "nuevo", img: [""], colores: ["#1d1d1b", "#c9b89c"] },
    { id: "p2", nombre: "Producto destacado 2", cat: "cat1", precio: 62500, antes: 74000, img: [""], colores: ["#1d1d1b"] },
    { id: "p3", nombre: "Producto destacado 3", cat: "cat1", precio: 39900, antes: 0,     img: [""], colores: ["#e8e2d6"] },
    { id: "p4", nombre: "Producto destacado 4", cat: "cat1", precio: 71200, antes: 0,     etiqueta: "nuevo", img: [""], colores: ["#5a3a26"] },
    { id: "p5", nombre: "Producto destacado 5", cat: "cat2", precio: 54000, antes: 0,     img: [""], colores: ["#1d1d1b"] },
    { id: "p6", nombre: "Producto destacado 6", cat: "cat2", precio: 45800, antes: 52000, img: [""], colores: ["#3c4f7c"] },
    { id: "p7", nombre: "Producto destacado 7", cat: "cat3", precio: 29900, antes: 0,     img: [""], colores: ["#ffffff"] },
    { id: "p8", nombre: "Producto destacado 8", cat: "cat4", precio: 33600, antes: 48000, img: [""], colores: ["#9c1c3c"] }
  ],

  talles: ["S", "M", "L", "XL"],     // o ["Único"], ["35","36","37"], etc.
  descripcionGeneral: "Descripción de ejemplo del producto. Materiales, medidas, cuidados y todo lo que ayude a decidir la compra.",

  novedades:   ["p1", "p2", "p3", "p4", "p5", "p6", "p7", "p8"],
  masVendidos: ["p6", "p2", "p8", "p5", "p1", "p3", "p7", "p4"],

  historia: {
    tag: "Nuestra historia",
    titulo: "Contá la historia de la marca",
    texto: "Un párrafo breve sobre qué hace distinta a esta marca: calidad, origen, atención, garantía. Acá va el diferencial real del cliente.",
    img: ""
  },

  looks: [                          // diseño Editorial: combos de productos
    { titulo: "Combo 1", img: "", productos: ["p1", "p5"] },
    { titulo: "Combo 2", img: "", productos: ["p2", "p6"] },
    { titulo: "Combo 3", img: "", productos: ["p3", "p7"] }
  ],

  instagramFotos: ["", "", "", "", "", ""]
};
