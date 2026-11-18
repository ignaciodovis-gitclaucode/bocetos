/* DISEÑO EDITORIAL — inspirado en las plantillas de moda tipo Atlántico / Patagonia:
   fotos grandes, mucho aire, tipografía serif y estética de revista. */
(function () {
  const { T, ig, src, plata, off, cuota, lista, esc, ICO, logo } = Motor;

  const card = p => `
    <a class="card" href="producto.html?id=${p.id}">
      <div class="card-foto">
        ${off(p) ? `<span class="etq">-${off(p)}%</span>` : p.etiqueta === "nuevo" ? `<span class="etq nuevo">Nuevo</span>` : ""}
        <img src="${src(p.img[0])}" alt="${esc(p.nombre)}" loading="lazy">
        ${p.img[1] ? `<img class="alt" src="${src(p.img[1])}" alt="" loading="lazy">` : ""}
        <button class="card-rapido" data-rapido="${p.id}">Agregar al carrito</button>
      </div>
      <h3>${esc(p.nombre)}</h3>
      <div class="card-precio"><span>${plata(p.precio)}</span>${off(p) ? `<s>${plata(p.antes)}</s>` : ""}</div>
      <div class="card-cuotas">${T.cuotas} x ${cuota(p)} sin interés</div>
    </a>`;

  const header = () => `
    <div class="anuncio">${T.anuncios.map((a, i) => `<div class="anuncio-txt ${i ? "" : "on"}">${esc(a)}</div>`).join("")}</div>
    <header class="cab">
      <div class="wrap cab-fila">
        <div class="cab-izq">
          <button class="ico-btn solo-movil-flex" data-abrir="menu" aria-label="Menú">${ICO.menu}</button>
          <nav class="cab-nav">
            <a href="categoria.html">Tienda</a>
            ${T.categorias.slice(0, 2).map(c => `<a href="categoria.html?cat=${c.id}">${esc(c.nombreCorto || c.nombre.split(" ")[0])}</a>`).join("")}
            <a href="categoria.html?orden=ofertas" class="es-oferta">Sale</a>
          </nav>
        </div>
        ${logo()}
        <div class="cab-der">
          <button class="ico-btn" data-abrir="buscar" aria-label="Buscar">${ICO.buscar}</button>
          <a class="ico-btn ocultar-movil" href="#" aria-label="Mi cuenta">${ICO.cuenta}</a>
          <button class="ico-btn" data-abrir="carrito" aria-label="Carrito">${ICO.bolsa}<span class="burbuja" data-cant-carrito hidden>0</span></button>
        </div>
      </div>
    </header>`;

  const footer = () => `
    <section class="news">
      <div class="wrap news-in">
        <div><span class="sobre">Newsletter</span><h2>Sumate al club ${esc(T.nombre)}</h2><p>Enterate primero de los ingresos y llevate 10% OFF en tu primera compra.</p></div>
        <form onsubmit="event.preventDefault();Motor.aviso('¡Gracias por sumarte!')"><input type="email" placeholder="Tu email" required><button class="btn claro">Suscribirme</button></form>
      </div>
    </section>
    <footer class="pie">
      <div class="wrap pie-cols">
        <div class="pie-marca">
          <div class="pie-logo">${esc(T.nombre)}</div>
          <p>${esc(T.bajada)} · ${esc(T.ciudad)}</p>
          <div class="pie-redes"><a ${ig()} aria-label="Instagram">${ICO.ig}</a><a href="#" aria-label="WhatsApp">${ICO.wsp}</a></div>
        </div>
        <div><h4>Tienda</h4>${T.categorias.map(c => `<a href="categoria.html?cat=${c.id}">${esc(c.nombre)}</a>`).join("")}</div>
        <div><h4>Ayuda</h4><a href="#">Cómo comprar</a><a href="#">Envíos</a><a href="#">Cambios y devoluciones</a><a href="#">Guía de talles</a><a href="#">Contacto</a></div>
        <div><h4>Medios de pago</h4><div class="pagos"><span>Visa</span><span>Mastercard</span><span>Amex</span><span>Mercado Pago</span><span>Transferencia</span></div>
          <h4 style="margin-top:22px">Envíos</h4><div class="pagos"><span>Correo Argentino</span><span>Andreani</span><span>Retiro en local</span></div></div>
      </div>
      <div class="wrap pie-legal"><span>© 2026 ${esc(T.nombre)}</span><span>Boceto de diseño · no es una tienda real</span></div>
    </footer>`;

  const home = () => {
    const h = T.hero;
    return `
    <section class="hero">
      <div class="hero-fotos">${h.imagenes.map((f, i) => `<div class="hero-foto" style="--d:${i * .15}s"><img src="${src(f)}" alt=""></div>`).join("")}</div>
      <div class="hero-texto">
        <span class="sobre">${esc(h.tag)}</span>
        <h1>${esc(h.titulo)}</h1>
        <p>${esc(h.bajada)}</p>
        <a class="btn claro" href="categoria.html">${esc(h.boton)}</a>
      </div>
    </section>

    <div class="beneficios"><div class="wrap benef-fila">
      ${T.beneficios.map(b => `<div class="benef">${ICO[b.ico] || ""}<div><b>${esc(b.titulo)}</b><small>${esc(b.texto)}</small></div></div>`).join("")}
    </div></div>

    <section class="seccion"><div class="wrap">
      <div class="tit-fila"><div><span class="sobre">Categorías</span><h2 class="tit-sec">Comprá por categoría</h2></div><a class="link-flecha" href="categoria.html">Ver todo ${ICO.flecha}</a></div>
      <div class="cats">${T.categorias.slice(0, 4).map(c => `
        <a class="cat" href="categoria.html?cat=${c.id}"><div class="cat-foto"><img src="${src(c.img)}" alt="" loading="lazy"></div><span>${esc(c.nombre)} ${ICO.flecha}</span></a>`).join("")}</div>
    </div></section>

    <section class="seccion fondo-suave"><div class="wrap">
      <div class="tit-fila"><div><span class="sobre">Recién llegados</span><h2 class="tit-sec">Novedades de la semana</h2></div>
        <div class="tabs"><button class="tab on" data-tab="novedades">Novedades</button><button class="tab" data-tab="masVendidos">Más vendidos</button></div></div>
      <div class="grilla" id="grilla-home">${lista(T.novedades).map(card).join("")}</div>
    </div></section>

    <section class="historia">
      <div class="historia-foto"><img src="${src(T.historia.img)}" alt="" loading="lazy"></div>
      <div class="historia-texto">
        <span class="sobre">${esc(T.historia.tag)}</span>
        <h2>${esc(T.historia.titulo)}</h2>
        <p>${esc(T.historia.texto)}</p>
        <a class="btn borde" href="#">Conocé el local</a>
      </div>
    </section>

    <section class="seccion"><div class="wrap">
      <div class="tit-centro"><span class="sobre">${esc(T.looksTag || "Lookbook")}</span><h2 class="tit-sec">${esc(T.looksTitulo || "Armá tu look")}</h2><p>${esc(T.looksTexto || "Combinaciones listas para copiar, con todas las prendas en un clic.")}</p></div>
      <div class="looks">${T.looks.map(l => `
        <div class="look"><div class="look-foto"><img src="${src(l.img)}" alt="" loading="lazy"></div>
          <div class="look-info"><h3>${esc(l.titulo)}</h3>
            ${lista(l.productos).map(p => `<a href="producto.html?id=${p.id}"><span>${esc(p.nombre)}</span><b>${plata(p.precio)}</b></a>`).join("")}
          </div></div>`).join("")}</div>
    </div></section>

    <section class="insta">
      <div class="tit-centro"><span class="sobre">Seguinos</span><h2 class="tit-sec">@${esc(T.instagram)}</h2></div>
      <div class="insta-fila">${T.instagramFotos.map(f => `<a ${ig()}><img src="${src(f)}" alt="" loading="lazy">${ICO.ig}</a>`).join("")}</div>
    </section>`;
  };

  const despues = () => {
    document.querySelectorAll(".tab").forEach(b => b.onclick = () => {
      document.querySelectorAll(".tab").forEach(x => x.classList.remove("on")); b.classList.add("on");
      document.getElementById("grilla-home").innerHTML = lista(T[b.dataset.tab]).map(card).join("");
      document.querySelectorAll("[data-rapido]").forEach(x => x.onclick = e => { e.preventDefault(); Motor.agregar(x.dataset.rapido, Motor.conTalles() ? (T.talles[1] || T.talles[0]) : Motor.talleUnico()); });
    });
    // header con sombra al scrollear
    const cab = document.querySelector(".cab");
    addEventListener("scroll", () => cab.classList.toggle("scrolleado", scrollY > 20), { passive: true });
  };

  Motor.iniciar({ card, header, footer, home, despues });
})();
