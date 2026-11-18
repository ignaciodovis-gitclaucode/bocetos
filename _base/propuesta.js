/* Página de presentación de la propuesta: muestra los dos diseños
   con la marca del prospecto, en vista de compu y de celular. */
(function () {
  const T = window.TIENDA;
  const A = window.AGENCIA || {};
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
  document.title = "Propuesta de tienda online — " + T.nombre;
  const opciones = [
    { id: "editorial", letra: "A", nombre: "Editorial", txt: "Fotos grandes, mucho aire y estética de revista. Ideal para transmitir marca y estilo." },
    { id: "catalogo", letra: "B", nombre: "Catálogo", txt: "Pensado para vender mucho producto: buscador protagonista, vidrieras y ofertas a la vista." }
  ];
  document.getElementById("app").innerHTML = `
    <header class="pr-cab">
      ${T.logo ? `<img class="pr-logo" src="${T.logo}" alt="${esc(T.nombre)}">` : `<div class="pr-nombre">${esc(T.nombre)}</div>`}
      <span class="pr-sobre">Propuesta de tienda online</span>
      <h1>Así podría verse la tienda de ${esc(T.nombre)}</h1>
      <p>Te preparamos dos estilos de diseño con tu marca, tus colores y tus productos. Entrá a cada uno y navegalo como si fuera la tienda real: categorías, fichas de producto y carrito.</p>
      <div class="pr-vista"><button class="on" data-v="pc">Vista compu</button><button data-v="cel">Vista celular</button></div>
    </header>
    <main class="pr-opciones">${opciones.map(o => `
      <article class="pr-op">
        <div class="pr-marco"><div class="pr-barra"><i></i><i></i><i></i></div><div class="pr-iframe"><iframe src="${o.id}/index.html" tabindex="-1" title="Opción ${o.letra}"></iframe></div></div>
        <div class="pr-info"><span class="pr-letra">Opción ${o.letra}</span><h2>${o.nombre}</h2><p>${o.txt}</p>
          <a class="pr-btn" href="${o.id}/index.html">Ver diseño completo →</a></div>
      </article>`).join("")}</main>
    ${antesDespues()}
    ${cierre()}
    <footer class="pr-pie">Boceto de diseño${A.nombre ? " por " + esc(A.nombre) : ""} · las imágenes y precios son de ejemplo</footer>`;

  // Antes y después: solo aparece si datos.js tiene "antes" (prospectos que ya tienen tienda)
  function antesDespues() {
    const B = T.antes; if (!B || !B.img) return "";
    const ok = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg>';
    return `
    <section class="pr-ad">
      <span class="pr-sobre">Antes y después</span>
      <h2>De la tienda de hoy a la tienda que se merece ${esc(T.nombre)}</h2>
      <div class="pr-ad-grid">
        <figure class="pr-ad-col antes">
          <figcaption><span class="pr-ad-etq">Hoy</span>${B.url ? esc(B.url) : "Tienda actual"}</figcaption>
          <div class="pr-ad-marco"><div class="pr-barra"><i></i><i></i><i></i></div><img src="${esc(B.img)}" alt="Tienda actual de ${esc(T.nombre)}"></div>
        </figure>
        <figure class="pr-ad-col despues">
          <figcaption><span class="pr-ad-etq">Con la propuesta</span>Opción ${esc(B.diseno === "editorial" ? "A · Editorial" : "B · Catálogo")}</figcaption>
          <div class="pr-ad-marco"><div class="pr-barra"><i></i><i></i><i></i></div><div class="pr-iframe"><iframe src="${B.diseno === "editorial" ? "editorial" : "catalogo"}/index.html" tabindex="-1" title="Diseño propuesto"></iframe></div></div>
        </figure>
      </div>
      ${(B.mejoras || []).length ? `<div class="pr-grid pr-ad-mejoras">${B.mejoras.map(m => `<div class="pr-item">${ok}<div><p>${esc(m)}</p></div></div>`).join("")}</div>` : ""}
    </section>`;
  }

  // Cierre: qué incluye, cómo seguimos y botón a TU WhatsApp (datos en _base/agencia.js)
  function cierre() {
    const ok = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.5 4.5L19 7"/></svg>';
    const msj = (A.mensaje || "").replace("{marca}", T.nombre);
    const wsp = A.whatsapp ? `https://wa.me/${A.whatsapp}?text=${encodeURIComponent(msj)}` : "";
    return `
    <section class="pr-incluye">
      <span class="pr-sobre">Qué incluye</span>
      <h2>Todo lo que necesitás para empezar a vender</h2>
      <div class="pr-grid">${(A.incluye || []).map(i => `
        <div class="pr-item">${ok}<div><b>${esc(i.titulo)}</b><p>${esc(i.texto)}</p></div></div>`).join("")}</div>
    </section>
    <section class="pr-pasos">
      <span class="pr-sobre">Cómo seguimos</span>
      <h2>De esta propuesta a tu tienda funcionando</h2>
      <ol>${(A.pasos || []).map((p, i) => `<li><span>${i + 1}</span>${esc(p)}</li>`).join("")}</ol>
      ${A.plazo ? `<p class="pr-plazo">${esc(A.plazo)}</p>` : ""}
    </section>
    <section class="pr-cta">
      <h2>¿Te imaginás vendiendo con esta tienda?</h2>
      <p>Elegí la opción que más te guste y la ponemos en marcha. Sin compromiso: te respondemos todas las dudas.</p>
      <a class="pr-cta-btn" data-goatcounter-click="quiero-mi-tienda-${esc(location.pathname.split("/").filter(Boolean).slice(-1)[0] || "propuesta")}" data-goatcounter-title="Clic en Quiero mi tienda: ${esc(T.nombre)}" ${wsp ? `href="${wsp}" target="_blank" rel="noopener"` : `href="#" onclick="alert('Falta cargar tu número de WhatsApp en _base/agencia.js');return false"`}>
        <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.1c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.1-4.7-4-4.9-4.2-.1-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.3.8-.3h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.4 0 .5l-.4.6-.4.4c-.1.2-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.3 2.4 1.5.3.1.5.1.6-.1l.9-1.1c.2-.3.4-.2.7-.1l2 1c.3.1.5.2.6.3 0 .2 0 .8-.2 1.3Z"/></svg>
        Quiero mi tienda
      </a>
    </section>`;
  }
  document.querySelectorAll("[data-v]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-v]").forEach(x => x.classList.remove("on")); b.classList.add("on");
    document.body.classList.toggle("cel", b.dataset.v === "cel");
    ajustar();
  });
  // escala las vistas previas al ancho de cada tarjeta
  function ajustar() {
    const cel = document.body.classList.contains("cel");
    document.querySelectorAll(".pr-iframe").forEach(c => {
      const fijo = !!c.closest(".pr-ad");            // el antes/después siempre en vista compu
      const f = c.firstElementChild, w = cel && !fijo ? 375 : 1440, s = c.clientWidth / w;
      f.style.transform = `scale(${s})`;
      if (cel && !fijo) f.style.height = (c.clientHeight / s) + "px"; else f.style.height = "";
    });
  }
  addEventListener("resize", ajustar);
  ajustar();
})();
