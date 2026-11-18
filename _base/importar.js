/* ==========================================================
   IMPORTADOR DE TIENDANUBE — lo usa importar.ps1
   node importar.js <url-tienda> <carpeta>
   Lee los productos públicos de la tienda (nombre, foto, descripción,
   precio y categorías), saca una captura de la portada actual para el
   "antes y después" y completa <carpeta>/datos.js.
   ========================================================== */
const fs = require("fs"), path = require("path"), { execFileSync } = require("child_process");

const [, , urlArg, carpeta] = process.argv;
if (!urlArg || !carpeta) { console.error("Uso: node importar.js <url-tienda> <carpeta>"); process.exit(1); }
const base = new URL(/^https?:/.test(urlArg) ? urlArg : "https://" + urlArg).origin;
const raiz = path.join(__dirname, "..");
const dir = path.join(raiz, carpeta);
const UA = { headers: { "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/140 Safari/537.36" } };
const espera = ms => new Promise(r => setTimeout(r, ms));

async function bajar(url) {
  const r = await fetch(url, UA);
  if (!r.ok) throw new Error(r.status + " " + url);
  return r.text();
}
const limpiar = s => String(s || "").replace(/&quot;/g, '"').replace(/&#0?39;/g, "'").replace(/&amp;/g, "&").replace(/\s+/g, " ").trim();
const slug = s => limpiar(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "").slice(0, 40);

// Productos desde los datos estructurados (schema.org) de cada listado
function productosDe(html) {
  const out = [];
  const re = /<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g;
  let m;
  while ((m = re.exec(html))) {
    let j; try { j = JSON.parse(m[1]); } catch (e) { continue; }
    for (const p of [].concat(j)) {
      if (!p || p["@type"] !== "Product") continue;
      const url = (p.offers && p.offers.url) || (p.mainEntityOfPage && p.mainEntityOfPage["@id"]) || "";
      const img = [].concat(p.image || [])[0] || "";
      out.push({
        url,
        nombre: limpiar(p.name),
        desc: /^Compr[aá] online/i.test(limpiar(p.description)) ? "" : limpiar(p.description),   // descripción automática de Tiendanube = vacía
        precio: Math.round(parseFloat((p.offers && p.offers.price) || 0)) || 0,
        img: img.replace(/-\d+-\d+\.(webp|jpg|jpeg|png)$/i, "-1024-1024.$1")
      });
    }
  }
  return out;
}

async function listado(url, max = 10) {
  const todos = [];
  for (let pag = 1; pag <= max; pag++) {
    const u = pag === 1 ? url : url.replace(/\/?$/, "/") + `page/${pag}/`;
    let html; try { html = await bajar(u); } catch (e) { break; }
    const ps = productosDe(html).filter(p => !todos.some(t => t.url === p.url));
    if (!ps.length) break;
    todos.push(...ps);
    await espera(400);
  }
  return todos;
}

// Categorías: links del menú que no son páginas fijas
function categoriasDe(html) {
  const fijas = /\/(productos|contacto|cuenta|account|carrito|cart|checkout|search|busqueda|novedades|ofertas|blog|pages?|politica|terminos|como-comprar|envios)\b|^\/$/i;
  const cats = [];
  const re = /<a[^>]+href="([^"#?]+)"[^>]*>([\s\S]*?)<\/a>/g;
  let m;
  while ((m = re.exec(html))) {
    let href = m[1];
    if (/^https?:/.test(href)) { if (!href.startsWith(base)) continue; href = href.slice(base.length); }
    if (!href.startsWith("/") || fijas.test(href) || href.split("/").filter(Boolean).length > 2) continue;
    const nombre = limpiar(m[2].replace(/<[^>]+>/g, ""));
    if (!nombre || nombre.length > 40 || cats.some(c => c.href === href)) continue;
    cats.push({ href, nombre });
  }
  return cats.slice(0, 8);
}

// Precio de ejemplo estable (la tienda puede no publicar precios)
const precioEjemplo = s => { let h = 0; for (const c of s) h = (h * 31 + c.charCodeAt(0)) >>> 0; return 9900 + (h % 9) * 5000; };

// Captura de la portada actual con Edge/Chrome en segundo plano
function captura(destino) {
  const navs = [
    path.join(process.env["ProgramFiles(x86)"] || "", "Microsoft/Edge/Application/msedge.exe"),
    path.join(process.env.ProgramFiles || "", "Microsoft/Edge/Application/msedge.exe"),
    path.join(process.env.ProgramFiles || "", "Google/Chrome/Application/chrome.exe")
  ].filter(f => fs.existsSync(f));
  if (!navs.length) return false;
  try {
    execFileSync(navs[0], ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1",
      "--window-size=1440,990", "--virtual-time-budget=8000", "--screenshot=" + destino, base + "/"], { stdio: "ignore", timeout: 60000 });
  } catch (e) { }
  return fs.existsSync(destino);
}

(async () => {
  console.log("Leyendo " + base + " ...");
  const portada = await bajar(base + "/");
  const nombreTienda = limpiar((portada.match(/<meta property="og:site_name" content="([^"]+)"/) || [])[1] || carpeta);

  let productos = await listado(base + "/productos/");
  if (!productos.length) productos = productosDe(portada);
  if (!productos.length) { console.error("No encontré productos públicos en esa tienda."); process.exit(1); }
  console.log(`  ${productos.length} productos`);

  // categorías del menú
  const cats = [];
  for (const c of categoriasDe(portada)) {
    const ps = await listado(base + c.href, 4);
    if (!ps.length) continue;
    cats.push({ id: slug(c.nombre), nombre: c.nombre, urls: ps.map(p => p.url) });
    await espera(300);
  }
  console.log(`  ${cats.length} categorías en el menú`);

  const usados = new Set();
  const lista = productos.map(p => {
    let id = slug(p.nombre) || "producto"; let n = 2;
    while (usados.has(id)) id = slug(p.nombre) + "-" + n++;
    usados.add(id);
    const cat = (cats.find(c => c.urls.includes(p.url)) || {}).id || "";
    return { ...p, id, cat, precioReal: p.precio > 0 };
  });
  if (!cats.length || lista.some(p => !p.cat)) {
    cats.push({ id: "todos", nombre: cats.length ? "Otros productos" : "Todos los productos" });
    lista.forEach(p => { if (!p.cat) p.cat = "todos"; });
  }
  const sinPrecio = lista.filter(p => !p.precioReal).length;

  // captura para antes y después
  fs.mkdirSync(path.join(dir, "img"), { recursive: true });
  const hayAntes = captura(path.join(dir, "img", "antes.jpg").replace(/\.jpg$/, ".png"));

  const q = s => JSON.stringify(s);
  const prods = lista.map((p, i) =>
    `    { id: ${q(p.id)}, nombre: ${q(p.nombre)}, cat: ${q(p.cat)}, precio: ${p.precioReal ? p.precio : precioEjemplo(p.id)}, antes: 0,${i < 4 ? ' etiqueta: "nuevo",' : ""}\n      img: [${q(p.img)}],\n      desc: ${q(p.desc)} }`).join(",\n");
  const ids = lista.map(p => p.id);
  const fotos = lista.map(p => p.img);
  const catsTxt = cats.map(c => `    { id: ${q(c.id)}, nombre: ${q(c.nombre)}, img: ${q((lista.find(p => p.cat === c.id) || lista[0]).img)} }`).join(",\n");
  const looks = cats.slice(0, 3).map(c => {
    const ps = lista.filter(p => p.cat === c.id).slice(0, 3);
    return `    { titulo: ${q("Combo " + c.nombre.toLowerCase())}, img: ${q(ps[0] ? ps[0].img : fotos[0])}, productos: ${q(ps.map(p => p.id))} }`;
  }).join(",\n");

  const datos = `/* ==========================================================
   DATOS — ${nombreTienda}
   Importado automáticamente de ${base}
   ${sinPrecio ? `ATENCIÓN: ${sinPrecio} productos sin precio publicado -> precio DE EJEMPLO.` : "Precios tomados de la tienda."}
   Revisá: textos de portada, colores (marca.css), logo, WhatsApp e Instagram.
   ========================================================== */
window.TIENDA = {
  nombre: ${q(nombreTienda)},
  bajada: "Tienda online",
  logo: "",                 // poné el logo en img/logo.png y escribí "img/logo.png"
  whatsapp: "5490000000000",
  instagram: "",
  instagramEjemplo: true,
  ciudad: "Argentina",
${hayAntes ? `
  antes: {
    img: "img/antes.png",
    url: ${q(base.replace(/^https?:\/\//, ""))},
    diseno: "catalogo",
    mejoras: [
      "Tus ${lista.length} productos visibles desde la portada, ordenados por categoría",
      "Tu logo y tus colores en toda la tienda",
      "Precios, cuotas y precio con transferencia a la vista",
      "Fotos grandes y descripciones claras en cada producto",
      "Botón de WhatsApp para que te consulten en un clic"
    ]
  },
` : ""}
  anuncios: [
    "Envíos a todo el país",
    "3 cuotas sin interés con todas las tarjetas",
    "10% OFF pagando por transferencia"
  ],
  cuotas: 3,
  descuentoTransferencia: 10,
  envioGratisDesde: 80000,

  hero: {
    tag: "Tienda online oficial",
    titulo: ${q("Todo " + nombreTienda + ", ahora online")},
    bajada: "Comprá desde tu casa con envío a todo el país y atención personalizada.",
    boton: "Ver productos",
    imagenes: ${q(fotos.slice(0, 3))}
  },

  beneficios: [
    { ico: "envio",   titulo: "Envíos a todo el país", texto: "Rápidos y seguros" },
    { ico: "tarjeta", titulo: "3 cuotas sin interés",   texto: "Con todas las tarjetas" },
    { ico: "cambio",  titulo: "Atención personalizada", texto: "Te asesoramos por WhatsApp" },
    { ico: "local",   titulo: "Retiro en el local",     texto: "Sin costo" }
  ],

  categorias: [
${catsTxt}
  ],

  productos: [
${prods}
  ],

  talles: [],
  descripcionGeneral: "Consultanos por WhatsApp por stock y formas de pago.",

  novedades:   ${q(ids.slice(0, 8))},
  masVendidos: ${q(ids.slice(8, 16).length >= 4 ? ids.slice(8, 16) : ids.slice().reverse().slice(0, 8))},

  historia: {
    tag: "Quiénes somos",
    titulo: ${q(nombreTienda + ": atención de verdad, también online")},
    texto: "Contá acá la historia del negocio: desde cuándo están, qué los diferencia y por qué elegirlos.",
    img: ${q(fotos[Math.min(3, fotos.length - 1)])}
  },

  looksTag: "Combos",
  looksTitulo: "Armá tu combo",
  looksTexto: "Combinaciones pensadas para vos, con todos los productos a un clic.",
  looks: [
${looks}
  ],

  instagramFotos: ${q(fotos.slice(0, 6))}
};
`;
  const destino = path.join(dir, "datos.js");
  const actual = fs.existsSync(destino) ? fs.readFileSync(destino, "utf8") : "";
  const esPlantilla = !actual || actual.includes("Producto destacado 1");
  const archivo = esPlantilla ? destino : path.join(dir, "datos-importados.js");
  fs.writeFileSync(archivo, datos);
  console.log(`  ${hayAntes ? "captura de la tienda actual guardada (img/antes.png)" : "no pude sacar la captura de la tienda actual"}`);
  console.log(`  ${sinPrecio ? sinPrecio + " productos sin precio: puse precios DE EJEMPLO" : "precios reales tomados de la tienda"}`);
  console.log(esPlantilla ? `Listo: ${carpeta}/datos.js completo.` : `Tu datos.js ya tenía contenido: lo importado quedó en ${carpeta}/datos-importados.js`);
})().catch(e => { console.error("Error: " + e.message); process.exit(1); });
