/* ==========================================================
   DATOS — Tonic Shop Multistore (Gobernador Crespo)
   Fotos "img/..." = fotos reales de su Instagram.
   Fotos "https://images.unsplash.com/..." = fotos ilustrativas libres.
   Productos y precios: de ejemplo, para la propuesta.
   ========================================================== */
const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

window.TIENDA = {
  nombre: "Tonic Shop",
  bajada: "Multistore · Todo en un solo lugar",
  logo: "img/logo.png",
  whatsapp: "5490000000000",
  instagram: "tonicshop.multistore",
  ciudad: "Sebastián Puig 109, Gobernador Crespo",

  anuncios: [
    "Envíos a todo el país · Gratis desde $150.000",
    "Hasta 6 cuotas sin interés con todas las tarjetas",
    "Retiro gratis en el local · Gobernador Crespo"
  ],
  cuotas: 6,
  descuentoTransferencia: 10,
  envioGratisDesde: 150000,

  hero: {
    tag: "Electrónica · Hogar · Climatización · Pesca",
    titulo: "Todo lo que buscás, en un solo lugar",
    bajada: "Tecnología, electrodomésticos, aires acondicionados y pesca, con garantía y envío a todo el país.",
    boton: "Ver productos",
    imagenes: [U("1615655406736-b37c4fabf923", 1000), U("1761330440311-16e160cad236", 1000), U("1761197379839-b5759e0146a0", 1000)]
  },

  beneficios: [
    { ico: "envio",   titulo: "Envíos a todo el país", texto: "Gratis desde $150.000" },
    { ico: "tarjeta", titulo: "6 cuotas sin interés",   texto: "Con todas las tarjetas" },
    { ico: "cambio",  titulo: "Garantía oficial",       texto: "En todos los productos" },
    { ico: "local",   titulo: "Retiro en el local",     texto: "Gobernador Crespo, sin costo" }
  ],

  categorias: [
    { id: "electronica",   nombre: "Electrónica",       nombreCorto: "Electrónica",   img: U("1633329102202-eaa697179563") },
    { id: "climatizacion", nombre: "Climatización",     nombreCorto: "Climatización", img: U("1762341123870-d706f257a12e") },
    { id: "hogar",         nombre: "Hogar y cocina",    img: "img/cocina-dako.jpg" },
    { id: "pequenos",      nombre: "Pequeños electro",  img: U("1570222094114-d054a817e56b") },
    { id: "pesca",         nombre: "Pesca",             img: U("1650081484358-b338642813c0") }
  ],

  productos: [
    { id: "aire-vivion",      nombre: "Aire Split Vivion 3000F WiFi Frío/Calor", cat: "climatizacion", precio: 899900,  antes: 999900, img: ["img/aire-vivion.jpg"], colores: ["#ffffff"] },
    { id: "aire-inverter",    nombre: "Aire Split Inverter 3000 Frigorías",      cat: "climatizacion", precio: 1049900, antes: 0,      etiqueta: "nuevo", img: [U("1762341123870-d706f257a12e")], colores: ["#ffffff"] },
    { id: "aire-2250",        nombre: "Aire Split 2250 Frigorías Frío/Calor",    cat: "climatizacion", precio: 749900,  antes: 0,      img: [U("1761330440311-16e160cad236")], colores: ["#ffffff"] },
    { id: "cocina-dako",      nombre: "Cocina Dako Amazonas 4 Hornallas Negra",  cat: "hogar",         precio: 489900,  antes: 539900, img: ["img/cocina-dako.jpg"], colores: ["#111111"] },
    { id: "microondas",       nombre: "Microondas Digital 20 L",                 cat: "hogar",         precio: 189900,  antes: 0,      img: [U("1596552183299-000ef779e88d")], colores: ["#ffffff", "#111111"] },
    { id: "tvbox-luo",        nombre: "TV Box LUO LU-V82 4K Internet TV",        cat: "electronica",   precio: 54900,   antes: 0,      etiqueta: "nuevo", img: ["img/tvbox-luo.jpg"], colores: ["#3a3f47"] },
    { id: "auriculares-bt",   nombre: "Auriculares Bluetooth Over-Ear",          cat: "electronica",   precio: 45900,   antes: 0,      etiqueta: "nuevo", img: [U("1618366712010-f4ae9c647dcb"), U("1505740420928-5e560c06d30e")], colores: ["#111111", "#e8e4dc"] },
    { id: "smartwatch",       nombre: "Smartwatch Deportivo Negro",              cat: "electronica",   precio: 49900,   antes: 59900,  img: [U("1546868871-7041f2a55e12")], colores: ["#111111"] },
    { id: "smartwatch-pro",   nombre: "Smartwatch Pro Pantalla AMOLED",          cat: "electronica",   precio: 64900,   antes: 0,      img: [U("1579586337278-3befd40fd17a")], colores: ["#d9d9d9", "#111111"] },
    { id: "parlante-bt",      nombre: "Parlante Bluetooth Portátil Resistente",  cat: "electronica",   precio: 42900,   antes: 0,      img: [U("1608043152269-423dbba4e7e1")], colores: ["#111111", "#1f6feb"] },
    { id: "parlante-xl",      nombre: "Parlante Bluetooth XL 40W",               cat: "electronica",   precio: 58900,   antes: 69900,  img: [U("1589003077984-894e133dabab")], colores: ["#111111"] },
    { id: "auriculares-pro",  nombre: "Auriculares Inalámbricos Pro",            cat: "electronica",   precio: 38900,   antes: 0,      img: [U("1633329102202-eaa697179563")], colores: ["#111111"] },
    { id: "mixer-raf",        nombre: "Mixer RAF 4 en 1 340W con Accesorios",    cat: "pequenos",      precio: 39900,   antes: 46900,  img: ["img/mixer-raf.jpg"], colores: ["#111111"] },
    { id: "pava-lasvegas",    nombre: "Pava Eléctrica Las Vegas 2 L Acero",      cat: "pequenos",      precio: 24900,   antes: 0,      img: ["img/pava-lasvegas.jpg"], colores: ["#c0c0c0"] },
    { id: "juguera-portatil", nombre: "Licuadora Portátil Recargable 400 ml",    cat: "pequenos",      precio: 19900,   antes: 24900,  etiqueta: "nuevo", img: ["img/juguera-portatil.jpg"], colores: ["#1d2a4a"] },
    { id: "licuadora",        nombre: "Licuadora de Vaso 1,5 L 600W",            cat: "pequenos",      precio: 68900,   antes: 0,      img: [U("1570222094114-d054a817e56b")], colores: ["#111111"] },
    { id: "combo-pesca",      nombre: "Combo Caña Spinning + Reel",              cat: "pesca",         precio: 74900,   antes: 0,      etiqueta: "nuevo", img: [U("1650081484358-b338642813c0"), U("1535036997436-f088d7774803")], colores: ["#111111"] },
    { id: "reel-frontal",     nombre: "Reel Frontal 5 Rulemanes",                cat: "pesca",         precio: 38900,   antes: 44900,  img: [U("1593442998882-7cb49031174b")], colores: ["#111111", "#1f6feb"] },
    { id: "cana-telescopica", nombre: "Caña Telescópica 2,10 m",                 cat: "pesca",         precio: 29900,   antes: 0,      img: [U("1566014727723-20aa739a7b11")], colores: ["#5a3a26"] },
    { id: "cana-pro",         nombre: "Caña de Pesca Grafito 2,40 m",            cat: "pesca",         precio: 52900,   antes: 0,      img: [U("1529230117010-b6c436154f25")], colores: ["#111111"] }
  ],

  talles: [],   // electrónica y hogar: sin talles (se oculta la opción)
  descripcionGeneral: "Producto nuevo, con garantía oficial. Consultanos por WhatsApp por stock, colores disponibles y formas de pago.",

  novedades:   ["tvbox-luo", "auriculares-bt", "aire-inverter", "juguera-portatil", "combo-pesca", "smartwatch-pro", "pava-lasvegas", "parlante-bt"],
  masVendidos: ["aire-vivion", "cocina-dako", "mixer-raf", "smartwatch", "reel-frontal", "parlante-xl", "microondas", "licuadora"],

  historia: {
    tag: "Nuestro local",
    titulo: "Tecnología, hogar y pesca en Gobernador Crespo",
    texto: "En Tonic Shop reunimos todo lo que necesitás para tu casa y tu tiempo libre: electrónica, electrodomésticos, climatización y pesca. Atención personalizada, garantía y envíos a todo el país.",
    img: "img/banner-multirubro.jpg"
  },

  looksTag: "Combos",
  looksTitulo: "Armá tu combo",
  looksTexto: "Combinaciones pensadas para cada momento, con todos los productos a un clic.",
  looks: [
    { titulo: "Combo cocina",     img: "img/mixer-raf.jpg",                 productos: ["pava-lasvegas", "mixer-raf", "juguera-portatil"] },
    { titulo: "Combo tecnología", img: U("1519335553051-96f1218cd5fa"),     productos: ["auriculares-bt", "smartwatch", "parlante-bt"] },
    { titulo: "Combo pesca",      img: U("1535036997436-f088d7774803"),     productos: ["combo-pesca", "reel-frontal", "cana-telescopica"] }
  ],

  instagramFotos: ["img/cocina-dako.jpg", "img/aire-vivion.jpg", "img/tvbox-luo.jpg", "img/mixer-raf.jpg", "img/pava-lasvegas.jpg", "img/juguera-portatil.jpg"]
};
