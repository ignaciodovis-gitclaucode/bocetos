# Bocetos de tiendas online para prospectos

Sistema para armar en minutos un boceto navegable de tienda online con la marca de cada prospecto, y mandarle un link.
Son 100% HTML, CSS y JS estáticos: no necesitan servidor, base de datos ni costo de hosting.

## Qué hay en cada boceto

Cada prospecto tiene **una página de propuesta** con **dos diseños** para elegir:

| Opción | Diseño | Inspirado en | Ideal para |
|---|---|---|---|
| A | **Editorial** | Atlántico / Patagonia de Tiendanube | Moda, deco y marcas con buenas fotos |
| B | **Catálogo** | Amazonas de Tiendanube | Muchos productos, ofertas y mayoristas |

Cada diseño tiene inicio, categoría con filtros, ficha de producto y carrito que funciona. Todo se ve bien en compu y en celular.

## Estructura

```
bocetos-tiendanube/
├── _base/                ← código de los diseños (compartido, no se toca por cliente)
│   ├── motor.js / .css     carrito, filtros, ficha de producto
│   ├── editorial/          diseño A
│   ├── catalogo/           diseño B
│   ├── propuesta.*         página de presentación
│   └── nuevo/              plantilla vacía para prospectos nuevos
├── ohlala/               ← un boceto = una carpeta
│   ├── index.html          PROPUESTA (este es el link que se manda)
│   ├── datos.js            textos, categorías, productos y precios
│   ├── marca.css           colores y tipografías
│   ├── img/                logo y fotos
│   ├── editorial/          opción A
│   └── catalogo/           opción B
└── nuevo-boceto.ps1      ← crea la carpeta de un prospecto nuevo
```

## Tu servicio y el cierre de la propuesta

Al final de cada propuesta aparece **"Qué incluye"**, **"Cómo seguimos"** y el botón verde **"Quiero mi tienda"**, que abre un WhatsApp hacia vos con un mensaje ya escrito.
Todo eso se edita **una sola vez** en `_base/agencia.js`: tu número de WhatsApp, tu nombre, qué incluye tu servicio, los pasos y el plazo.
Hasta que cargues tu número, el botón avisa que falta.

## Antes y después (prospectos que ya tienen tienda)

Si el prospecto ya tiene una tienda (aunque sea fea), sacale una captura de pantalla, guardala como `img/antes.jpg` en su carpeta y completá el bloque `antes` en su `datos.js` (está comentado en la plantilla; ejemplo real en `farmaciakogel/datos.js`).
La propuesta muestra su tienda de hoy al lado del diseño nuevo, más la lista de mejoras. Si no completás `antes`, la sección no aparece.

## Saber si abrieron la propuesta

Usa **GoatCounter** (gratis, sin cookies). Una sola vez:
1. Creá una cuenta en https://www.goatcounter.com (elegí un código, por ej. `bocetos-ignacio`).
2. Poné ese código en `_base/agencia.js` → `goatcounter: "bocetos-ignacio"` y subí los cambios.
3. Abrí una vez `.../farmaciakogel/?yo` en cada navegador o celular que uses: así tus propias visitas no cuentan (`?noyo` lo deshace).

En el panel de GoatCounter vas a ver las visitas por cliente (por ej. `/bocetos/farmaciakogel/`), qué diseño miraron y los clics en "Quiero mi tienda".
## Vista previa al compartir por WhatsApp

El script genera para cada cliente `vista-previa.jpg` (con su logo y colores) y las etiquetas que leen WhatsApp, Instagram y Facebook.
Si cambiás el logo, el nombre o los colores de un cliente, regenerá con `.\nuevo-boceto.ps1 cliente -SoloPaginas` y subí los cambios.
WhatsApp guarda la vista previa un tiempo: si mandaste el link antes de un cambio, puede tardar en actualizarse.
## Crear un boceto nuevo (unos 20 minutos)

1. En esta carpeta, abrí PowerShell (clic derecho → "Abrir en Terminal") y corré:
   ```
   .\nuevo-boceto.ps1 la-esquina "La Esquina Deco"
   ```
   *(Si Windows no te deja ejecutar el script, corré una sola vez: `Set-ExecutionPolicy -Scope CurrentUser RemoteSigned`)*
2. **Fotos:** poné el logo y de 10 a 20 fotos en `la-esquina/img/`. Pueden salir de su Instagram o de su web actual. Achicalas a ~1000 px (por ejemplo con squoosh.app) para que carguen rápido.
3. **Colores:** en `marca.css`, cambiá los 3 o 4 colores principales sacados del logo.
4. **Contenido:** en `datos.js`, completá el nombre, las categorías y los productos con su foto y su precio. Usá `ohlala/datos.js` como ejemplo.
5. Abrí `la-esquina/index.html` con doble clic para verlo.

**Tips para rubros que no son ropa** (ver `tonicshop/datos.js` como ejemplo):
- `talles: []` oculta la elección de talle (electrónica, hogar, etc.).
- Las fotos pueden ser archivos propios (`"img/foto.jpg"`) o fotos libres de Unsplash pegando su dirección (`"https://images.unsplash.com/photo-..."`).
- `looksTag`, `looksTitulo` y `looksTexto` cambian los textos de la sección de combos del diseño Editorial.
- Para marcas oscuras, en `marca.css` están `--c-detalle`, `--c-sobre-oscuro`, `--c-promo` y `--c-fondo-2`.

> Si mejorás algo en `_base/`, se aplica a todos los bocetos.
> Si cambia la estructura de las páginas, regenerá las de un cliente con `.\nuevo-boceto.ps1 ohlala -SoloPaginas`.

## Ya publicado

- Repositorio: https://github.com/ignaciodovis-gitclaucode/bocetos
- Propuesta Oh Lala: https://ignaciodovis-gitclaucode.github.io/bocetos/ohlala/
- Propuesta Tonic Shop: https://ignaciodovis-gitclaucode.github.io/bocetos/tonicshop/
- Propuesta Farmacia Kogel: https://ignaciodovis-gitclaucode.github.io/bocetos/farmaciakogel/
- Estadísticas de visitas: https://bocetos-propuestas.goatcounter.com

Para subir un boceto nuevo o cambios (desde esta carpeta, en PowerShell):
```
git add -A
git commit -m "Boceto la-esquina"
git push
```
En 1 o 2 minutos se actualiza el link. **No borres el archivo `.nojekyll`**: sin él, GitHub no publica la carpeta `_base` y los bocetos se ven rotos.

## Publicarlo gratis con GitHub Pages (cómo se configuró)

1. Creá una cuenta en github.com y un repositorio nuevo, por ejemplo `bocetos`.
2. Instalá **GitHub Desktop** (desktop.github.com). Elegí "Add existing repository", apuntá a esta carpeta y publicala.
3. En el repo, andá a **Settings → Pages → Branch: main / root → Save**.
4. En 1 o 2 minutos queda online en:
   `https://TU-USUARIO.github.io/bocetos/ohlala/`

Para cada prospecto nuevo: creás la carpeta, hacés **Commit** y **Push** en GitHub Desktop, y le mandás `https://TU-USUARIO.github.io/bocetos/nombre-carpeta/`.

**A tener en cuenta**
- Con el plan gratis, el repositorio de GitHub Pages tiene que ser **público**. Las páginas tienen `noindex` para que Google no las muestre, y la raíz no lista los bocetos. Igual, cualquiera que adivine la dirección puede verlos, así que no subas nada confidencial.
- **Alternativa sin GitHub:** en app.netlify.com/drop arrastrás la carpeta y te da un link al instante. Ojo: tiene que incluir `_base/` y la carpeta del cliente.
