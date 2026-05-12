# mpm studio — Landing Page
## Especificación de Proyecto

---

## Stack
- HTML5 + CSS puro + JS vanilla
- Sin frameworks, sin librerías externas
- Un solo archivo `index.html` + `style.css` + `script.js`
- Fuentes: Google Fonts (Playfair Display + Syne)
- Deploy: Cloudflare Pages → dominio mpm.social

---

## Paleta de Colores

```css
--bg:          #080810   /* fondo principal */
--bg2:         #0f0f1a   /* secciones alternas */
--bg3:         #141420   /* cards */
--orange:      #E8650A   /* acento naranja firma */
--purple:      #9B6FF5   /* violeta asteriscos */
--cream:       #F5F0E8   /* texto principal */
--muted:       #6B6B7A   /* texto secundario */
--border:      rgba(255,255,255,0.07)
```

---

## Tipografía

```
Títulos grandes:   Playfair Display — bold, italic
UI / navegación:   Syne — 700 / 800
Body / texto:      Syne — 400
```

Efecto visual clave: mezcla de `Playfair Display italic` + `Syne bold` en el mismo título (como en la web de referencia donde dice "mpms" en serif y "studio" en sans).

---

## Estructura de Archivos

```
mpm-studio/
├── index.html
├── style.css
├── script.js
└── assets/
    └── img/
        ├── hero-bg.jpg          ← imagen fondo hero (oscura, arquitectónica)
        ├── about-bg.jpg         ← imagen sección nosotros (opcional)
        ├── asterisco.png        ← asterisco 3D cromado sobre fondo negro (PNG con transparencia)
        ├── guernelle-1.jpg      ← portafolio
        ├── guernelle-2.jpg      ← portafolio
        ├── lune-1.jpg           ← portafolio
        ├── lune-2.jpg           ← portafolio
        ├── tessa-1.jpg          ← portafolio
        └── desire-1.jpg         ← portafolio
```

---

## Secciones — Detalle Completo

---

### 1. NAVEGACIÓN
- **Tipo:** fixed top, full width
- **Comportamiento:** transparente al inicio → fondo oscuro con blur al hacer scroll
- **Logo:** `mpm.` en Playfair Display, el punto en naranja
- **Links:** SERVICIOS · PORTAFOLIO · NOSOTROS · CONTACTO
- **Mobile:** hamburguesa → menú fullscreen con links grandes en serif italic

---

### 2. HERO
- **Fondo:** `hero-bg.jpg` cubriendo 100vh, oscurecido con overlay negro 50%
- **Encima del fondo:**
  - Asterisco flotante grande (arriba derecha) — imagen `asterisco.png` con efecto tilt 3D
  - Asterisco flotante pequeño (abajo izquierda) — misma imagen, más chico
- **Centro:**
  - Texto `portafolio` en Syne pequeño, letra espaciada, color muted — arriba del título
  - Título: `mpms` en Playfair Display italic gigante + `studio` en Syne bold gigante, en la misma línea
  - Subtítulo: `Dirección de marca desde una mirada visual` en Playfair italic, color muted
  - Botón CTA: `TRABAJEMOS JUNTOS →` relleno naranja
- **Abajo del hero:** ticker/marquee infinito — `★ BRANDING ★ IDENTIDAD VISUAL ★ CAMPAÑAS ★ CONTENIDO ★ CATÁLOGOS ★`

**Efecto asterisco 3D:**
El asterisco sigue el cursor del mouse con perspectiva CSS. Cuando el mouse se mueve a la derecha, el asterisco rota levemente sobre el eje Y. Cuando sube, rota sobre X. Se logra con ~15 líneas de JS vanilla usando `mousemove` + `rotateX` / `rotateY` en el elemento.

---

### 3. SOBRE NOSOTROS
- **Fondo:** `--bg2`
- **Layout:** dos columnas — texto izquierda, visual derecha
- **Texto izquierda:**
  - Label pequeño: `SOBRE NOSOTROS`
  - Título: `Marca con mirada y propósito`
  - Párrafo: descripción del estudio (ver copy abajo)
  - Stats en fila: `+20 Marcas` · `3 Países` · `+2 Años` — cada uno con borde izquierdo naranja
- **Visual derecha:**
  - Logo `mpm.` muy grande, tipografía naranja
  - Badge circular giratorio con `★ @mpms.tudio ★`
- **Elemento de fondo:** texto `mpm.` en opacity 3%, gigante, posicionado atrás

**Copy:**
> En mpm studio construimos marcas que se ven, se sienten y se recuerdan. Cada proyecto nace de entender profundamente a quien está detrás de la marca. Nuestro enfoque combina dirección visual estratégica con una estética cuidada — sin atajos, sin genérico.

---

### 4. SERVICIOS
- **Fondo:** `--bg`
- **Layout:** grid 3 columnas desktop / 2 tablet / 1 mobile
- **Separación entre cards:** línea de 1px `--border`
- **Cada card tiene:**
  - Número grande en background (01, 02...) en opacity 5%, serif
  - Ícono simple (símbolo tipográfico: ✦ ◎ ▣ ◈ ⬡ ◻)
  - Nombre del servicio en Syne bold
  - Descripción corta en Syne 400, color muted
  - Hover: fondo sube a `--bg2`, línea naranja aparece desde la izquierda

**Los 6 servicios:**

| N° | Nombre | Descripción |
|----|--------|-------------|
| 01 | Identidad de Marca | Logotipo, paleta, tipografía y sistema visual completo. |
| 02 | Dirección Creativa | Concepto visual, moodboards y dirección de contenido. |
| 03 | Publicaciones & Contenido | Posts, stories y catálogos para redes sociales. |
| 04 | Campañas | Concepto, producción gráfica y planificación. |
| 05 | Ideas Materializadas | De boceto a producto: parches, merch, packaging. |
| 06 | Catálogos | Piezas de venta con narrativa y estructura visual. |

---

### 5. PORTAFOLIO
- **Fondo:** `--bg2`
- **Header:** título izquierda + filtros derecha (`Todos · Identidad · Campañas · Contenido`)
- **Grid:** masonry o CSS grid con items de distintas proporciones
  - Item grande (wide): ocupa 2 columnas
  - Item normal: 1 columna
- **Cada item:**
  - Imagen de fondo que cubre todo el card
  - Overlay oscuro que aparece al hover
  - Al hover muestra: categoría (naranja), nombre del proyecto, tipo, flecha →
  - Click → abre lightbox con imagen más grande + info del proyecto
- **Filtros:** al clickear una categoría, los items que no corresponden bajan opacidad

**Proyectos a mostrar:**

| Proyecto | Imagen | Categoría | Descripción lightbox |
|----------|--------|-----------|----------------------|
| Guernelle Studio | guernelle-1.jpg + guernelle-2.jpg | Identidad · Campañas | Identidad completa + campañas Summer Affair Collection |
| Lune Perfumes | lune-1.jpg + lune-2.jpg | Catálogo · Contenido | Catálogo 6 fragancias con diseño editorial |
| Tessa | tessa-1.jpg | Campaña | Campaña beauty "Libre, joven y bella" |
| Desire | desire-1.jpg | Contenido | Publicación editorial retro para perfume |

---

### 6. CONTACTO
- **Fondo:** `--bg` con gradiente radial naranja muy sutil desde abajo
- **Centrado, una sola columna**
- **Contenido:**
  - Label: `HABLEMOS`
  - Título grande: `¿Listo para construir tu marca?` — en serif italic
  - Subtítulo: párrafo corto invitando a contactar
  - Botón primario: `💬 ESCRIBINOS POR WHATSAPP` — verde WhatsApp
  - Botón secundario: `↗ @mpms.tudio` — borde sutil, link a Instagram
  - Línea divisora
  - Frase: `Identidades claras. Pensadas. Sostenibles.` en serif italic, opacidad baja

**Link WhatsApp:**
```
https://wa.me/59175599756?text=Hola%2C%20me%20interesa%20trabajar%20con%20mpm%20studio
```

---

### 7. FOOTER
- Una sola línea: logo izquierda · links centro · copyright derecha
- Borde superior 1px sutil

---

### FLOTANTE
- Botón WhatsApp fijo esquina inferior derecha — siempre visible
- Círculo verde, ícono WhatsApp SVG blanco
- Leve animación de pulso

---

## Comportamientos JS (script.js)

### Asterisco 3D mouse tilt
```js
// En mousemove, calcular posición relativa al centro de pantalla
// Aplicar rotateX y rotateY proporcionales al movimiento
// Usar transition: 0.1s ease-out para suavizar
```

### Scroll reveal
```js
// IntersectionObserver en todos los elementos .reveal
// Al entrar al viewport: añadir clase .visible (opacity 1, translateY 0)
// Delay escalonado entre elementos del mismo grupo
```

### Nav al scroll
```js
// Si scrollY > 60: nav.classList.add('scrolled')
// .scrolled { background: rgba oscuro + backdrop-filter blur }
```

### Filtros portafolio
```js
// Click en filtro → recorrer items
// Si no coincide la categoría → opacity 0.2, scale 0.97
// Si coincide → opacity 1, scale 1
```

### Lightbox
```js
// Click en item portafolio → abrir lightbox con datos del item
// ESC o click fuera → cerrar
// body overflow hidden cuando está abierto
```

---

## Copy Final por Sección

### Hero
- Label: `portafolio — 2026`
- Título: `mpms` + `studio`
- Sub: `Dirección de marca desde una mirada visual`
- CTA: `TRABAJEMOS JUNTOS →`

### Sobre nosotros
- Label: `SOBRE NOSOTROS`
- Título: `Marca con mirada y propósito`
- Body: ver arriba
- Stats: `+20 Marcas` · `3 Países` · `+2 Años`

### Contacto
- Label: `HABLEMOS`
- Título: `¿Listo para construir tu marca?`
- Sub: `Contanos tu proyecto. Juntos definimos la dirección visual que tu marca necesita para crecer con identidad propia.`
- Frase final: `Identidades claras. Pensadas. Sostenibles.`

### Footer
- `© 2026 mpm studio. La Paz, Bolivia.`

---

## Responsive

| Breakpoint | Cambios |
|------------|---------|
| Desktop > 1024px | Layout completo, 3 cols servicios, grid portafolio completo |
| Tablet 768–1024px | 2 cols servicios, 2 cols portafolio, about en columna |
| Mobile < 768px | 1 col todo, menú hamburguesa, botón WA flotante, hero ajustado |

---

## Checklist de Build

- [ ] Generar y tener todas las imágenes listas en `assets/img/`
- [ ] Armar `index.html` con toda la estructura semántica
- [ ] Armar `style.css` con variables, dark theme y responsive
- [ ] Armar `script.js` con los 5 comportamientos listados arriba
- [ ] Probar en Chrome, Safari mobile, Android
- [ ] Subir a Cloudflare Pages
- [ ] Conectar dominio mpm.social
