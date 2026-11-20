/* ==========================================================
   DATOS — OffSide Constituyentes
   Fotos "img/..." = fotos reales de su Instagram.
   Fotos "https://images.unsplash.com/..." = ilustrativas libres.
   Productos y precios: DE EJEMPLO para la propuesta.
   ========================================================== */
const U = (id, w = 900) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

window.TIENDA = {
  nombre: "OffSide",
  bajada: "Indumentaria · Santa Fe",
  logo: "img/logo.png",
  whatsapp: "5490000000000",
  instagram: "offsideconstituyentes.ok",
  ciudad: "Saavedra 3065 · San Martín 2798 · Santa Fe",

  anuncios: [
    "Envíos a todo el país · Gratis desde $100.000",
    "3 cuotas sin interés con todas las tarjetas",
    "Retirá gratis en nuestros locales de Saavedra y San Martín"
  ],
  cuotas: 3,
  descuentoTransferencia: 10,
  envioGratisDesde: 100000,

  hero: {
    tag: "Nuevos ingresos",
    titulo: "Jeans, básicos y tendencia para todos los días",
    bajada: "Lo que ves en nuestros locales de Santa Fe, ahora para comprar desde tu casa.",
    boton: "Ver ingresos",
    imagenes: [U("1758632535370-f5954a9686c1", 1200), "img/jardinero.jpg", U("1508248839954-53aae05bddca", 1200)]
  },

  beneficios: [
    { ico: "envio",   titulo: "Envíos a todo el país", texto: "Gratis desde $100.000" },
    { ico: "tarjeta", titulo: "3 cuotas sin interés",   texto: "Con todas las tarjetas" },
    { ico: "cambio",  titulo: "Cambios sin vueltas",    texto: "En cualquiera de los locales" },
    { ico: "local",   titulo: "Retiro en el local",     texto: "Saavedra 3065 · San Martín 2798" }
  ],

  categorias: [
    { id: "mujer",      nombre: "Mujer",       nombreCorto: "Mujer",  img: U("1775326667922-7aaab4148721") },
    { id: "hombre",     nombre: "Hombre",      nombreCorto: "Hombre", img: "img/parka.jpg" },
    { id: "jeans",      nombre: "Jeans",       img: "img/jean-carpintero.jpg" },
    { id: "accesorios", nombre: "Bolsos y accesorios", img: "img/bolso-animal.jpg" }
  ],

  /* precio y antes: DE EJEMPLO */
  productos: [
    { id: "jardinero-wide", nombre: "Jardinero de Jean Wide Leg", cat: "mujer", precio: 69900, antes: 0, etiqueta: "nuevo",
      img: ["img/jardinero.jpg", U("1758632535370-f5954a9686c1")], colores: ["#6f8db3"],
      desc: "Jardinero de jean rígido con pierna amplia y tiras regulables. Se usa con remera, camisa o sweater: un básico que no pasa de moda." },
    { id: "pantalon-lino", nombre: "Pantalón de Lino Sóvatto", cat: "mujer", precio: 54900, antes: 0, etiqueta: "nuevo",
      img: ["img/pantalon-lino.jpg", U("1519801584609-8ee5f072eddd")], colores: ["#f4f1ea", "#1d1d1b"],
      desc: "Pantalón de lino de Sóvatto, fresco y liviano, con cintura cómoda y caída recta. Ideal para los días de calor." },
    { id: "camisa-volados", nombre: "Camisa Blanca con Volados", cat: "mujer", precio: 42900, antes: 49900,
      img: ["img/camisa-volados.jpg"], colores: ["#ffffff"],
      desc: "Camisa de algodón con manga 3/4 y volado en la terminación. Queda perfecta con jeans para salir el finde." },
    { id: "campera-jean-mujer", nombre: "Campera de Jean Clásica", cat: "mujer", precio: 64900, antes: 0,
      img: [U("1587155471946-9e8d4d1132fa"), U("1652952116747-ecdcabb667de")], colores: ["#5a7fae"],
      desc: "La campera de jean de siempre, en lavado medio. Va con todo y dura años." },
    { id: "remera-rayada", nombre: "Remera Rayada Manga Larga", cat: "mujer", precio: 24900, antes: 0,
      img: [U("1601324389523-cb9bd3853025"), U("1775326667922-7aaab4148721")], colores: ["#2b2b2b", "#e9e5df"],
      desc: "Remera de algodón a rayas, de manga larga y calce relajado. Un básico para combinar." },
    { id: "campera-cuero-mujer", nombre: "Campera Eco Cuero Negra", cat: "mujer", precio: 79900, antes: 94900,
      img: [U("1609527324517-7d9a92edcf1f")], colores: ["#111111"],
      desc: "Campera de eco cuero con cierre y bolsillos. Le da onda a cualquier look, de día o de noche." },
    { id: "tapado-gris", nombre: "Tapado Gris de Paño", cat: "mujer", precio: 99900, antes: 0,
      img: [U("1584216338898-f34d78201414")], colores: ["#8d8d8d", "#c9b89c"],
      desc: "Tapado largo de paño, abrigado y elegante. Para el invierno santafesino." },

    { id: "parka-verde", nombre: "Parka Verde Militar con Capucha", cat: "hombre", precio: 109900, antes: 0, etiqueta: "nuevo",
      img: ["img/parka.jpg"], colores: ["#4b5032"],
      desc: "Parka abrigada con capucha de piel sintética, bolsillos grandes y cierre doble. La campera que vas a usar todo el invierno." },
    { id: "campera-jean-hombre", nombre: "Campera de Jean Hombre", cat: "hombre", precio: 67900, antes: 0,
      img: [U("1516257984-b1b4d707412e"), U("1775317737162-e85a07629b4d")], colores: ["#4f6f99"],
      desc: "Campera de jean de corte recto y lavado clásico. Un infaltable." },
    { id: "camisa-cuadros", nombre: "Camisa a Cuadros Manga Larga", cat: "hombre", precio: 39900, antes: 46900,
      img: [U("1626557981101-aae6f84aa6ff"), U("1508248839954-53aae05bddca")], colores: ["#3f5f8f", "#ffffff"],
      desc: "Camisa de algodón a cuadros, cómoda para el día a día o para un plan más arreglado." },
    { id: "campera-gamuza", nombre: "Campera de Gamuza Camel", cat: "hombre", precio: 94900, antes: 0,
      img: [U("1617114919297-3c8ddb01f599")], colores: ["#b58a5c"],
      desc: "Campera tipo gamuza en color camel, liviana y con mucho estilo." },
    { id: "campera-cierre", nombre: "Campera con Cierre Marrón", cat: "hombre", precio: 74900, antes: 0,
      img: [U("1620228922597-cca58f177310"), U("1777880652269-ff1dd5e65fbb")], colores: ["#6b4a33"],
      desc: "Campera de entretiempo con cierre, ideal para combinar con jeans." },

    { id: "jean-carpintero", nombre: "Jean Carpintero Rígido", cat: "jeans", precio: 59900, antes: 0, etiqueta: "nuevo",
      img: ["img/jean-carpintero.jpg"], colores: ["#3b4f73"],
      desc: "Jean carpintero de denim rígido, con bolsillos laterales y presilla para herramientas. Calce recto y cómodo." },
    { id: "jean-mom", nombre: "Jean Mom Tiro Alto", cat: "jeans", precio: 57900, antes: 64900,
      img: [U("1608370946545-7d93571b5593")], colores: ["#6f8db3"],
      desc: "Jean mom de tiro alto y pierna recta. El que te queda bien con todo." },
    { id: "jean-celeste", nombre: "Jean Celeste Wide Leg", cat: "jeans", precio: 59900, antes: 0,
      img: [U("1784639072018-dd85c44f992e")], colores: ["#a9c1dc"],
      desc: "Jean de pierna amplia en lavado celeste. Tendencia que llegó para quedarse." },
    { id: "jean-recto", nombre: "Jean Recto Clásico", cat: "jeans", precio: 54900, antes: 0,
      img: [U("1715758890375-3a6c8ac2e640")], colores: ["#2f4a73", "#111111"],
      desc: "Jean de corte recto, el más elegido. Consultá talles disponibles en el local." },

    { id: "bolso-animal", nombre: "Bolso Matelasseado Animal Print", cat: "accesorios", precio: 49900, antes: 0, etiqueta: "nuevo",
      img: ["img/bolso-animal.jpg"], colores: ["#8a6a4a"],
      desc: "Bolso grande matelasseado con estampa animal print, manijas y correa larga. Entra todo lo que necesitás." },
    { id: "cartucheras", nombre: "Neceser y Cartucheras", cat: "accesorios", precio: 14900, antes: 18900,
      img: ["img/cartucheras.jpg"], colores: ["#1f2a44", "#e8457f"],
      desc: "Neceser y cartucheras en varios modelos y colores. Para la vuelta al cole o para el bolso de todos los días." },
    { id: "pantuflas", nombre: "Pantuflas de Corderito", cat: "accesorios", precio: 19900, antes: 0,
      img: ["img/pantuflas.jpg"], colores: ["#e7a3b8", "#c2185b", "#f2eee8"],
      desc: "Pantuflas tipo bota con interior de corderito, súper abrigadas. Ideales para regalar." }
  ],

  talles: ["S", "M", "L", "XL"],
  descripcionGeneral: "Consultá talles y colores disponibles por WhatsApp o en nuestros locales.",

  novedades:   ["jardinero-wide", "pantalon-lino", "parka-verde", "jean-carpintero", "bolso-animal", "camisa-volados", "campera-gamuza", "pantuflas"],
  masVendidos: ["jean-mom", "campera-jean-mujer", "camisa-cuadros", "campera-cuero-mujer", "jean-celeste", "cartucheras", "remera-rayada", "campera-jean-hombre"],

  historia: {
    tag: "Nuestros locales",
    titulo: "Dos locales en Santa Fe, ahora también online",
    texto: "Te esperamos en Saavedra 3065 y en San Martín 2798. Todas las semanas entran novedades: ahora podés verlas y comprarlas desde tu casa, con envío o retiro en el local.",
    img: "img/local.jpg"
  },

  looks: [
    { titulo: "Total denim",    img: "img/jardinero.jpg",       productos: ["jardinero-wide", "campera-jean-mujer", "remera-rayada"] },
    { titulo: "Invierno urbano", img: "img/parka.jpg",           productos: ["parka-verde", "jean-recto", "camisa-cuadros"] },
    { titulo: "Listas para el finde", img: "img/camisa-volados.jpg", productos: ["camisa-volados", "jean-celeste", "bolso-animal"] }
  ],

  instagramFotos: ["img/jardinero.jpg", "img/pantalon-lino.jpg", "img/local-jeans.jpg", "img/bolso-animal.jpg", "img/parka.jpg", "img/jean-carpintero.jpg"]
};
