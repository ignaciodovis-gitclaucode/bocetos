/* ==========================================================
   MOTOR COMÚN — no hace falta tocarlo.
   Arma carrito, categoría y ficha de producto a partir de datos.js.
   Cada diseño (editorial/, catalogo/) define su header, footer,
   home y tarjeta de producto y llama a Motor.iniciar(diseno).
   ========================================================== */
(function () {
  const T = window.TIENDA;
  const R = "../";                       // los diseños viven un nivel abajo de datos.js
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const q = new URLSearchParams(location.search);

  // Foto de reemplazo cuando falta una imagen (útil al arrancar un boceto nuevo)
  const PH = "data:image/svg+xml," + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f3efe8"/><stop offset="1" stop-color="#e4dccd"/></linearGradient></defs><rect width="400" height="500" fill="url(#g)"/><g fill="none" stroke="#b9ad98" stroke-width="6" stroke-linejoin="round"><rect x="150" y="200" width="100" height="80" rx="8"/><circle cx="200" cy="240" r="20"/></g><text x="200" y="320" font-family="sans-serif" font-size="18" fill="#a89c86" text-anchor="middle" letter-spacing="3">FOTO</text></svg>');
  // acepta rutas locales ("img/x.jpg") o fotos de internet ("https://...")
  const src = p => (!p ? PH : /^https?:\/\//.test(p) ? p : R + p);
  document.addEventListener("error", e => { const i = e.target; if (i.tagName === "IMG" && !i.dataset.ph) { i.dataset.ph = 1; i.src = PH; } }, true);
  const plata = n => "$" + Math.round(n).toLocaleString("es-AR");
  const off = p => (p.antes && p.antes > p.precio ? Math.round((1 - p.precio / p.antes) * 100) : 0);
  const cuota = p => plata(p.precio / T.cuotas);
  const transf = p => plata(p.precio * (1 - T.descuentoTransferencia / 100));
  const prod = id => T.productos.find(p => p.id === id);
  const cat = id => T.categorias.find(c => c.id === id);
  const conTalles = () => (T.talles || []).length > 1;   // con 0 o 1 talle se oculta la opción
  const talleUnico = () => (T.talles || [])[0] || "Único";
  // link al perfil de Instagram (se abre en otra pestaña)
  const ig = () => T.instagram && !T.instagramEjemplo ? `href="https://www.instagram.com/${encodeURIComponent(T.instagram)}/" target="_blank" rel="noopener"` : `href="#"`;
  const lista = ids => (ids || []).map(prod).filter(Boolean);
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));

  const ICO = {
    buscar: '<svg viewBox="0 0 24 24"><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></svg>',
    cuenta: '<svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></svg>',
    bolsa: '<svg viewBox="0 0 24 24"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></svg>',
    menu: '<svg viewBox="0 0 24 24"><path d="M3 6h18M3 12h18M3 18h18"/></svg>',
    cerrar: '<svg viewBox="0 0 24 24"><path d="M6 6l12 12M18 6 6 18"/></svg>',
    corazon: '<svg viewBox="0 0 24 24"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10Z"/></svg>',
    envio: '<svg viewBox="0 0 24 24"><path d="M3 6h11v10H3zM14 10h4l3 3v3h-7"/><circle cx="7" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>',
    tarjeta: '<svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 10h18M7 15h3"/></svg>',
    cambio: '<svg viewBox="0 0 24 24"><path d="M4 9h13l-3-3M20 15H7l3 3"/></svg>',
    local: '<svg viewBox="0 0 24 24"><path d="M4 10 5.5 4h13L20 10M4 10v10h16V10M4 10h16M10 20v-5h4v5"/></svg>',
    wsp: '<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.1-4.7-4-4.9-4.2-.1-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3 0 .2 0 .8-.2 1.3Z"/></svg>',
    ig: '<svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".6"/></svg>',
    flecha: '<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>',
    filtro: '<svg viewBox="0 0 24 24"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
    check: '<svg viewBox="0 0 24 24"><path d="m5 12 4.5 4.5L19 7"/></svg>'
  };

  /* ---------- Carrito (vive solo en este navegador) ---------- */
  const CLAVE = "boceto-carrito-" + T.nombre;
  let carrito = [];
  try { carrito = JSON.parse(localStorage.getItem(CLAVE)) || []; } catch (e) { carrito = []; }
  const guardar = () => { try { localStorage.setItem(CLAVE, JSON.stringify(carrito)); } catch (e) {} pintarCarrito(); };

  function agregar(id, talle, cant = 1) {
    const ya = carrito.find(i => i.id === id && i.talle === talle);
    if (ya) ya.cant += cant; else carrito.push({ id, talle, cant });
    guardar(); abrirCarrito();
  }

  function pintarCarrito() {
    const n = carrito.reduce((a, i) => a + i.cant, 0);
    $$("[data-cant-carrito]").forEach(el => { el.textContent = n; el.hidden = n === 0; });
    const cuerpo = $("#carrito-items"); if (!cuerpo) return;
    const total = carrito.reduce((a, i) => a + (prod(i.id)?.precio || 0) * i.cant, 0);
    const falta = T.envioGratisDesde - total;
    $("#carrito-envio").innerHTML = total === 0 ? "" : falta > 0
      ? `Te faltan <b>${plata(falta)}</b> para el envío gratis<div class="barra"><i style="width:${Math.min(100, total / T.envioGratisDesde * 100)}%"></i></div>`
      : `<b>¡Tenés envío gratis!</b><div class="barra"><i style="width:100%"></i></div>`;
    cuerpo.innerHTML = carrito.length ? carrito.map((i, k) => {
      const p = prod(i.id); if (!p) return "";
      return `<div class="c-item"><img src="${src(p.img[0])}" alt=""><div><b>${esc(p.nombre)}</b>${conTalles() ? `<small>Talle ${i.talle}</small>` : ""}
        <div class="c-cant"><button data-k="${k}" data-d="-1">−</button><span>${i.cant}</span><button data-k="${k}" data-d="1">+</button></div></div>
        <div class="c-precio">${plata(p.precio * i.cant)}</div></div>`;
    }).join("") : `<p class="c-vacio">Tu carrito está vacío.</p>`;
    $("#carrito-total").textContent = plata(total);
    $("#carrito-transf").textContent = plata(total * (1 - T.descuentoTransferencia / 100));
    $$(".c-cant button", cuerpo).forEach(b => b.onclick = () => {
      const it = carrito[+b.dataset.k]; it.cant += +b.dataset.d;
      if (it.cant <= 0) carrito.splice(+b.dataset.k, 1);
      guardar();
    });
  }

  const abrirCarrito = () => document.body.classList.add("ver-carrito");
  const cerrarPaneles = () => document.body.classList.remove("ver-carrito", "ver-menu", "ver-filtros", "ver-buscar");

  function paneles() {
    document.body.insertAdjacentHTML("beforeend", `
      <div class="velo" data-cerrar></div>
      <aside class="panel panel-carrito" aria-label="Carrito">
        <div class="panel-cab"><h3>Tu carrito</h3><button class="ico-btn" data-cerrar aria-label="Cerrar">${ICO.cerrar}</button></div>
        <div id="carrito-envio" class="c-envio"></div>
        <div id="carrito-items" class="c-items"></div>
        <div class="c-pie">
          <div class="c-fila"><span>Total</span><b id="carrito-total">$0</b></div>
          <div class="c-fila c-transf"><span>Pagando por transferencia</span><span id="carrito-transf">$0</span></div>
          <button class="btn bloque" onclick="Motor.aviso('Boceto de diseño: el pago se configura en la tienda real')">Iniciar compra</button>
          <button class="btn-link" data-cerrar>Seguir comprando</button>
        </div>
      </aside>
      <aside class="panel panel-menu" aria-label="Menú">
        <div class="panel-cab">${logo()}<button class="ico-btn" data-cerrar aria-label="Cerrar">${ICO.cerrar}</button></div>
        <nav class="menu-movil">
          <a href="index.html">Inicio</a>
          ${T.categorias.map(c => `<a href="categoria.html?cat=${c.id}">${esc(c.nombre)}</a>`).join("")}
          <a href="categoria.html?orden=ofertas" class="es-oferta">Ofertas</a>
        </nav>
        <div class="menu-movil-pie"><a href="#">${ICO.cuenta} Mi cuenta</a><a href="#">${ICO.wsp} WhatsApp</a></div>
      </aside>
      <div class="buscar-capa">
        <form class="wrap" onsubmit="event.preventDefault();location.href='categoria.html?q='+encodeURIComponent(this.q.value)">
          ${ICO.buscar}<input name="q" placeholder="¿Qué estás buscando?" autocomplete="off"><button type="button" class="ico-btn" data-cerrar>${ICO.cerrar}</button>
        </form>
      </div>
      <a class="wsp-flotante" href="#" aria-label="WhatsApp">${ICO.wsp}</a>
      <div class="aviso" id="aviso"></div>`);
    document.addEventListener("click", e => {
      const t = e.target.closest("[data-abrir],[data-cerrar]"); if (!t) return;
      if (t.dataset.cerrar !== undefined) { cerrarPaneles(); return; }
      e.preventDefault(); cerrarPaneles();
      document.body.classList.add("ver-" + t.dataset.abrir);
      if (t.dataset.abrir === "buscar") setTimeout(() => $(".buscar-capa input").focus(), 50);
    });
    document.addEventListener("keydown", e => { if (e.key === "Escape") cerrarPaneles(); });
    pintarCarrito();
  }

  function aviso(txt) {
    const a = $("#aviso"); a.textContent = txt; a.classList.add("on");
    clearTimeout(aviso.t); aviso.t = setTimeout(() => a.classList.remove("on"), 2600);
  }

  const logo = () => T.logo
    ? `<a href="index.html" class="logo"><img src="${src(T.logo)}" alt="${esc(T.nombre)}"></a>`
    : `<a href="index.html" class="logo logo-texto">${esc(T.nombre)}</a>`;

  /* ---------- Página de categoría ---------- */
  function paginaCategoria(D) {
    const c = cat(q.get("cat"));
    const busq = (q.get("q") || "").trim().toLowerCase();
    const titulo = c ? esc(c.nombre) : busq ? `Resultados para “${esc(busq)}”` : q.get("orden") === "ofertas" ? "Ofertas" : "Todos los productos";
    const estado = { cats: c ? [c.id] : [], talles: [], max: Infinity, orden: q.get("orden") === "ofertas" ? "ofertas" : "destacados" };
    const precios = T.productos.map(p => p.precio);
    const tope = Math.ceil(Math.max(...precios) / 10000) * 10000;

    $("#principal").innerHTML = `
      <div class="wrap">
        <nav class="migas"><a href="index.html">Inicio</a> / <span>${titulo}</span></nav>
        <header class="cat-cab"><h1>${titulo}</h1><p id="cat-cuenta"></p></header>
        <div class="cat-barra">
          <button class="btn-filtros" data-abrir="filtros">${ICO.filtro} Filtrar</button>
          <label class="orden">Ordenar por
            <select id="orden">
              <option value="destacados">Destacados</option><option value="menor">Menor precio</option>
              <option value="mayor">Mayor precio</option><option value="ofertas">Ofertas primero</option><option value="nombre">A — Z</option>
            </select></label>
        </div>
        <div class="cat-cuerpo">
          <aside class="filtros panel-filtros">
            <div class="panel-cab solo-movil"><h3>Filtrar</h3><button class="ico-btn" data-cerrar>${ICO.cerrar}</button></div>
            <div class="f-grupo"><h4>Categorías</h4>${T.categorias.map(x => `<label class="f-check"><input type="checkbox" value="${x.id}" ${estado.cats.includes(x.id) ? "checked" : ""} data-f="cat"><span>${esc(x.nombre)}</span><small>${T.productos.filter(p => p.cat === x.id).length}</small></label>`).join("")}</div>
            ${conTalles() ? `<div class="f-grupo"><h4>Talle</h4><div class="f-talles">${T.talles.map(t => `<button class="chip" data-talle="${t}">${t}</button>`).join("")}</div></div>` : ""}
            <div class="f-grupo"><h4>Precio máximo</h4><input type="range" id="f-precio" min="${Math.floor(Math.min(...precios) / 10000) * 10000}" max="${tope}" step="1000" value="${tope}"><div class="f-precio-val">Hasta <b id="f-precio-val">${plata(tope)}</b></div></div>
            <button class="btn bloque solo-movil" data-cerrar>Ver resultados</button>
          </aside>
          <div class="grilla grilla-cat" id="grilla"></div>
        </div>
      </div>`;
    $("#orden").value = estado.orden;

    function filtrar() {
      let r = T.productos.filter(p =>
        (!estado.cats.length || estado.cats.includes(p.cat)) &&
        p.precio <= estado.max &&
        (!busq || (p.nombre + " " + (cat(p.cat)?.nombre || "")).toLowerCase().includes(busq)));
      const o = estado.orden;
      if (o === "menor") r.sort((a, b) => a.precio - b.precio);
      if (o === "mayor") r.sort((a, b) => b.precio - a.precio);
      if (o === "nombre") r.sort((a, b) => a.nombre.localeCompare(b.nombre));
      if (o === "ofertas") r.sort((a, b) => off(b) - off(a));
      $("#grilla").innerHTML = r.length ? r.map(D.card).join("") : `<p class="sin-res">No encontramos productos con esos filtros.</p>`;
      $("#cat-cuenta").textContent = r.length + (r.length === 1 ? " producto" : " productos");
      activarCards();
    }
    $$("[data-f=cat]").forEach(i => i.onchange = () => { estado.cats = $$("[data-f=cat]:checked").map(x => x.value); filtrar(); });
    $$("[data-talle]").forEach(b => b.onclick = () => { b.classList.toggle("sel"); filtrar(); });
    $("#f-precio").oninput = e => { estado.max = +e.target.value; $("#f-precio-val").textContent = plata(estado.max); filtrar(); };
    $("#orden").onchange = e => { estado.orden = e.target.value; filtrar(); };
    filtrar();
  }

  /* ---------- Página de producto ---------- */
  function paginaProducto(D) {
    const p = prod(q.get("id")) || T.productos[0];
    const c = cat(p.cat) || T.categorias[0];
    const fotos = p.img.length > 1 ? p.img : [p.img[0], p.img[0]];
    const rel = T.productos.filter(x => x.cat === p.cat && x.id !== p.id).concat(T.productos.filter(x => x.cat !== p.cat)).slice(0, 4);
    document.title = p.nombre + " — " + T.nombre;
    let talle = conTalles() ? null : talleUnico(), cant = 1;

    $("#principal").innerHTML = `
      <div class="wrap">
        <nav class="migas"><a href="index.html">Inicio</a> / <a href="categoria.html?cat=${c.id}">${esc(c.nombre)}</a> / <span>${esc(p.nombre)}</span></nav>
        <div class="ficha">
          <div class="galeria">
            <div class="miniaturas">${fotos.map((f, i) => `<button class="${i ? "" : "activa"}" data-foto="${f}"><img src="${src(f)}" alt=""></button>`).join("")}</div>
            <div class="foto-principal">${off(p) ? `<span class="etq">-${off(p)}%</span>` : p.etiqueta === "nuevo" ? `<span class="etq nuevo">Nuevo</span>` : ""}<img id="foto-grande" src="${src(fotos[0])}" alt="${esc(p.nombre)}"></div>
          </div>
          <div class="info">
            <h1>${esc(p.nombre)}</h1>
            <div class="info-precio"><span class="precio">${plata(p.precio)}</span>${off(p) ? `<s>${plata(p.antes)}</s><span class="off">${off(p)}% OFF</span>` : ""}</div>
            <p class="info-cuotas"><b>${T.cuotas} cuotas sin interés</b> de ${cuota(p)}</p>
            <p class="info-transf">${transf(p)} pagando por transferencia</p>
            <div class="opcion"><span class="op-tit">Color</span><div class="colores">${p.colores.map((col, i) => `<button class="color ${i ? "" : "sel"}" style="--col:${col}" aria-label="Color ${i + 1}"></button>`).join("")}</div></div>
            ${conTalles() ? `<div class="opcion"><span class="op-tit">Talle <a href="#" onclick="Motor.aviso('Acá va la guía de talles de la marca');return false">Guía de talles</a></span>
              <div class="talles">${T.talles.map(t => `<button class="chip" data-t="${t}">${t}</button>`).join("")}</div></div>` : ""}
            <div class="comprar">
              <div class="cant"><button data-c="-1">−</button><span id="cant">1</span><button data-c="1">+</button></div>
              <button class="btn" id="agregar">Agregar al carrito</button>
            </div>
            <div class="envio-calc">
              <div class="ec-tit">${ICO.envio} Medios de envío</div>
              <form onsubmit="event.preventDefault();this.nextElementSibling.hidden=false"><input placeholder="Tu código postal" inputmode="numeric"><button class="btn-sec">Calcular</button></form>
              <div class="ec-res" hidden><div><span>Envío a domicilio</span><b>${plata(6900)}</b></div><div><span>Retiro en el local</span><b>Gratis</b></div></div>
            </div>
            <details class="acordeon" open><summary>Descripción</summary><p>${esc(p.desc || T.descripcionGeneral)}</p></details>
            <details class="acordeon"><summary>Envíos y cambios</summary><p>Enviamos a todo el país. Envío gratis en compras desde ${plata(T.envioGratisDesde)}. Tenés 30 días para cambiar tu compra.</p></details>
            <details class="acordeon"><summary>Medios de pago</summary><p>Tarjetas de crédito y débito, Mercado Pago y transferencia bancaria (${T.descuentoTransferencia}% OFF).</p></details>
          </div>
        </div>
        <section class="seccion relacionados"><h2 class="tit-sec">También te puede gustar</h2><div class="grilla">${rel.map(D.card).join("")}</div></section>
      </div>`;

    $$(".miniaturas button").forEach(b => b.onclick = () => {
      $$(".miniaturas button").forEach(x => x.classList.remove("activa")); b.classList.add("activa");
      $("#foto-grande").src = src(b.dataset.foto);
    });
    $$(".color").forEach(b => b.onclick = () => { $$(".color").forEach(x => x.classList.remove("sel")); b.classList.add("sel"); });
    $$("[data-t]").forEach(b => b.onclick = () => { $$("[data-t]").forEach(x => x.classList.remove("sel")); b.classList.add("sel"); talle = b.dataset.t; });
    $$("[data-c]").forEach(b => b.onclick = () => { cant = Math.max(1, cant + +b.dataset.c); $("#cant").textContent = cant; });
    $("#agregar").onclick = () => {
      if (!talle) { aviso("Elegí un talle"); $(".talles").classList.add("sacudir"); setTimeout(() => $(".talles").classList.remove("sacudir"), 500); return; }
      agregar(p.id, talle, cant);
    };
    activarCards();
  }

  /* Botones "agregar rápido" de las tarjetas */
  function activarCards() {
    $$("[data-rapido]").forEach(b => b.onclick = e => { e.preventDefault(); agregar(b.dataset.rapido, conTalles() ? (T.talles[1] || T.talles[0]) : talleUnico()); });
  }

  function iniciar(D) {
    document.title = T.nombre + " — Tienda online";
    $("#cabecera").innerHTML = D.header();
    $("#pie").innerHTML = D.footer();
    const pag = document.body.dataset.pagina;
    if (pag === "inicio") { $("#principal").innerHTML = D.home(); D.despues && D.despues(); activarCards(); }
    if (pag === "categoria") paginaCategoria(D);
    if (pag === "producto") paginaProducto(D);
    paneles();
    // anuncios rotativos
    const an = $$(".anuncio-txt"); let k = 0;
    if (an.length > 1) setInterval(() => { an[k].classList.remove("on"); k = (k + 1) % an.length; an[k].classList.add("on"); }, 3500);
  }

  window.Motor = { T, ig, conTalles, talleUnico, src, plata, off, cuota, transf, prod, cat, lista, esc, ICO, logo, iniciar, aviso, agregar };
})();
