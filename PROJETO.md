# Projeto Prototipagem
## Atividade Academica de Ciencia da Computacao &mdash; IA

> Documentacao completa do projeto: o brainstorm, as decisoes de design, as ideias colocadas em pratica e o mapeamento integral entre os requisitos da atividade e o que foi construido.

---

## 1. Resumo executivo

Projeto composto por duas paginas web acadêmicas integradas, construidas em HTML, CSS e JavaScript puros, sem frameworks. O design system foi inspirado no repositorio **vudovn/ag-kit** (padroes de UI/UX para aplicacoes modernas de IA).

```
projeto/
├── landing-ia/              # Pagina 1: As 5 ferramentas de IA
│   ├── index.html
│   ├── style.css
│   ├── script.js
│   └── img/
│       ├── claude.png
│       ├── gemini.png
│       ├── chatgpt.png
│       ├── nanobanana.png
│       └── notebooklm.png
└── problema-solucao/        # Pagina 2: EstudaAI (problema + solucao)
    ├── index.html
    └── style.css
```

**Stack tecnico:**
- HTML semantico
- CSS puro com custom properties (tokens)
- JavaScript vanilla (Intersection Observer, scroll-driven animations)
- Sem frameworks, sem build step
- Tipografia: Outfit (sans) + JetBrains Mono (monospace)

---

## 2. Mapeamento da atividade

A atividade tem duas tarefas principais. O projeto entrega ambas:

### Tarefa 1 &mdash; Listar 5 ferramentas de IA

Atendida na pagina `landing-ia/index.html` por meio de um carousel scroll-driven onde cada IA tem uma "cena" dedicada com:
- Nome
- Categoria/area (badge colorida)
- Especialidade principal
- 4 features chave
- Exemplo de uso pratico

### Tarefa 2 &mdash; Problema + Solucao + Metodologia + Apresentacao

Atendida na pagina `problema-solucao/index.html` com 9 secoes numeradas que cobrem todos os criterios de avaliacao.

---

## 3. Pagina 1 &mdash; Mundo das IAs

### 3.1 Arquitetura visual

A pagina usa o padrao **scroll sticky carousel**: cada IA ocupa uma "secao" de 200vh de altura. Dentro dela, o conteudo fica em `position: sticky; height: 100vh` &mdash; quando voce scrolla, o conteudo permanece fixo na viewport enquanto a animacao de entrada/saida e calculada pela posicao do scroll.

**Formula de progresso:**
```js
const scrollInSection = scrollY - sectionTopAbsolute;
const stickyRange     = sectionHeight - windowHeight;  // = 100vh
const progress        = clamp(0, 1, scrollInSection / stickyRange);
```

**Fases de animacao:**
| Progress | Conteudo (texto) | Imagem |
|---|---|---|
| 0.00 &rarr; 0.12 | Entrada: fade + slide up + scale | Fade + slide + scale (delay leve) |
| 0.12 &rarr; 0.65 | Hold: totalmente visivel | Hold |
| 0.65 &rarr; 1.00 | Saida: fade + slide up + scale down | Fade out (delay maior) |

A diferenca proposital entre texto e imagem nas fases cria profundidade visual.

### 3.2 As 5 IAs apresentadas

| # | Ferramenta | Categoria | Cor signature | Especialidade |
|---|---|---|---|---|
| 01 | **Claude** (Anthropic) | Texto & Codigo | `#d97757` (laranja) | Analise profunda de documentos, codigo, contexto de 200k tokens |
| 02 | **Gemini** (Google DeepMind) | Multimodal & Pesquisa | `#4a90d9` (azul) | Texto + imagem + audio + video nativamente, contexto de 2M tokens |
| 03 | **ChatGPT** (OpenAI) | Texto, Imagem & Voz | `#10a37f` (verde) | IA generativa mais popular, GPTs personalizados, DALL-E integrado |
| 04 | **Nano Banana** (Google &mdash; Gemini 2.5 Flash Image) | Geracao de Imagens | `#e5a833` (amarelo) | Edicao de imagens com consistencia de personagem, linguagem natural |
| 05 | **NotebookLM** (Google) | Pesquisa & Estudo | `#9b6dff` (roxo) | Responde com base nos seus documentos, gera podcasts (Audio Overview) |

**Diversidade de areas cobertas:** texto, codigo, imagem, video, audio, pesquisa academica, automacao criativa, podcasting.

### 3.3 Exemplos de uso pratico (resposta direta a Tarefa 1)

- **Claude:** revisar PDF de 200 paginas, encontrar contradicoes entre secoes e gerar resumo executivo em uma unica conversa.
- **Gemini:** enviar um video de aula de fisica e pedir resumo escrito + 10 questoes de revisao baseadas no conteudo.
- **ChatGPT:** criar um GPT personalizado que gera posts de blog, hashtags e imagens promocionais a partir de um briefing curto.
- **Nano Banana:** subir foto de produto e gerar 12 variacoes em diferentes cenarios (estudio, ao ar livre, lifestyle) mantendo o objeto identico.
- **NotebookLM:** subir 15 artigos de TCC, pedir resumo comparativo e gerar podcast de 12 minutos para revisar no carro.

### 3.4 Hero da pagina

- Badge "Atividade Academica &mdash; Ciencia da Computacao"
- Titulo "Explorando o Mundo das IAs" com gradient text (3 cores)
- Dois botoes CTA:
  - **Primario:** "Conhecer as IAs" &rarr; scroll para `#carousel` (lands em 40% do sticky range para garantir conteudo centralizado)
  - **Secundario:** "Problema & Solucao" &rarr; abre `problema-solucao/index.html`
- Scroll hint animado

### 3.5 Indicador de progresso (scroll dots)

5 pontos fixos na lateral direita que:
- Aparecem so durante o carousel
- Mostram qual IA esta ativa (ponto colorido + scale)
- Mostram label da IA no hover
- Permitem navegacao por clique (calculam absoluteTop + 40% sticky range)

---

## 4. Pagina 2 &mdash; Problema & Solucao (EstudaAI)

### 4.1 Estrutura completa (9 secoes)

```
Hero                          (atalho visual, 4 stats principais)
01 · O Problema               (problema central + 8 causas)
02 · A Solucao                (apresentacao do EstudaAI + fluxo 6 passos)
03 · Funcionalidades          (bento grid com 8 features)
04 · Metodologia              (timeline de 5 etapas)
05 · Interacao com a IA       (5 prompts utilizados)
06 · Refinamento das interacoes  (5 iteracoes mostrando evolucao)
07 · Reflexao critica         (Vantagens + Cuidados)
08 · Criterios de avaliacao   (mapa entre criterios da atividade e o projeto)
09 · Conclusao                (CTA volta ao Mundo das IAs)
```

### 4.2 O problema escolhido

**Estudantes nao conseguem organizar a rotina de estudos.**

Disciplinas, provas, trabalhos e compromissos pessoais competem pelo mesmo tempo, sem priorizacao. Cada aluno aprende em ritmo diferente, mas todos recebem orientacoes semelhantes. O resultado: estudo de urgencia (so quando a prova esta proxima), nao como habito planejado.

**8 causas identificadas:**
1. Falta de planejamento
2. Falta de habito de estudo
3. Excesso de disciplinas
4. Dificuldade em priorizar
5. Pouco acompanhamento individual
6. Falta de metodos de revisao
7. Distracoes digitais
8. Ausencia de metas claras

**Impactos:** acumulo de tarefas, ansiedade antes das provas, baixo rendimento, perda de motivacao, sensacao de estar sempre atrasado.

### 4.3 A solucao &mdash; EstudaAI

Plataforma inteligente que analisa o desempenho de cada aluno, identifica dificuldades especificas e gera planos de estudo personalizados &mdash; adaptados em tempo real.

**Fluxo de funcionamento (6 passos):**
1. Aluno se cadastra na plataforma
2. Informa disciplinas, provas e dificuldades
3. IA analisa o perfil de aprendizagem
4. Gera plano de estudos personalizado
5. Envia lembretes e recomendacoes
6. Ajusta automaticamente conforme evolui

### 4.4 As 8 funcionalidades centrais

| # | Funcionalidade | O que faz |
|---|---|---|
| 1 | **Plano personalizado** | Gera rotina semanal considerando tempo, prioridade, provas e desempenho |
| 2 | **Diagnostico inicial** | Questionario monta perfil de aprendizagem |
| 3 | **Revisao espacada** | Revisa em 1d, 3d, 7d para fixar memoria a longo prazo |
| 4 | **Identificacao de dificuldades** | Analisa padroes de erro em exercicios |
| 5 | **Recomendacoes automaticas** | Sugere videos, resumos, mapas mentais, simulados |
| 6 | **Lembretes inteligentes** | "Voce tem prova em 3 dias", contextual e nao generico |
| 7 | **Paineis aluno + professor** | Aluno ve progresso; professor ve dificuldades coletivas sem expor individuos |
| 8 | **Adaptacao continua** | Plano se ajusta conforme o aluno evolui ou regride |

### 4.5 Por que essa solucao PRECISA de IA?

Tres capacidades que uma agenda comum nao oferece:
- **Personalizacao em escala:** cada aluno recebe um plano feito para ele
- **Analise de padroes de erro:** identificar exatamente onde reforcar
- **Adaptacao continua:** plano nao para no tempo, evolui com o aluno

---

## 5. Metodologia de construcao com IA

### 5.1 As 5 etapas

#### Etapa 1 &mdash; Identificacao do problema
Analise do cotidiano escolar para identificar uma dor real e recorrente. Filtro: problema deve se beneficiar concretamente do uso de IA, nao apenas poder usa-la.

#### Etapa 2 &mdash; Criacao da ideia inicial
Primeira versao da proposta: "uma plataforma para ajudar estudantes a planejar seus estudos". Ainda generica.

#### Etapa 3 &mdash; Brainstorm assistido por IA
ChatGPT foi usado para expandir a ideia &mdash; gerando causas do problema, publico-alvo, funcionalidades, beneficios e diferenciais.

#### Etapa 4 &mdash; Refinamento da solucao
Selecao das melhores ideias, criacao do nome (EstudaAI), definicao de exemplos de uso, beneficios, desafios tecnicos e questoes eticas.

#### Etapa 5 &mdash; Organizacao academica final
Estruturacao do projeto em formato apresentavel: objetivos, metodologia documentada, prompts utilizados e reflexao critica.

### 5.2 Os 5 prompts utilizados

#### Prompt 01 &mdash; Identificacao
```
Crie um problema relevante para o cotidiano escolar que possa ser
resolvido com o uso de Inteligencia Artificial.
```
**Aproveitamento:** virou a base do projeto.

#### Prompt 02 &mdash; Brainstorm
```
Gere um brainstorm melhorando a ideia de uma plataforma com IA para
ajudar alunos a organizarem seus estudos.
```
**Aproveitamento:** ideia geral virou proposta estruturada com publico-alvo, funcionalidades, beneficios e desafios.

#### Prompt 03 &mdash; Funcionalidades
```
Sugira funcionalidades para uma plataforma de estudos personalizada
com Inteligencia Artificial.
```
**Aproveitamento:** gerou as 8 funcionalidades centrais.

#### Prompt 04 &mdash; Justificativa do uso de IA
```
Explique como a IA pode ser fundamental para resolver esse problema.
```
**Aproveitamento:** justificou por que personalizacao, analise de padroes e adaptacao continua exigem IA &mdash; nao apenas uma agenda.

#### Prompt 05 &mdash; Metodologia
```
Crie uma metodologia explicando o passo a passo da interacao com a IA
para desenvolver essa solucao.
```
**Aproveitamento:** estruturacao em 5 etapas adotada no projeto.

### 5.3 Refinamento das interacoes (5 iteracoes documentadas)

A primeira resposta da IA raramente e a melhor. Cada prompt foi iterado:

#### Iteracao 01 &mdash; Especificar contexto
- **Antes:** "Crie um problema"
- **Depois:** "Problema relevante para cotidiano escolar resolvivel com IA"
- **Por que:** a primeira tentativa veio generica (transito, saude). Adicionar contexto e filtro forcou a IA a pensar em problemas com dimensao tecnologica clara.

#### Iteracao 02 &mdash; Pedir estrutura
- **Antes:** "Me de ideias para o projeto"
- **Depois:** "Brainstorm com publico-alvo, causas, funcionalidades e diferenciais"
- **Por que:** a resposta inicial era um paragrafo corrido. Estruturar a saida em categorias deixou cada bloco aproveitavel.

#### Iteracao 03 &mdash; Filtrar viabilidade
- **Antes:** "Sugira funcionalidades"
- **Depois:** "8 funcionalidades centrais que dependem de IA para funcionar"
- **Por que:** a IA gerou 20+ ideias, muitas redundantes ou que poderiam ser feitas sem IA. Pedir um nucleo de 8 que dependam de IA gerou uma lista mais defensavel.

#### Iteracao 04 &mdash; Pedir justificativa, nao descricao
- **Antes:** "O que a IA faz nessa solucao"
- **Depois:** "Por que esse problema PRECISA de IA e nao apenas uma agenda comum"
- **Por que:** forcou uma defesa real do uso de IA, gerando os tres argumentos principais.

#### Iteracao 05 &mdash; Especificar contexto da reflexao
- **Antes:** "Vantagens e desvantagens"
- **Depois:** "Cuidados especificos ao usar IA em contexto educacional"
- **Por que:** trouxe pontos especificos como privacidade de dados de menores, risco de substituir o professor, acesso desigual.

**Aprendizado central:** a qualidade do resultado e diretamente proporcional a qualidade do prompt. Bons prompts carregam contexto, escopo, formato esperado e criterios de sucesso.

---

## 6. Reflexao critica

### 6.1 Vantagens do uso de IA neste projeto

- Agilidade na geracao e refinamento de ideias
- Apoio a escrita academica e estruturacao
- Sugestoes de funcionalidades em escala
- Personalizacao do plano de estudos por aluno (no EstudaAI)
- Capacidade de adaptar conforme o desempenho
- Identificacao automatica de padroes de erro
- Apoio ao professor com dados agregados

### 6.2 Cuidados ao usar IA

- Respostas podem ser genericas se prompts forem vagos
- Necessidade de revisao critica das saidas
- Risco de dependencia excessiva da ferramenta
- IA nao substitui o papel do professor
- Privacidade dos dados dos alunos precisa de cuidado
- Acesso desigual a tecnologia em diferentes escolas
- Recomendacoes nao sao perfeitas &mdash; precisam de validacao

### 6.3 Aprendizado meta

O processo mostrou que a IA funciona melhor quando o usuario:
1. Sabe formular bons comandos (contexto + escopo + formato)
2. Itera ao inves de aceitar a primeira resposta
3. Analisa criticamente o que vem
4. Adapta o conteudo gerado ao contexto real

A IA nao substitui pensamento &mdash; ela amplia.

---

## 7. Atendimento dos criterios da atividade

| Criterio | Como o projeto atende | Onde |
|---|---|---|
| **01. Criatividade do Problema** | Problema escolar universal, relevante, com impacto direto em desempenho, ansiedade e motivacao | `#problema` |
| **02. Eficacia da Solucao** | 8 funcionalidades viaveis, fluxo de 6 etapas operacional, justificativa tecnica do uso de IA | `#solucao` + `#funcionalidades` |
| **03. Uso Estrategico da IA** | IA usada como parceira de pensamento &mdash; brainstorming, refinamento, justificativa &mdash; nao apenas geradora de texto | `#prompts` + `#refinamento` |
| **04. Clareza da Metodologia** | 5 etapas em timeline + 5 prompts completos + 5 iteracoes de refinamento documentadas | `#metodologia` + `#prompts` + `#refinamento` |
| **05. Qualidade da Apresentacao** | Design system unificado (ag-kit), tipografia limpa, animacoes sutis, navegacao consistente | projeto inteiro |

---

## 8. Design system aplicado

### 8.1 Padroes do ag-kit

Aplicados a partir do estudo do repositorio `vudovn/ag-kit`:

| Padrao | Implementacao |
|---|---|
| Nav h-14 fixa | `height: 3.5rem`, glass effect ao scroll |
| Border-bottom no scroll | `border-bottom: 1px solid zinc-800` |
| Cards | `rounded-2xl`, `border: zinc-800`, `bg: zinc-900` |
| Inner shadow | `inset 0 1px 0 rgba(white/6%)` simula borda iluminada no topo |
| Outline badges | Border `zinc-700`, padding compacto |
| Hover safety | Color/opacity/border transitions &mdash; nunca scale (evita layout shift) |
| Transitions | 150&ndash;250ms `cubic-bezier(0.16, 1, 0.3, 1)` |
| Sem emojis | Sempre SVG icons (Lucide-like) |
| Cursor pointer | Em todos os elementos clicaveis |
| Contraste forte | `--border: #27272a` (visivel), nao `rgba/6%` (invisivel) |

### 8.2 Tokens de design

```css
:root {
  /* Cores base */
  --bg-primary:   color-mix(in srgb, #09090b 95%, #fff);
  --bg-card:      #18181b;
  --text-primary: #f0eee9;
  --text-secondary: #a1a1aa;
  --text-muted:   #71717a;

  /* Accent */
  --accent:       #3b82c4;
  --accent-2:     #22c55e;
  --accent-3:     #f59e0b;

  /* Bordas */
  --border:       #27272a;
  --border-hover: #3f3f46;

  /* Sombras (padrao ag-kit) */
  --inner-shadow: inset 0 1px 0 rgba(255,255,255,0.06);
  --shadow-card:  0 1px 3px rgba(0,0,0,0.4), 0 8px 24px -8px rgba(0,0,0,0.3);
}
```

### 8.3 Tipografia

| Fonte | Uso |
|---|---|
| **Outfit** | Corpo, titulos, UI (pesos 300, 400, 500, 600, 700, 800) |
| **JetBrains Mono** | Numeros, counters, tags de codigo, labels tecnicas |

### 8.4 Paleta por IA

Cada IA tem cor signature usada em titulo, dots e glow da imagem:

```css
--claude-color:   #d97757  /* laranja Anthropic */
--gemini-color:   #4a90d9  /* azul Google */
--chatgpt-color:  #10a37f  /* verde OpenAI */
--nano-color:     #e5a833  /* amarelo banana */
--notebook-color: #9b6dff  /* roxo NotebookLM */
```

---

## 9. Decisoes tecnicas relevantes

### 9.1 Scroll dos dots na pagina 1

**Problema inicial:** ao clicar em um dot da IA, a pagina ia para o `offsetTop` da secao &mdash; mas `.ai-carousel` tem `position: relative`, entao `offsetTop` retornava posicao relativa ao carousel (Claude = 0), fazendo o scroll cair dentro do hero.

**Solucao:** usar `getBoundingClientRect().top + window.scrollY` para obter posicao absoluta na pagina, ignorando a cadeia de `offsetParent`.

```js
function absTop(el) {
  return el.getBoundingClientRect().top + window.scrollY;
}

// Cada dot leva para 40% do sticky range &mdash; solidamente no "hold phase"
const top = absTop(carouselEl) + section.offsetTop;
const stickyRange = section.offsetHeight - window.innerHeight;
window.scrollTo({ top: top + stickyRange * 0.4, behavior: 'smooth' });
```

### 9.2 Padding-top no sticky container

A nav e fixa com `h-14` (56px). Sem ajuste, o conteudo das secoes de IA ficaria parcialmente atras dela. Adicionado `padding: 3.5rem 4rem 1rem` no `.ai-section-sticky` para garantir clearance.

### 9.3 Scroll reveal

Implementado com `IntersectionObserver` &mdash; observer leve, threshold 0.12, `rootMargin: '0px 0px -40px 0px'`. Cada elemento `.reveal` adiciona `.visible` quando entra, ativando transicao de opacity + translateY.

### 9.4 Counter animation

Numeros animados (`data-count="12" data-suffix="+"`) usando `requestAnimationFrame` com easing `1 - (1-p)^4` (easeOutQuart) e duracao de 1600ms.

---

## 10. Brainstorm completo do EstudaAI

### 10.1 Publico-alvo
- Alunos do ensino fundamental
- Alunos do ensino medio
- Estudantes universitarios
- Professores
- Coordenadores pedagogicos
- Pais ou responsaveis
- Escolas que desejam acompanhar desempenho

### 10.2 Funcionamento detalhado

#### Cadastro do aluno
- Nome, serie/curso
- Disciplinas
- Horarios disponiveis
- Datas de provas e trabalhos
- Nivel de dificuldade por materia
- Objetivos de estudo

#### Diagnostico inicial &mdash; perguntas
- Quais materias tem mais dificuldade?
- Quantas horas/dia consegue estudar?
- Prefere estudar por resumos, exercicios ou videos?
- Costuma revisar conteudos?
- Tem dificuldade em manter foco?
- Estuda melhor de manha, tarde ou noite?

#### Plano semanal (exemplo)
| Dia | Materia | Atividade | Tempo |
|---|---|---|---|
| Segunda | Matematica | Resolver exercicios de equacoes | 40 min |
| Terca | Historia | Revisar Revolucao Industrial | 30 min |
| Quarta | Portugues | Interpretacao de texto | 35 min |
| Quinta | Biologia | Revisar celulas | 30 min |
| Sexta | Matematica | Refazer questoes erradas | 45 min |

#### Revisao espacada
- Primeiro contato com o conteudo
- Revisao apos 1 dia
- Revisao apos 3 dias
- Revisao apos 7 dias
- Revisao antes da prova

### 10.3 Cenarios de uso

**Cenario 1: aluno com dificuldade em matematica**
A IA identifica que a maior dificuldade esta em equacoes do 1o grau. Recomenda exercicios especificos, videos explicativos e revisoes semanais sobre esse tema.

**Cenario 2: aluno com muitas provas na mesma semana**
A IA organiza automaticamente o plano, priorizando materias com prova mais proxima e onde o aluno tem maior dificuldade.

**Cenario 3: professor acompanhando a turma**
Painel mostra que a maioria erra interpretacao de texto. Professor prepara aula de revisao focada nesse tema.

### 10.4 Tecnologias hipoteticas
- IA / Machine Learning
- Processamento de Linguagem Natural
- Banco de dados
- Aplicativo web ou mobile
- Sistema de login
- Dashboard interativo
- Algoritmos de recomendacao
- Notificacoes automaticas

### 10.5 Beneficios esperados

**Para alunos:** melhor organizacao, menos ansiedade, mais clareza sobre o que estudar, autonomia, melhor desempenho.

**Para professores:** melhor compreensao das dificuldades da turma, possibilidade de planejar reforco, acompanhamento estrategico.

**Para a escola:** melhora no desempenho geral, reducao da evasao, uso de tecnologia no processo educacional.

### 10.6 Desafios e questoes eticas

**Desafios:** protecao de dados, evitar que a IA substitua o professor, interface simples, recomendacoes uteis, evitar excesso de notificacoes, adaptar para diferentes niveis escolares, acessibilidade.

**Etica:** privacidade, consentimento, seguranca, uso responsavel, transparencia, nao exposicao publica do desempenho individual, evitar comparacoes negativas entre alunos.

---

## 11. Apresentacao &mdash; estrutura sugerida

Caso o projeto seja apresentado em slides, segue uma estrutura de 11 slides:

| Slide | Conteudo |
|---|---|
| 1 | Titulo &mdash; EstudaAI |
| 2 | O problema inventado |
| 3 | Contextualizacao no cotidiano escolar |
| 4 | Solucao proposta (EstudaAI) |
| 5 | Como a IA funciona na solucao |
| 6 | Funcionalidades principais |
| 7 | Metodologia de criacao |
| 8 | Prompts utilizados |
| 9 | Vantagens do uso de IA |
| 10 | Cuidados e questoes eticas |
| 11 | Conclusao |

---

## 12. Conclusao

A Inteligencia Artificial e uma ferramenta poderosa para apoiar a criacao de solucoes e melhorar processos educacionais &mdash; mas precisa ser usada com responsabilidade.

No caso do EstudaAI, a IA nao substitui o estudante nem o professor. Funciona como uma camada de organizacao que torna o estudo mais personalizado, eficiente e consistente.

**Principal aprendizado:** a IA ajuda muito quando se sabe formular bons comandos, analisar criticamente as respostas e adaptar o conteudo gerado ao contexto real.

---

*Pedro Sigismundo &middot; 2026 &middot; Ciencia da Computacao &middot; Universidade de Franca*
