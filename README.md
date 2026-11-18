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

> Si mejorás algo en `_base/`, se aplica a todos los bocetos.
> Si cambia la estructura de las páginas, regenerá las de un cliente con `.\nuevo-boceto.ps1 ohlala -SoloPaginas`.

## Publicarlo gratis con GitHub Pages (una sola vez)

1. Creá una cuenta en github.com y un repositorio nuevo, por ejemplo `bocetos`.
2. Instalá **GitHub Desktop** (desktop.github.com). Elegí "Add existing repository", apuntá a esta carpeta y publicala.
3. En el repo, andá a **Settings → Pages → Branch: main / root → Save**.
4. En 1 o 2 minutos queda online en:
   `https://TU-USUARIO.github.io/bocetos/ohlala/`

Para cada prospecto nuevo: creás la carpeta, hacés **Commit** y **Push** en GitHub Desktop, y le mandás `https://TU-USUARIO.github.io/bocetos/nombre-carpeta/`.

**A tener en cuenta**
- Con el plan gratis, el repositorio de GitHub Pages tiene que ser **público**. Las páginas tienen `noindex` para que Google no las muestre, y la raíz no lista los bocetos. Igual, cualquiera que adivine la dirección puede verlos, así que no subas nada confidencial.
- **Alternativa sin GitHub:** en app.netlify.com/drop arrastrás la carpeta y te da un link al instante. Ojo: tiene que incluir `_base/` y la carpeta del cliente.
