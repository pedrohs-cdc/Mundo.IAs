# Brainstorm — Paginas 1 e 2
## Ciencia da Computacao — Atividade Academica

> Documentacao completa da arquitetura, estrutura e decisoes de design dos dois `index.html` do projeto.

---

## Visao Geral do Projeto

O projeto e composto por duas paginas interligadas, construidas em HTML/CSS/JS puros, sem frameworks front-end, compartilhando um design system unificado inspirado no **ag-kit** (vudovn/ag-kit).

```
projeto/
├── portfolio/
│   ├── index.html      ← Pagina 1: Portfolio pessoal
│   ├── style.css
│   └── script.js
└── landing-ia/
    ├── index.html      ← Pagina 2: O Mundo das IAs
    ├── style.css
    ├── script.js
    └── img/
        ├── claude.png
        ├── gemini.png
        ├── chatgpt.png
        ├── nanobanana.png
        └── notebooklm.png
```

**Navegacao cruzada:**
- Portfolio → `../landing-ia/index.html` via `.nav-pill` "Mundo das IAs"
- Landing-IA → `../portfolio/index.html` via `.nav-pill` "Portfolio"

---

## Design System Compartilhado (ag-kit)

Ambas as paginas compartilham os mesmos tokens CSS, extraidos e adaptados do repositorio `vudovn/ag-kit`.

### Tokens de Cor

```css
--bg-primary:    color-mix(in srgb, #09090b 95%, #fff)  /* neutro-950 */
--bg-secondary:  color-mix(in srgb, #09090b 92%, #fff)
--bg-card:       color-mix(in srgb, #09090b 97%, #fff)
--text-primary:  #f0eee9    /* branco quente */
--text-secondary:#8a8a9a    /* cinza medio */
--text-muted:    #52525e    /* cinza escuro */
--accent:        #3b82c4    /* azul principal */
--border:        rgba(255,255,255,0.06)
--border-hover:  rgba(255,255,255,0.11)
```

### Tokens de Sombra (ag-kit pattern)

```css
--inner-shadow: inset 0 1px 0 rgba(255,255,255,0.06)
--shadow-card:  0 1px 3px rgba(0,0,0,0.4), 0 8px 24px -8px rgba(0,0,0,0.3)
```

> A tecnica `inner-shadow` e diretamente retirada do `card.tsx` do ag-kit:
> `before:shadow-[0_1px_rgba(white/6%)]` — simula uma borda iluminada no topo do card.

### Tokens de Raio

```css
--radius-2xl: 1.5rem   /* cards principais */
--radius-lg:  0.875rem /* botoes, inputs */
--radius-md:  0.625rem /* icones, badges pequenos */
--radius-sm:  0.375rem /* tags de tech */
```

### Tipografia

| Fonte | Uso | Pesos |
|---|---|---|
| `Outfit` | Corpo, titulos, UI | 300, 400, 500, 600, 700, 800 |
| `JetBrains Mono` | Numeros, counters, tags de codigo | 400, 500 |

### Componente `.nav-pill`

Presente em ambas as paginas como link de navegacao cruzada:

```css
.nav-pill {
  display: inline-flex;
  padding: 0.3rem 0.8rem;
  border: 1px solid var(--border);
  border-radius: 100px;
  font-size: 0.72rem;
  background: var(--bg-card);
}
```

---

## Pagina 1 — Portfolio (`portfolio/index.html`)

### Proposito

Portfolio academico pessoal. Apresenta o estudante, suas habilidades, projetos e canal de contato.

### Estrutura de Secoes

```
<nav>          — Navegacao fixa com glass effect ao scroll
<section#hero> — Hero assimetrico (grid 1fr 1fr)
<section#sobre>       — Bio + stats animados + formacao
<section#habilidades> — Bento grid de habilidades
<section#projetos>    — Grade de projetos
<section#contato>     — Form + info de contato
<footer>       — Links rapidos
```

---

### `<nav>` — Navegacao

**Comportamento:** Transparente no topo; ao scroll > 60px, aplica:
- `backdrop-filter: blur(20px)`
- `background: rgba(12,12,16,0.76)` (glass)
- `border-bottom: 1px solid rgba(255,255,255,0.07)`
- `box-shadow: inset 0 1px rgba(255,255,255,0.06)` (inner-shadow)

**Elementos:**
- `.nav-logo` — `pedro.dev` com ponto colorido no accent
- `.nav-links` — 4 anchors: Sobre, Habilidades, Projetos, Contato
- `.nav-pill` — link para Mundo das IAs

---

### `<section#hero>` — Hero Assimetrico

**Layout:** `display: grid; grid-template-columns: 1fr 1fr`

**Lado esquerdo — `.hero-content`:**

```html
.hero-badge          — pill "Disponivel para projetos" com dot verde animado
h1                   — titulo com <span id="hero-scramble"> animado
.hero-description    — subtitulo em font-weight: 300
.hero-cta-group      — 2 botoes: btn-primary + btn-secondary
```

**Efeito de scramble no hero:**
O `<span id="hero-scramble">` e manipulado pela classe `TextScramble` no `script.js`.
Rotaciona entre 5 frases com animacao caracter-a-caracter:

```
1. Ciencia da Computacao
2. Desenvolvimento Web
3. Algoritmos & Estruturas
4. Engenharia de Software
5. Inteligencia Artificial
```

Intervalo: 2800ms entre cada frase. Onset: 900ms apos carregamento.

**Lado direito — `.hero-visual`:**

```html
.hero-visual-orb     — blur radial animado (orb-float 8s)
.hero-visual-card.card-1  — "Semestre / 6°"  (top-right)
.hero-visual-card.card-2  — "Projetos / 12+" (bottom-left)
.hero-visual-card.card-3  — "Status / Ativo" (bottom-right)
```

Cards flutuam com `animation: card-float 6s ease-in-out infinite` com delays diferentes (-2s, -4s) para assincronia visual.

**Botoes (ag-kit style):**

| Classe | Background | Border | Texto |
|---|---|---|---|
| `.btn-primary` | `var(--text-primary)` | transparent | `var(--bg-primary)` |
| `.btn-secondary` | `rgba(255,255,255,0.04)` | `var(--border)` | `var(--text-secondary)` |

---

### `<section#sobre>` — Sobre Mim

**Layout:** `display: grid; grid-template-columns: 1fr 1.15fr`

**Coluna esquerda — `.about-text`:**
- 2 paragrafos de bio
- `.about-stats` — grid 2x2 com 4 stat-items animados

**Stat-items (ag-kit card):**
```css
border: 1px solid var(--border);
border-radius: var(--radius-2xl);   /* 1.5rem */
box-shadow: var(--inner-shadow), var(--shadow-card);
```

Cada `.stat-number` tem `data-count` e `data-suffix` para a animacao de counter:

| Stat | Valor | Suffix |
|---|---|---|
| Projetos concluidos | 12 | + |
| Tecnologias dominadas | 8 | + |
| Anos de estudo | 3 | — |
| Commits no GitHub | 847 | + |

**Coluna direita — `.about-right`:**
Separada por `border-left: 1px solid var(--border)`. Contem:
- Formacao academica (2023 — Presente)
- Areas de foco como `.skill-tag` pills
- 3 certificacoes com `.cert-dot` bullet

---

### `<section#habilidades>` — Bento Grid

**Layout:**
```css
display: grid;
grid-template-columns: 2fr 1fr 1fr;
gap: 1rem;
```

**5 skill-cards:**

| Card | Ocupa | Conteudo |
|---|---|---|
| Full-Stack | 1 coluna | JS, TS, React, Node, Python, PostgreSQL |
| Algoritmos | 1 coluna | C/C++, Java, Python |
| Banco de Dados | 1 coluna | SQL, MongoDB, Redis |
| DevOps | `span 2` | Git, Docker, Linux, GH Actions, Vercel, AWS |
| IA / ML | 1 coluna | TensorFlow, scikit-learn |

**Efeito spotlight (mousemove):**
Cada `.skill-card` tem pseudo-elemento `::before` com `radial-gradient` centrado em `--mx / --my` (CSS custom props atualizadas via JS).

```css
.skill-card::before {
  background: radial-gradient(circle at var(--mx,50%) var(--my,50%),
    rgba(59,130,196,0.07), transparent 60%);
  opacity: 0; /* → 1 no hover */
}
```

---

### `<section#projetos>` — Projetos

**Layout:**
```css
grid-template-columns: 1.4fr 1fr;
```
O 3o card ocupa `grid-column: 1 / -1` (full width).

**3 projetos:**

| # | Nome | Tipo | Stack | Cor de preview |
|---|---|---|---|---|
| 1 | Sistema de Gestao Academica | Aplicacao Web | React, Node.js, PostgreSQL, Socket.io | default dark |
| 2 | Visualizador de Grafos | Algoritmos | TypeScript, Canvas API, D3.js | verde (#0d1a10) |
| 3 | Classificador de Imagens CNN | Inteligencia Artificial | Python, TensorFlow, Keras, OpenCV, Flask | roxo (#190e28) |

`.project-preview-dots` — overlay com `background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)` em grid 28x28px.

---

### `<section#contato>` — Contato

**Layout:** `grid-template-columns: 1fr 1.5fr`

**Esquerda:** 3 contact-info-items (Email, GitHub, LinkedIn) com icone SVG em `.contact-icon` (accent-subtle bg).

**Direita:** Formulario com 3 campos + submit.

**Feedback visual no submit:**
```js
btn.textContent = 'Enviado!';
btn.style.background = '#22c55e'; // verde
// reverte apos 2600ms + reset do form
```

---

### Animacoes e Interacoes — Portfolio

| Mecanismo | Implementacao |
|---|---|
| Scroll reveal | `IntersectionObserver` com `threshold: 0.12` |
| Delays de reveal | `.reveal-delay-1/2/3` = 80ms, 160ms, 240ms |
| Counter animation | `IntersectionObserver` + `requestAnimationFrame` + easing `1 - (1-p)^4` |
| Scramble text | Classe `TextScramble` com queue de caracteres e RAF |
| Card spotlight | `mousemove` → CSS custom props `--mx` / `--my` |
| Card float | `@keyframes card-float` com `translateY(-10px)` |
| Orb float | `@keyframes orb-float` com `translate + scale` |
| Nav glass | `scroll` event → `.scrolled` class toggle |

---

## Pagina 2 — Mundo das IAs (`landing-ia/index.html`)

### Proposito

Landing page academica apresentando 5 assistentes de IA com scroll-driven animations. Cada IA ocupa uma "cena" em scroll sticky.

### Estrutura de Secoes

```
<nav>              — Navegacao fixa (mesmo padrao do portfolio)
.scroll-dots       — 5 pontos de progresso fixos à direita
<section#hero>     — Hero centralizado com glows animados
<div#carousel>     — Container das 5 secoes de IA
  <section[data-ai="claude"]>
  <section[data-ai="gemini"]>
  <section[data-ai="chatgpt"]>
  <section[data-ai="nano"]>
  <section[data-ai="notebook"]>
<footer>
```

---

### `<nav>` — Navegacao

Identica em comportamento ao portfolio. Diferencial:
- Logo: `mundo.ias`
- Links: Inicio, As IAs
- `.nav-pill` → link para Portfolio

---

### `.scroll-dots` — Indicador de Progresso

5 pontos fixos no lado direito (`right: 2rem; top: 50%`).
- Aparecem apenas durante o carousel (`opacity: 0` → `opacity: 1` com `.visible`)
- Ponto ativo recebe `.active`: `background: var(--accent)` + `transform: scale(1.3)` + glow
- Hover mostra `.scroll-dot-label` (nome da IA)
- Click faz scroll suave ate a secao correspondente

---

### `<section#hero>` — Hero Centralizado

**Layout:** `flexbox; align-items: center; text-align: center`

**Elementos:**
```html
.hero-bg-glow.glow-1  — blob azul (top-left), animation: glow-drift 12s
.hero-bg-glow.glow-2  — blob laranja (bottom-right), animation: glow-drift 15s reverse
.hero-badge           — pill "Atividade Academica"
h1                    — titulo com .gradient-text
.hero-description     — subtitulo
.hero-scroll-hint     — "Scroll" + linha animada (hint-bob 2.5s)
```

**Gradient text:**
```css
background: linear-gradient(135deg,
  var(--claude-color),   /* #d97757 laranja */
  var(--accent),         /* #3b82c4 azul */
  var(--chatgpt-color)   /* #10a37f verde */
);
-webkit-background-clip: text;
-webkit-text-fill-color: transparent;
```

---

### `<div#carousel>` — Carousel de IAs

**Mecanismo de scroll sticky:**

Cada `.ai-section` tem `height: 200vh` — o dobro da viewport. O filho `.ai-section-sticky` tem `position: sticky; top: 0; height: 100dvh`.

Isso cria um efeito onde o conteudo fica "preso" enquanto o usuario scrolla 100vh, criando espaco para a animacao de entrada e saida.

**Formula de progresso:**
```js
const scrollInSection = scrollY - section.offsetTop;
const stickyRange = sectionHeight - windowHeight; // = 100vh
let progress = clamp(0, 1, scrollInSection / stickyRange);
```

**Fases de animacao (content):**

| progress | Fase | opacity | scale | translateY |
|---|---|---|---|---|
| 0.00 → 0.12 | Entrada | 0 → 1 | 0.92 → 1 | 40px → 0 |
| 0.12 → 0.65 | Hold | 1 | 1 | 0 |
| 0.65 → 1.00 | Saida | 1 → 0 | 1 → 0.92 | 0 → -30px |

**Fases de animacao (imagem — delay leve):**

| progress | Fase | opacity | scale | translateY |
|---|---|---|---|---|
| 0.00 → 0.15 | Entrada | 0 → 1 | 0.88 → 1 | 60px → 0 |
| 0.15 → 0.60 | Hold | 1 | 1 | 0 |
| 0.60 → 1.00 | Saida | 1 → 0 | 1 → 0.88 | 0 → -40px |

A imagem tem entrada e saida levemente mais "pesadas" (range maior de escala: 0.88) em relacao ao texto (0.92), criando profundidade.

---

### As 5 Secoes de IA

Cada secao usa `data-ai="..."` para acesso via CSS attribute selectors:

```css
.ai-section[data-ai="X"] .ai-name        { color: var(--X-color); }
.ai-section[data-ai="X"] .ai-feature-dot { background: var(--X-color); }
.ai-section[data-ai="X"] .ai-image-glow  { background: var(--X-color); }
```

| # | IA | data-ai | Cor | Criador |
|---|---|---|---|---|
| 01 | Claude | `claude` | `#d97757` (laranja) | Anthropic |
| 02 | Gemini | `gemini` | `#4a90d9` (azul) | Google DeepMind |
| 03 | ChatGPT | `chatgpt` | `#10a37f` (verde) | OpenAI |
| 04 | Nano Banana | `nano` | `#e5a833` (amarelo) | IA Experimental |
| 05 | NotebookLM | `notebook` | `#9b6dff` (roxo) | Google |

**Estrutura de cada secao:**
```html
<section class="ai-section" data-ai="X">
  <div class="ai-section-sticky">        ← sticky container
    <div class="ai-content">             ← texto (esquerda)
      .ai-number                         ← "01 / 05" mono
      h2.ai-name                         ← nome colorido
      p.ai-maker                         ← criador
      p.ai-description                   ← descricao longa
      .ai-features                       ← 4 features com dot
    </div>
    <div class="ai-image-wrapper">       ← imagem (direita)
      .ai-image-glow                     ← glow colorido atras
      img.ai-image                       ← imagem 420x420
    </div>
  </div>
</section>
```

**Layout sticky:**
```css
display: grid;
grid-template-columns: 1fr 1fr;
max-width: 1400px;
padding: 0 4rem;
gap: 4rem;
```

---

### Imagens das IAs

As imagens em `img/` sao geradas via Canvas API (proceduralmente):

**Para cada IA:**
1. Background solido (cor especifica por IA)
2. Glow radial central (`radial-gradient` colorido)
3. 6 circulos concentricos (`stroke`) com opacidade decrescente
4. 4 orbs flutuantes com `radial-gradient` em posicoes fixas
5. Core brilhante no centro
6. 12 raios (`lineTo`) em angulos de 30° com opacidade 7%
7. 120 pontos aleatorios de textura

---

### Animacoes e Interacoes — Landing IA

| Mecanismo | Implementacao |
|---|---|
| Scroll carousel | `scroll` event → progress 0–1 por secao → opacity/scale/translateY |
| Dots de progresso | Calculados no mesmo loop do carousel |
| Dot click | `window.scrollTo({ top: section.offsetTop + 100 })` |
| Nav glass | Identico ao portfolio |
| Glows do hero | `@keyframes glow-drift` 12s / 15s assincrono |
| Hint de scroll | `@keyframes hint-bob` 2.5s translateY(8px) |

---

## Padroes Compartilhados

### Grain Overlay

Ambas as paginas tem um pseudo-elemento `body::after` com:
```css
position: fixed; inset: 0; z-index: 9999;
pointer-events: none; opacity: 0.022;
background-image: url("data:image/svg+xml, ... feTurbulence ...");
background-size: 128px 128px;
```
Adiciona textura sutil de grao fotografico sobre toda a interface.

### Scroll Reveal

```js
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('visible');
      obs.unobserve(e.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
```

Classes de delay: `.reveal-delay-1` (80ms), `.reveal-delay-2` (160ms), `.reveal-delay-3` (240ms).

### Navegacao Suave

Substituicao do `scrollIntoView` (problematico em iframes) por:
```js
window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
```

### Responsividade

Ambas as paginas colapsam para `grid-template-columns: 1fr` abaixo de `900px` / `768px`:
- Nav links ocultados
- Grids de 2 colunas tornam-se 1 coluna
- Padding reduzido
- Scroll dots ocultados (landing-ia)

---

## Arquitetura de Arquivos Final

```
portfolio/
├── index.html   (373 linhas)
├── style.css    (470+ linhas)
└── script.js    (~130 linhas)

landing-ia/
├── index.html   (287 linhas)
├── style.css    (350+ linhas)
├── script.js    (~90 linhas)
└── img/
    ├── claude.png      (840x840, gerado via Canvas)
    ├── gemini.png
    ├── chatgpt.png
    ├── nanobanana.png
    └── notebooklm.png
```

---

*Gerado em: Maio 2026 — Atividade de Ciencia da Computacao*
