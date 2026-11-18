/* ==========================================================
   TU SERVICIO — datos que aparecen al final de TODAS las propuestas
   (sección "Qué incluye", "Cómo seguimos" y botón de WhatsApp).
   Editalo una vez y se actualizan todas.
   ========================================================== */
window.AGENCIA = {
  nombre: "",                 // tu nombre o marca (opcional), ej: "Ignacio · Tiendas online"
  whatsapp: "5493498435838",             // TU número con código de país, sin + ni espacios. Ej: "5493434123456"
  mensaje: "¡Hola! Vi la propuesta de tienda online para {marca} y me interesa avanzar.",

  incluye: [
    { titulo: "Diseño a medida",        texto: "Con tu logo, tus colores y el estilo de tu marca." },
    { titulo: "Carga de productos",     texto: "Fotos, descripciones, precios y categorías ordenadas." },
    { titulo: "Pagos y envíos",         texto: "Mercado Pago, tarjetas, transferencia y envíos configurados." },
    { titulo: "Pensada para celular",   texto: "La mayoría compra desde el teléfono: tiene que verse perfecta ahí." },
    { titulo: "Dominio propio",         texto: "Tu tienda con tu nombre, por ejemplo www.tumarca.com.ar." },
    { titulo: "Capacitación",           texto: "Te enseñamos a cargar productos y gestionar pedidos solo." }
  ],

  pasos: [
    "Elegís el diseño que más te gusta",
    "Nos pasás tus productos y datos",
    "Armamos y configuramos tu tienda",
    "Revisás, ajustamos y ¡a vender!"
  ],

  plazo: "Tu tienda lista en 7 a 10 días hábiles",  // dejalo "" para no mostrarlo

  /* Estadísticas de visitas (GoatCounter, gratis): poné el código de tu cuenta.
     Ej: si tu panel es https://bocetos-ignacio.goatcounter.com → goatcounter: "bocetos-ignacio"
     Para que TUS visitas no cuenten: abrí una vez cualquier propuesta agregando ?yo al final
     del link (ej: .../farmaciakogel/?yo) en cada navegador/celular que uses. */
  goatcounter: "bocetos-propuestas"
};

/* ---- Contador de visitas (no tocar) ---- */
(function () {
  var A = window.AGENCIA;
  if (!A || !A.goatcounter) return;
  if (/^(localhost|127\.|\[::1\])/.test(location.hostname) || location.protocol === "file:") return;
  try {
    if (/[?&]yo\b/.test(location.search)) localStorage.setItem("bocetos-yo", "1");
    if (/[?&]noyo\b/.test(location.search)) localStorage.removeItem("bocetos-yo");
    if (localStorage.getItem("bocetos-yo")) return;
  } catch (e) {}
  var s = document.createElement("script");
  s.async = true;
  s.src = "https://gc.zgo.at/count.js";
  s.setAttribute("data-goatcounter", "https://" + A.goatcounter + ".goatcounter.com/count");
  document.head.appendChild(s);
})();
