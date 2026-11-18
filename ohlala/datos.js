/* ==========================================================
   DATOS DEL PROSPECTO — todo el contenido de la tienda vive acá.
   Cambiás este archivo + marca.css + la carpeta img/ y listo.
   Las rutas de imágenes son relativas a esta carpeta (img/...).
   ========================================================== */
window.TIENDA = {
  nombre: "Oh Lala",
  bajada: "Tienda femenina",
  logo: "img/logo.png",          // dejalo "" si no hay logo: se muestra el nombre en texto
  whatsapp: "5491100000000",
  instagram: "ohlala.tienda",
  ciudad: "Buenos Aires",

  anuncios: [
    "Envíos a todo el país · Gratis desde $120.000",
    "3 cuotas sin interés con todas las tarjetas",
    "10% OFF pagando por transferencia"
  ],
  cuotas: 3,
  descuentoTransferencia: 10,      // %
  envioGratisDesde: 120000,

  hero: {
    tag: "Otoño · Invierno 2026",
    titulo: "Vestite con lo que te hace sentir vos",
    bajada: "Gamulanes, tejidos y básicos elegidos uno por uno en nuestro local. Ahora, también online.",
    boton: "Ver la colección",
    imagenes: ["img/outfits_0.jpg", "img/outfits_1.jpg", "img/outfits_2.jpg"]
  },

  beneficios: [
    { ico: "envio",   titulo: "Envíos a todo el país", texto: "Gratis desde $120.000" },
    { ico: "tarjeta", titulo: "3 cuotas sin interés",   texto: "Con todas las tarjetas" },
    { ico: "cambio",  titulo: "Cambios sin vueltas",    texto: "Dentro de los 30 días" },
    { ico: "local",   titulo: "Retiro en el local",     texto: "Sin costo, en 24 hs" }
  ],

  categorias: [
    { id: "camperas",   nombre: "Camperas y gamulanes", nombreCorto: "Abrigos", img: "img/gamulanes_4.jpg" },
    { id: "tejidos",    nombre: "Sweaters y buzos",     nombreCorto: "Tejidos", img: "img/sweaters_1.jpg" },
    { id: "tops",       nombre: "Camisas y remeras",    img: "img/camisas_2.jpg" },
    { id: "pantalones", nombre: "Jeans y pantalones",   img: "img/jeans_4.jpg" },
    { id: "chalecos",   nombre: "Chalecos",             img: "img/chalecos_0.jpg" },
    { id: "accesorios", nombre: "Accesorios",           img: "img/bufandas_1.jpg" }
  ],

  /* etiqueta: "nuevo" | "" — el % OFF se calcula solo si hay "antes" */
  productos: [
    { id: "gamulan-bordo",       nombre: "Gamulán Bordó Oversize",      cat: "camperas",   precio: 89900, antes: 0,      etiqueta: "nuevo", img: ["img/gamulanes_1.jpg", "img/gamulanes_0.jpg"], colores: ["#5b1a33", "#3b2a4a"] },
    { id: "biker-negra",         nombre: "Campera Biker Eco Cuero",     cat: "camperas",   precio: 79900, antes: 94000,  img: ["img/gamulanes_2.jpg"], colores: ["#1b1b22"] },
    { id: "gamulan-corderito",   nombre: "Gamulán Corderito Gris",      cat: "camperas",   precio: 92900, antes: 0,      etiqueta: "nuevo", img: ["img/gamulanes_4.jpg"], colores: ["#bdb6ad"] },
    { id: "campera-combinada",   nombre: "Campera Combinada Negra",     cat: "camperas",   precio: 84900, antes: 0,      img: ["img/gamulanes_5.jpg", "img/gamulanes_3.jpg"], colores: ["#111111"] },
    { id: "cropped-cuero",       nombre: "Campera Cropped Cuero",       cat: "camperas",   precio: 74900, antes: 0,      img: ["img/camperas_0.jpg", "img/camperas_1.jpg"], colores: ["#1a1a24"] },
    { id: "puffer-perla",        nombre: "Campera Puffer Perla",        cat: "camperas",   precio: 69900, antes: 87400,  img: ["img/camperas_inflables_0.jpg", "img/camperas_inflables_1.jpg"], colores: ["#d9d6cf"] },
    { id: "puffer-blanca",       nombre: "Campera Puffer Blanca",       cat: "camperas",   precio: 72900, antes: 0,      etiqueta: "nuevo", img: ["img/camperas_inflables_2.jpg", "img/camperas_inflables_3.jpg"], colores: ["#f4f4f1"] },
    { id: "puffer-rosa",         nombre: "Chaleco Puffer Rosa Viejo",   cat: "camperas",   precio: 71900, antes: 0,      img: ["img/camperas_inflables_4.jpg", "img/camperas_inflables_5.jpg"], colores: ["#8f6b67"] },
    { id: "gamuza-chocolate",    nombre: "Campera Gamuza Chocolate",    cat: "camperas",   precio: 76900, antes: 0,      img: ["img/camperas_2.jpg"], colores: ["#5a3a26", "#b08a66"] },
    { id: "sweater-jacquard",    nombre: "Sweater Jacquard Azul",       cat: "tejidos",    precio: 46900, antes: 0,      img: ["img/sweaters_0.jpg"], colores: ["#3c4f7c"] },
    { id: "cardigan-crema",      nombre: "Cárdigan Crema con Botones",  cat: "tejidos",    precio: 42900, antes: 0,      etiqueta: "nuevo", img: ["img/sweaters_1.jpg", "img/sweaters_2.jpg"], colores: ["#efe9dc"] },
    { id: "sweater-rayado",      nombre: "Sweater Rayado Fucsia",       cat: "tejidos",    precio: 39900, antes: 46900,  img: ["img/sweaters_5.jpg"], colores: ["#d63a78", "#ffffff"] },
    { id: "cardigan-verde",      nombre: "Cárdigan Verde Inglés",       cat: "tejidos",    precio: 41900, antes: 0,      img: ["img/sweaters_4.jpg"], colores: ["#2f4a3a"] },
    { id: "buzo-celeste",        nombre: "Buzo Estampado Celeste",      cat: "tejidos",    precio: 38900, antes: 0,      img: ["img/buzos_0.jpg"], colores: ["#bcd3e6"] },
    { id: "buzo-matcha",         nombre: "Buzo Matcha Latte",           cat: "tejidos",    precio: 38900, antes: 0,      etiqueta: "nuevo", img: ["img/buzos_2.jpg"], colores: ["#ece6da"] },
    { id: "buzo-london",         nombre: "Buzo London Gris Topo",       cat: "tejidos",    precio: 36900, antes: 43400,  img: ["img/buzos_5.jpg"], colores: ["#3d3d3d"] },
    { id: "camisa-bordada",      nombre: "Camisa Bordada Blanca",       cat: "tops",       precio: 36900, antes: 0,      img: ["img/camisas_0.jpg", "img/camisas_1.jpg"], colores: ["#ffffff"] },
    { id: "blusa-puntilla",      nombre: "Blusa Puntilla Crema",        cat: "tops",       precio: 34900, antes: 0,      etiqueta: "nuevo", img: ["img/camisas_3.jpg", "img/camisas_2.jpg"], colores: ["#f5f0e6"] },
    { id: "remera-bordo",        nombre: "Remera Básica Bordó",         cat: "tops",       precio: 19900, antes: 0,      img: ["img/remeras_0.jpg"], colores: ["#9c1c3c", "#2a2236"] },
    { id: "remera-v-negra",      nombre: "Remera Escote V",             cat: "tops",       precio: 19900, antes: 0,      img: ["img/remeras_1.jpg"], colores: ["#2a2236"] },
    { id: "remera-bordada",      nombre: "Remera Negra Bordada",        cat: "tops",       precio: 24900, antes: 29900,  img: ["img/remeras_5.jpg"], colores: ["#111111"] },
    { id: "jean-chocolate",      nombre: "Pantalón Wide Leg Chocolate", cat: "pantalones", precio: 45900, antes: 0,      img: ["img/jeans_0.jpg", "img/jeans_2.jpg"], colores: ["#5a3426"] },
    { id: "jean-mom",            nombre: "Jean Mom Celeste",            cat: "pantalones", precio: 47900, antes: 53200,  img: ["img/jeans_4.jpg", "img/jeans_5.jpg"], colores: ["#8ea6c4"] },
    { id: "chaleco-sastrero",    nombre: "Chaleco Sastrero Crema",      cat: "chalecos",   precio: 34900, antes: 0,      etiqueta: "nuevo", img: ["img/chalecos_0.jpg", "img/chalecos_1.jpg"], colores: ["#e3dccb"] },
    { id: "chaleco-tejido",      nombre: "Chaleco Tejido Negro",        cat: "chalecos",   precio: 32900, antes: 0,      img: ["img/chalecos_3.jpg", "img/chalecos_4.jpg"], colores: ["#151515"] },
    { id: "bufanda-rosa",        nombre: "Bufanda Rosa con Flecos",     cat: "accesorios", precio: 18900, antes: 0,      img: ["img/bufandas_1.jpg"], colores: ["#e7b9c1", "#c9b89c"] }
  ],

  talles: ["S", "M", "L", "XL"],
  descripcionGeneral: "Prenda seleccionada por nuestro equipo. Calce cómodo y terminaciones prolijas. Si tenés dudas con el talle, escribinos por WhatsApp y te asesoramos.",

  /* listas de la home (por id) */
  novedades:    ["gamulan-bordo", "cardigan-crema", "puffer-blanca", "blusa-puntilla", "gamulan-corderito", "buzo-matcha", "chaleco-sastrero", "cropped-cuero"],
  masVendidos:  ["biker-negra", "jean-mom", "camisa-bordada", "sweater-jacquard", "puffer-perla", "remera-bordo", "cardigan-verde", "gamuza-chocolate"],

  historia: {
    tag: "Nuestro local",
    titulo: "Más que una tienda, un lugar para probarte todo",
    texto: "Oh Lala nació como un local de barrio con una idea simple: ropa linda, a buen precio y con atención de verdad. Cada prenda la elegimos nosotras, y ahora podés llevarte esa misma experiencia a tu casa.",
    img: "img/camisas_1.jpg"
  },

  looks: [
    { titulo: "Look urbano",    img: "img/outfits_3.jpg", productos: ["campera-combinada", "jean-mom", "remera-bordada"] },
    { titulo: "Noche de otoño", img: "img/outfits_4.jpg", productos: ["biker-negra", "jean-chocolate"] },
    { titulo: "Total black",    img: "img/outfits_5.jpg", productos: ["cropped-cuero", "remera-v-negra"] }
  ],

  instagramFotos: ["img/outfits_0.jpg", "img/gamulanes_1.jpg", "img/sweaters_5.jpg", "img/camperas_inflables_4.jpg", "img/chalecos_3.jpg", "img/outfits_2.jpg"]
};
