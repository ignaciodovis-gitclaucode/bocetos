/* ==========================================================
   DATOS — Farmacia Kogel
   Productos y fotos: tomados de su Tiendanube actual
   (farmaciakogel.mitiendanube.com). Las descripciones son de
   muestra y los PRECIOS SON DE EJEMPLO (su tienda no los publica).
   Fotos "https://images.unsplash.com/..." = ilustrativas libres.
   ========================================================== */
const K = f => `https://dcdn-us.mitiendanube.com/stores/008/157/687/products/${f}-1024-1024.webp`;
const U = (id, w = 1000) => `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=75`;

window.TIENDA = {
  nombre: "Farmacia Kogel",
  bajada: "La farmacia que te aconseja",
  logo: "img/logo.png",
  whatsapp: "5490000000000",
  instagram: "farmaciakogel",

  /* Antes y después: captura de su tienda actual + qué mejora la propuesta */
  antes: {
    img: "img/antes.jpg",
    url: "farmaciakogel.mitiendanube.com",
    diseno: "catalogo",
    mejoras: [
      "Tus 24 productos visibles desde la portada, ordenados en 4 categorías",
      "Tu logo y los colores de tu Instagram en toda la tienda",
      "Precios, cuotas y precio con transferencia a la vista",
      "Descripciones claras en cada producto",
      "Una sección para tus fórmulas magistrales, tu diferencial",
      "Botón de WhatsApp para que te consulten en un clic"
    ]
  },
  ciudad: "Argentina",

  anuncios: [
    "Envíos a todo el país · Gratis desde $60.000",
    "3 cuotas sin interés con todas las tarjetas",
    "Preguntá lo que necesites: te asesoramos por WhatsApp"
  ],
  cuotas: 3,
  descuentoTransferencia: 10,
  envioGratisDesde: 60000,

  hero: {
    tag: "Dermocosmética · Fórmulas magistrales",
    titulo: "La farmacia que te aconseja",
    bajada: "Cuidado de la piel, protección solar y bienestar para toda la familia, con el asesoramiento de nuestros farmacéuticos.",
    boton: "Ver productos",
    imagenes: [U("1573461160327-b450ce3d8e7f"), U("1785581778868-79100f7fe56c"), U("1581182800629-7d90925ad072")]
  },

  beneficios: [
    { ico: "envio",   titulo: "Envíos a todo el país", texto: "Gratis desde $60.000" },
    { ico: "tarjeta", titulo: "3 cuotas sin interés",   texto: "Con todas las tarjetas" },
    { ico: "cambio",  titulo: "Asesoramiento real",     texto: "Farmacéuticos que te responden" },
    { ico: "local",   titulo: "Retiro en la farmacia",  texto: "Sin costo" }
  ],

  categorias: [
    { id: "facial",   nombre: "Cuidado facial",           nombreCorto: "Facial", img: U("1580870069867-74c57ee1bb07", 900) },
    { id: "solar",    nombre: "Protección solar",         nombreCorto: "Solar",  img: U("1623676714504-edd78728155e", 900) },
    { id: "bebes",    nombre: "Bebés y niños",            img: K("7793742005466-3d190fc0c0e4d630fd17930174655651") },
    { id: "corporal", nombre: "Piel sensible y corporal", img: U("1585945037805-5fd82c2e60b1", 900) }
  ],

  /* precio y antes: DE EJEMPLO */
  productos: [
    { id: "micelar-salicilico", nombre: "Agua Micelar Ácido Salicílico 400 ml", cat: "facial", precio: 14900, antes: 0, etiqueta: "nuevo",
      img: [K("micelar-anti-imperfecciones-1-bfad5e47dac0bf7bf717930247642079")],
      desc: "Limpia, desmaquilla y ayuda a reducir imperfecciones en un solo paso. Con ácido salicílico, ideal para piel mixta a grasa. No necesita enjuague." },
    { id: "crema-vitc", nombre: "Crema Hidratante con Vitamina C", cat: "facial", precio: 18900, antes: 22900,
      img: [K("crema-hidratante-4d06dc2e174b3c587f17930244071558")],
      desc: "Hidratación diaria con vitamina C que aporta luminosidad y ayuda a unificar el tono. Textura liviana de rápida absorción." },
    { id: "mascarilla-carbon", nombre: "Mascarilla Negra en Tela Pure Carbón", cat: "facial", precio: 4900, antes: 0,
      img: [K("7509552656640-1-76a7154a68be3d178b17930242956804")],
      desc: "Mascarilla de tela con carbón que purifica los poros y elimina el exceso de grasa en 15 minutos. Piel más fresca y matificada." },
    { id: "ojos-vitc", nombre: "Crema de Ojos Vitamina C Garnier", cat: "facial", precio: 16900, antes: 0,
      img: [K("7509552933369_2-sin-fondo-d5b33bc7e41c0e3dfc17930241657534")],
      desc: "Contorno de ojos que ilumina y ayuda a disimular ojeras y signos de cansancio. Aplicar mañana y noche con suaves toques." },
    { id: "gel-vitc", nombre: "Gel Limpiador Vitamina C Garnier", cat: "facial", precio: 12900, antes: 0,
      img: [K("ecomm-gel-limpiador-ea-ta2023-frente-c2443c92dda76c05d817930240611537")],
      desc: "Gel de limpieza facial con vitamina C que remueve impurezas sin resecar y deja la piel suave y luminosa." },
    { id: "serum-imperfecciones", nombre: "Sérum Facial Anti Imperfecciones", cat: "facial", precio: 24900, antes: 0, etiqueta: "nuevo",
      img: [K("serum-anti-imperfecciones-1-edfd8f7b0302aca7af17930239304619")],
      desc: "Sérum concentrado que ayuda a reducir granitos, marcas y poros visibles. Uso diario, antes de la crema hidratante." },
    { id: "serum-nocturno", nombre: "Sérum Facial Antioxidante Nocturno", cat: "facial", precio: 26900, antes: 31900,
      img: [K("serum-night_botella-frente-1-9db4ea1b1ef04da54017930238202685")],
      desc: "Trabaja mientras dormís: antioxidantes que ayudan a renovar la piel y amanecer con un rostro más descansado y uniforme." },

    { id: "solar-facial-50", nombre: "Protector Solar Facial FPS 50", cat: "solar", precio: 22900, antes: 0,
      img: [K("7793742005510-ccf579848f5205269a17930172443553")],
      desc: "Protección alta UVA/UVB para el rostro. Hipoalergénico, libre de parabenos y testeado dermatológicamente, apto piel sensible. Textura liviana." },
    { id: "solar-pediatrico-65", nombre: "Protector Solar Pediátrico FPS 65", cat: "solar", precio: 24900, antes: 0, etiqueta: "nuevo",
      img: [K("7793742005527-07c18c739b20b5109d17930172033833")],
      desc: "Protección muy alta especialmente formulada para la piel delicada de los chicos. Resistente al agua y de fácil aplicación." },
    { id: "barra-solar-50", nombre: "Barra Protectora Solar FPS 50", cat: "solar", precio: 11900, antes: 0,
      img: [K("7793742004889-8ac575b795e769cd5817930138812494")],
      desc: "Barra práctica para zonas sensibles: labios, nariz, orejas y pómulos. Ideal para llevar en la cartera o el bolso de playa." },
    { id: "spray-solar-ninos", nombre: "Protector Solar en Spray FPS 50 Niños", cat: "solar", precio: 27900, antes: 32900,
      img: [K("7793742003738-f80ec129eba2e50aed17928526726205")],
      desc: "Spray de aplicación rápida y pareja, ideal para chicos inquietos. Alta protección y resistente al agua." },

    { id: "aveno-gel-infantil", nombre: "Gel de Baño Infantil Aveno", cat: "bebes", precio: 13500, antes: 0,
      img: [K("7793742005466-3d190fc0c0e4d630fd17930174655651")],
      desc: "Gel de baño suave con avena para la piel delicada de bebés y niños. Limpia sin irritar y cuida la hidratación natural." },
    { id: "aveno-acond-infantil", nombre: "Acondicionador Infantil Aveno 250 ml", cat: "bebes", precio: 12900, antes: 0,
      img: [K("7793742005442-5ceb4aebf8af33f19c17930163629983")],
      desc: "Desenreda y suaviza el cabello de los chicos sin tirones. Fórmula suave con avena, apta para uso diario." },
    { id: "hipoglos-diario-1", nombre: "Crema Hipoglós Cuidado Diario", cat: "bebes", precio: 9900, antes: 0,
      img: [K("7793742002991-10d1e2b44af4a035b317930178754791")],
      desc: "Protege la piel del bebé en cada cambio de pañal y ayuda a prevenir paspaduras. Uso diario." },
    { id: "hipoglos-diario-2", nombre: "Crema Hipoglós Cuidado Diario (tamaño familiar)", cat: "bebes", precio: 15900, antes: 18900,
      img: [K("7793742002984-2ad7736e047f787b2317930178334599")],
      desc: "La misma protección diaria para el cambio de pañal, en presentación más grande y conveniente." },
    { id: "hipoglos-vl", nombre: "Pomada Cicatrizante Hipoglós VL", cat: "bebes", precio: 12900, antes: 0,
      img: [K("7793742002502-500f087ad1d4b868d917930178056875")],
      desc: "Pomada que calma y ayuda a regenerar la piel irritada o paspada. Forma una barrera protectora." },
    { id: "hipoglos-100", nombre: "Pomada Hipoglós 100 g", cat: "bebes", precio: 13900, antes: 0,
      img: [K("7793742001970-a95652bc5d1b30539017930177471174")],
      desc: "La clásica pomada protectora para la cola del bebé, en presentación de 100 g." },

    { id: "prurisedan-crema-30", nombre: "Crema Prurisedán 30 g", cat: "corporal", precio: 9900, antes: 0,
      img: [K("7793742005985-0caef74dff80a7bf4c17930201700583")],
      desc: "Alivia la picazón y calma la piel irritada por picaduras, roces o alergias leves. Práctica para tener a mano." },
    { id: "prurisedan-locion", nombre: "Loción Prurisedán para Picazón", cat: "corporal", precio: 14900, antes: 0,
      img: [K("7793742005992-dcbf41478275cc2e4a17930201410038")],
      desc: "Loción de rápida absorción para aliviar la picazón en zonas amplias del cuerpo. Sensación fresca al instante." },
    { id: "prurisedan-crema", nombre: "Crema Prurisedán para Picazón", cat: "corporal", precio: 11900, antes: 13900,
      img: [K("7793742904356-e73b6a0ac5fbb398f617930186511167")],
      desc: "Crema calmante que reduce la picazón y la irritación. Ideal para picaduras de insectos en verano." },
    { id: "aveno-jabon", nombre: "Jabón en Barra Aveno", cat: "corporal", precio: 6900, antes: 0,
      img: [K("7793742004384-f405ab5f03785d120f17930174002362")],
      desc: "Jabón con avena para piel sensible o seca. Limpia suavemente sin alterar la barrera natural de la piel." },
    { id: "aveno-espuma", nombre: "Espuma de Limpieza Facial y Corporal Aveno", cat: "corporal", precio: 15900, antes: 0, etiqueta: "nuevo",
      img: [K("7793742005633-0305cabfbed93ca3c217930173110257")],
      desc: "Espuma liviana para rostro y cuerpo, pensada para pieles sensibles. Limpia en profundidad y deja la piel confortable." },
    { id: "aveno-acond", nombre: "Acondicionador Aveno 250 ml", cat: "corporal", precio: 12900, antes: 0,
      img: [K("7793742004353-0640a05182dfb681f617930162497114")],
      desc: "Acondicionador suave con avena para cueros cabelludos sensibles. Desenreda y aporta suavidad sin apelmazar." },
    { id: "crema-maternal", nombre: "Crema Reparadora Maternal", cat: "corporal", precio: 19900, antes: 23900,
      img: [K("7793742004018-c63e12eb049da0d55d17930150364104")],
      desc: "Ayuda a mantener la elasticidad de la piel durante el embarazo y la lactancia, y a prevenir estrías. Hidratación profunda." }
  ],

  talles: [],
  descripcionGeneral: "Consultanos por WhatsApp: nuestros farmacéuticos te asesoran sobre el producto ideal para vos.",

  novedades:   ["serum-imperfecciones", "solar-pediatrico-65", "micelar-salicilico", "aveno-espuma", "crema-vitc", "spray-solar-ninos", "serum-nocturno", "crema-maternal"],
  masVendidos: ["solar-facial-50", "hipoglos-diario-1", "prurisedan-crema", "gel-vitc", "aveno-gel-infantil", "ojos-vitc", "barra-solar-50", "mascarilla-carbon"],

  historia: {
    tag: "Fórmulas magistrales",
    titulo: "Preparamos tu fórmula a medida",
    texto: "Además de dermocosmética y productos de farmacia, elaboramos fórmulas magistrales según la indicación de tu médico. Escribinos y te contamos cómo hacer tu pedido.",
    img: U("1757800945999-ed0fa905d0f5")
  },

  looksTag: "Rutinas",
  looksTitulo: "Armá tu rutina",
  looksTexto: "Combinaciones recomendadas por nuestros farmacéuticos para cada necesidad.",
  looks: [
    { titulo: "Rutina piel luminosa",       img: U("1580870069867-74c57ee1bb07", 900), productos: ["gel-vitc", "crema-vitc", "ojos-vitc"] },
    { titulo: "Rutina anti imperfecciones", img: U("1620916297397-a4a5402a3c6c", 900), productos: ["micelar-salicilico", "serum-imperfecciones", "solar-facial-50"] },
    { titulo: "Verano en familia",          img: U("1623676714504-edd78728155e", 900), productos: ["solar-pediatrico-65", "spray-solar-ninos", "prurisedan-crema"] }
  ],

  instagramFotos: [U("1573461160327-b450ce3d8e7f", 500), K("serum-anti-imperfecciones-1-edfd8f7b0302aca7af17930239304619"), U("1785581778868-79100f7fe56c", 500), K("7793742005510-ccf579848f5205269a17930172443553"), U("1585945037805-5fd82c2e60b1", 500), K("7793742005466-3d190fc0c0e4d630fd17930174655651")]
};