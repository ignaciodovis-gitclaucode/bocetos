/* DISEÑO MINIMAL — premium y sobrio: tipografía grande, mucho blanco,
   portada dividida, categorías como lista y un producto protagonista. */
(function () {
  const { T, ig, src, plata, off, cuota, lista, esc, ICO, logo, conTalles, talleUnico } = Motor;

  const card = p => `
    <a class="card" href="producto.html?id=${p.id}">
      <div class="card-foto">
        ${off(p) ? `<span class="etq">-${off(p)}%</span>` : p.etiqueta === "nuevo" ? `<span class="etq nuevo">Nuevo</span>` : ""}
        <img src="${src(p.img[0])}" alt="${esc(p.nombre)}" loading="lazy">
        ${p.img[1] ? `<img class="alt" src="${src(p.img[1])}" alt="" loading="lazy">` : ""}
        <button class="card-mas" data-rapido="${p.id}" aria-label="Agregar al carrito">+</button>
      </div>
      <div class="card-linea"><h3>${esc(p.nombre)}</h3><span class="card-precio">${plata(p.precio)}</span></div>
      <div class="card-cuotas">${off(p) ? `<s>${plata(p.antes)}</s> · ` : ""}${T.cuotas} cuotas de ${cuota(p)}</div>
    </a>`;

  const header = () => `
    <div class="anuncio">${T.anuncios.map((a, i) => `<div class="anuncio-txt ${i ? "" : "on"}">${esc(a)}</div>`).join("")}</div>
    <header class="cab">
      <div class="wrap cab-fila">
        <button class="ico-btn solo-movil-flex" data-abrir="menu" aria-label="Menú">${ICO.menu}</button>
        ${logo()}
        <nav class="cab-nav">
          ${T.categorias.slice(0, 4).map(c => `<a href="categoria.html?cat=${c.id}">${esc(c.nombreCorto || c.nombre)}</a>`).join("")}
          <a href="categoria.html?orden=ofertas" class="es-oferta">Ofertas</a>
        </nav>
        <div class="cab-der">
          <button class="ico-btn" data-abrir="buscar" aria-label="Buscar">${ICO.buscar}</button>
          <a class="ico-btn ocultar-movil" href="#" aria-label="Mi cuenta">${ICO.cuenta}</a>
          <button class="ico-btn" data-abrir="carrito" aria-label="Carrito">${ICO.bolsa}<span class="burbuja" data-cant-carrito hidden>0</span></button>
        </div>
      </div>
    </header>`;

  const footer = () => `
    <section class="news"><div class="wrap news-in">
      <h2>Novedades y ofertas,<br>primero para vos.</h2>
      <form onsubmit="event.preventDefault();Motor.aviso('¡Gracias por suscribirte!')"><input type="email" placeholder="Tu email" required><button aria-label="Suscribirme">${ICO.flecha}</button></form>
    </div></section>
    <footer class="pie"><div class="wrap">
      <div class="pie-cols">
        <div class="pie-marca">${logo()}<p>${esc(T.bajada)}</p><p>${esc(T.ciudad)}</p></div>
        <div><h4>Tienda</h4>${T.categorias.map(c => `<a href="categoria.html?cat=${c.id}">${esc(c.nombre)}</a>`).join("")}</div>
        <div><h4>Ayuda</h4><a href="#">Cómo comprar</a><a href="#">Envíos</a><a href="#">Cambios y devoluciones</a><a href="#">Contacto</a></div>
        <div><h4>Seguinos</h4><a ${ig()}>Instagram</a><a href="#">WhatsApp</a></div>
      </div>
      <div class="pie-legal"><span>© 2026 ${esc(T.nombre)}</span><span>Visa · Mastercard · Mercado Pago · Transferencia</span><span>Boceto de diseño · no es una tienda real</span></div>
    </div></footer>`;

  const home = () => {
    const h = T.hero;
    const dest = lista(T.novedades)[0] || T.productos[0];
    const estrella = lista(T.masVendidos)[0] || T.productos[1] || dest;
    return `
    <section class="hero"><div class="hero-in">
      <div class="hero-txt">
        <span class="sobre">${esc(h.tag)}</span>
        <h1>${esc(h.titulo)}</h1>
        <p>${esc(h.bajada)}</p>
        <div class="hero-links"><a class="btn" href="categoria.html">${esc(h.boton)}</a><a class="link" href="categoria.html?orden=ofertas">Ver ofertas ${ICO.flecha}</a></div>
      </div>
      <div class="hero-foto">
        <img src="${src(h.imagenes[0])}" alt="">
        <a class="hero-prod" href="producto.html?id=${dest.id}"><img src="${src(dest.img[0])}" alt=""><div><small>Destacado</small><b>${esc(dest.nombre)}</b><span>${plata(dest.precio)}</span></div></a>
      </div>
    </div></section>

    <div class="cinta"><div class="cinta-mov">${[0, 1].map(() => T.beneficios.map(b => `<span>${esc(b.titulo)} <i>·</i> ${esc(b.texto)}</span><span class="punto">✦</span>`).join("")).join("")}</div></div>

    <section class="seccion"><div class="wrap">
      <div class="tit-fila"><h2 class="tit-sec">Categorías</h2><a class="link" href="categoria.html">Ver todo ${ICO.flecha}</a></div>
      <div class="cat-lista">${T.categorias.map((c, i) => `
        <a class="cat-fila" href="categoria.html?cat=${c.id}">
          <span class="num">${String(i + 1).padStart(2, "0")}</span>
          <span class="nom">${esc(c.nombre)}</span>
          <span class="cant">${T.productos.filter(p => p.cat === c.id).length} productos</span>
          <img src="${src(c.img)}" alt="" loading="lazy">
          ${ICO.flecha}
        </a>`).join("")}</div>
    </div></section>

    <section class="seccion fondo-suave"><div class="wrap">
      <div class="tit-fila"><h2 class="tit-sec">Lo nuevo</h2>
        <div class="tabs"><button class="tab on" data-tab="novedades">Novedades</button><button class="tab" data-tab="masVendidos">Más vendidos</button></div></div>
      <div class="grilla" id="grilla-home">${lista(T.novedades).slice(0, 6).map(card).join("")}</div>
    </div></section>

    <section class="estrella"><div class="wrap estrella-in">
      <div class="estrella-foto"><img src="${src(estrella.img[0])}" alt="${esc(estrella.nombre)}" loading="lazy"></div>
      <div class="estrella-txt">
        <span class="sobre">El favorito de nuestros clientes</span>
        <h2>${esc(estrella.nombre)}</h2>
        <p>${esc(estrella.desc || T.descripcionGeneral)}</p>
        <div class="estrella-precio"><b>${plata(estrella.precio)}</b>${off(estrella) ? `<s>${plata(estrella.antes)}</s>` : ""}<small>${T.cuotas} cuotas de ${cuota(estrella)} sin interés</small></div>
        <div class="hero-links"><button class="btn" data-rapido="${estrella.id}">Agregar al carrito</button><a class="link" href="producto.html?id=${estrella.id}">Ver detalle ${ICO.flecha}</a></div>
      </div>
    </div></section>

    <section class="cita"><div class="wrap">
      <span class="sobre">${esc(T.historia.tag)}</span>
      <blockquote>${esc(T.historia.titulo)}</blockquote>
      <p>${esc(T.historia.texto)}</p>
    </div></section>`;
  };

  const despues = () => {
    const rapido = () => document.querySelectorAll("[data-rapido]").forEach(x => x.onclick = e => { e.preventDefault(); Motor.agregar(x.dataset.rapido, conTalles() ? (T.talles[1] || T.talles[0]) : talleUnico()); });
    document.querySelectorAll(".tab").forEach(b => b.onclick = () => {
      document.querySelectorAll(".tab").forEach(x => x.classList.remove("on")); b.classList.add("on");
      document.getElementById("grilla-home").innerHTML = lista(T[b.dataset.tab]).slice(0, 6).map(card).join("");
      rapido();
    });
    const cab = document.querySelector(".cab");
    addEventListener("scroll", () => cab.classList.toggle("scrolleado", scrollY > 20), { passive: true });
  };

  Motor.iniciar({ card, header, footer, home, despues });
})();
