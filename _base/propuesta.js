/* Página de presentación de la propuesta: muestra los dos diseños
   con la marca del prospecto, en vista de compu y de celular. */
(function () {
  const T = window.TIENDA;
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
    <footer class="pr-pie">Boceto de diseño · las imágenes y precios son de ejemplo</footer>`;
  document.querySelectorAll("[data-v]").forEach(b => b.onclick = () => {
    document.querySelectorAll("[data-v]").forEach(x => x.classList.remove("on")); b.classList.add("on");
    document.body.classList.toggle("cel", b.dataset.v === "cel");
    ajustar();
  });
  // escala las vistas previas al ancho de cada tarjeta
  function ajustar() {
    const cel = document.body.classList.contains("cel");
    document.querySelectorAll(".pr-iframe").forEach(c => {
      const f = c.firstElementChild, w = cel ? 375 : 1440, s = c.clientWidth / w;
      f.style.transform = `scale(${s})`;
      if (cel) f.style.height = (c.clientHeight / s) + "px"; else f.style.height = "";
    });
  }
  addEventListener("resize", ajustar);
  ajustar();
})();
