/* DISEÑO CATÁLOGO — inspirado en plantillas tipo Amazonas:
   pensado para muchos productos, buscador protagonista, slider,
   categorías en círculos y varias vidrieras de productos. */
(function () {
  const { T, src, plata, off, cuota, transf, lista, esc, ICO, logo } = Motor;

  const card = p => `
    <a class="card" href="producto.html?id=${p.id}">
      <div class="card-foto">
        ${off(p) ? `<span class="etq">${off(p)}% OFF</span>` : p.etiqueta === "nuevo" ? `<span class="etq nuevo">Nuevo</span>` : ""}
        <span class="card-fav" onclick="event.preventDefault();this.classList.toggle('on')">${ICO.corazon}</span>
        <img src="${src(p.img[0])}" alt="${esc(p.nombre)}" loading="lazy">
        ${p.img[1] ? `<img class="alt" src="${src(p.img[1])}" alt="" loading="lazy">` : ""}
      </div>
      <div class="card-cuerpo">
        <h3>${esc(p.nombre)}</h3>
        <div class="card-precio"><span>${plata(p.precio)}</span>${off(p) ? `<s>${plata(p.antes)}</s>` : ""}</div>
        <div class="card-cuotas"><b>${T.cuotas} x ${cuota(p)}</b> sin interés</div>
        <div class="card-transf">${transf(p)} con transferencia</div>
        <button class="card-btn" data-rapido="${p.id}">${ICO.bolsa} Comprar</button>
      </div>
    </a>`;

  const vidriera = (titulo, prods, link) => `
    <section class="vidriera"><div class="wrap">
      <div class="v-cab"><h2>${titulo}</h2><a href="${link}">Ver todos ${ICO.flecha}</a></div>
      <div class="carrusel"><button class="flecha izq" aria-label="Anterior">${ICO.flecha}</button>
        <div class="carril">${prods.map(card).join("")}</div>
        <button class="flecha der" aria-label="Siguiente">${ICO.flecha}</button></div>
    </div></section>`;

  const header = () => `
    <div class="topbar"><div class="wrap topbar-in">
      <div class="anuncio">${T.anuncios.map((a, i) => `<div class="anuncio-txt ${i ? "" : "on"}">${esc(a)}</div>`).join("")}</div>
      <div class="topbar-links"><a href="#">Cómo comprar</a><a href="#">Envíos</a><a href="#">Contacto</a></div>
    </div></div>
    <header class="cab">
      <div class="wrap cab-fila">
        <button class="ico-btn solo-movil-flex" data-abrir="menu" aria-label="Menú">${ICO.menu}</button>
        ${logo()}
        <form class="cab-buscar" onsubmit="event.preventDefault();location.href='categoria.html?q='+encodeURIComponent(this.q.value)">
          <input name="q" placeholder="Buscá ${esc(T.categorias.slice(0, 3).map(c => c.nombre.split(" ")[0].toLowerCase()).join(", "))}…" autocomplete="off"><button aria-label="Buscar">${ICO.buscar}</button>
        </form>
        <div class="cab-der">
          <button class="ico-btn solo-movil-flex" data-abrir="buscar" aria-label="Buscar">${ICO.buscar}</button>
          <a class="cab-acc ocultar-movil" href="#">${ICO.cuenta}<span><small>Hola!</small>Mi cuenta</span></a>
          <button class="cab-acc" data-abrir="carrito">${ICO.bolsa}<span class="burbuja" data-cant-carrito hidden>0</span><span class="ocultar-movil"><small>Mi</small>Carrito</span></button>
        </div>
      </div>
      <nav class="cab-nav"><div class="wrap">
        <a href="categoria.html">Todo</a>
        ${T.categorias.map(c => `<a href="categoria.html?cat=${c.id}">${esc(c.nombre)}</a>`).join("")}
        <a href="categoria.html?orden=ofertas" class="es-oferta">% Ofertas</a>
      </div></nav>
    </header>`;

  const footer = () => `
    <div class="benef-barra"><div class="wrap benef-fila">
      ${T.beneficios.map(b => `<div class="benef">${ICO[b.ico] || ""}<div><b>${esc(b.titulo)}</b><small>${esc(b.texto)}</small></div></div>`).join("")}
    </div></div>
    <section class="news"><div class="wrap news-in">
      <div class="news-txt">${ICO.corazon}<div><h2>Recibí ofertas exclusivas</h2><p>Suscribite y obtené 10% OFF en tu primera compra.</p></div></div>
      <form onsubmit="event.preventDefault();Motor.aviso('¡Gracias por suscribirte!')"><input type="email" placeholder="Ingresá tu email" required><button class="btn">Suscribirme</button></form>
    </div></section>
    <footer class="pie">
      <div class="wrap pie-cols">
        <div class="pie-marca">${logo()}<p>${esc(T.bajada)} · ${esc(T.ciudad)}</p>
          <div class="pie-redes"><a href="#">${ICO.ig}</a><a href="#">${ICO.wsp}</a></div></div>
        <div><h4>Categorías</h4>${T.categorias.map(c => `<a href="categoria.html?cat=${c.id}">${esc(c.nombre)}</a>`).join("")}</div>
        <div><h4>Información</h4><a href="#">Cómo comprar</a><a href="#">Envíos</a><a href="#">Cambios y devoluciones</a><a href="#">Preguntas frecuentes</a><a href="#">Botón de arrepentimiento</a></div>
        <div><h4>Contacto</h4><a href="#">${ICO.wsp} WhatsApp</a><a href="#">${ICO.ig} @${esc(T.instagram)}</a><a href="#">${ICO.local} ${esc(T.ciudad)}</a></div>
        <div><h4>Medios de pago</h4><div class="pagos"><span>VISA</span><span>MASTER</span><span>AMEX</span><span>MERCADO PAGO</span><span>TRANSFERENCIA</span></div></div>
      </div>
      <div class="pie-legal"><div class="wrap"><span>© 2026 ${esc(T.nombre)} · Todos los derechos reservados</span><span>Boceto de diseño · no es una tienda real</span></div></div>
    </footer>`;

  const home = () => {
    const h = T.hero;
    // Todo se arma solo a partir de datos.js
    const ofertas = T.productos.filter(off).length ? T.productos.filter(off) : T.productos;
    const maxOff = Math.max(0, ...T.productos.map(off));
    const c1 = T.categorias[0], c2 = T.categorias[1] || c1;
    const deCat = c => T.productos.filter(p => p.cat === c.id);
    const foto = (arr, i) => (arr[i] || arr[0] || {}).img?.[0] || "";
    const slides = [
      { tag: h.tag, tit: h.titulo, txt: h.bajada, btn: h.boton, link: "categoria.html", imgs: h.imagenes.slice(0, 2), clase: "s-oscuro" },
      { tag: maxOff ? "Hasta " + maxOff + "% OFF" : "Precios especiales", tit: "Sale de temporada", txt: "Descuentos especiales en una selección de productos, por tiempo limitado.", btn: "Ver ofertas", link: "categoria.html?orden=ofertas", imgs: [foto(ofertas, 0), foto(ofertas, 1)], clase: "s-oferta" },
      { tag: "Nuevos ingresos", tit: c1.nombre, txt: "Descubrí lo último que llegó a la tienda.", btn: "Ver " + c1.nombre.split(" ")[0].toLowerCase(), link: "categoria.html?cat=" + c1.id, imgs: [foto(deCat(c1), 0), foto(deCat(c1), 1)], clase: "s-suave" }
    ];
    return `
    <section class="slider">
      <div class="slides">${slides.map((s, i) => `
        <div class="slide ${s.clase} ${i ? "" : "on"}">
          <div class="wrap slide-in">
            <div class="slide-txt"><span class="s-tag">${esc(s.tag)}</span><h1>${esc(s.tit)}</h1><p>${esc(s.txt)}</p><a class="btn" href="${s.link}">${esc(s.btn)} ${ICO.flecha}</a></div>
            <div class="slide-fotos">${s.imgs.map(f => `<div><img src="${src(f)}" alt=""></div>`).join("")}</div>
          </div>
        </div>`).join("")}</div>
      <div class="puntos">${slides.map((_, i) => `<button class="${i ? "" : "on"}" data-s="${i}" aria-label="Slide ${i + 1}"></button>`).join("")}</div>
    </section>

    <section class="circulos"><div class="wrap circ-fila">
      ${T.categorias.map(c => `<a class="circ" href="categoria.html?cat=${c.id}"><div><img src="${src(c.img)}" alt="" loading="lazy"></div><span>${esc(c.nombre)}</span></a>`).join("")}
    </div></section>

    ${vidriera("Nuevos ingresos", lista(T.novedades), "categoria.html")}

    <section class="promos"><div class="wrap promos-in">
      <a class="promo p1" href="categoria.html?cat=${c2.id}"><img src="${src(foto(deCat(c2), 0) || c2.img)}" alt=""><div><small>Colección</small><h3>${esc(c2.nombre)}</h3><span>Comprar ${ICO.flecha}</span></div></a>
      <a class="promo p2" href="categoria.html?orden=ofertas"><img src="${src(foto(ofertas, 2))}" alt=""><div><small>Solo por esta semana</small><h3>${maxOff ? "Hasta " + maxOff + "% OFF" : "Ofertas"} en productos seleccionados</h3><span>Comprar ${ICO.flecha}</span></div></a>
    </div></section>

    ${vidriera("Los más vendidos", lista(T.masVendidos), "categoria.html")}

    <section class="vidriera"><div class="wrap">
      <div class="v-cab"><h2>${esc(c1.nombre)}</h2><a href="categoria.html?cat=${c1.id}">Ver todos ${ICO.flecha}</a></div>
      <div class="grilla">${(deCat(c1).length >= 4 ? deCat(c1) : T.productos).slice(0, 8).map(card).join("")}</div>
    </div></section>

    <section class="insta-banda"><div class="wrap insta-in">
      <div class="insta-txt">${ICO.ig}<h2>@${esc(T.instagram)}</h2><p>Seguinos para ver los ingresos antes que nadie.</p><a class="btn borde" href="#">Seguir</a></div>
      <div class="insta-fotos">${T.instagramFotos.slice(0, 4).map(f => `<img src="${src(f)}" alt="" loading="lazy">`).join("")}</div>
    </div></section>`;
  };

  const despues = () => {
    // slider
    const s = [...document.querySelectorAll(".slide")], pts = [...document.querySelectorAll(".puntos button")];
    let k = 0;
    const ir = n => { s[k].classList.remove("on"); pts[k].classList.remove("on"); k = (n + s.length) % s.length; s[k].classList.add("on"); pts[k].classList.add("on"); };
    pts.forEach(b => b.onclick = () => { ir(+b.dataset.s); clearInterval(t); });
    let t = setInterval(() => ir(k + 1), 5500);
    // carruseles
    document.querySelectorAll(".carrusel").forEach(c => {
      const carril = c.querySelector(".carril");
      c.querySelector(".izq").onclick = () => carril.scrollBy({ left: -carril.clientWidth * .8, behavior: "smooth" });
      c.querySelector(".der").onclick = () => carril.scrollBy({ left: carril.clientWidth * .8, behavior: "smooth" });
    });
  };

  Motor.iniciar({ card, header, footer, home, despues });
})();
