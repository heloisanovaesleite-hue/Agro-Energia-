# 🌿 Agro Energia — O Futuro Sustentável do Campo

> Site interativo e animado sobre energia renovável no agronegócio brasileiro.  
> Construído com **HTML5 · CSS3 · JavaScript puro** — sem frameworks, sem dependências.

---

## 📋 Índice

- [Visão Geral](#visão-geral)
- [Como Executar](#como-executar)
- [Estrutura de Arquivos](#estrutura-de-arquivos)
- [Funcionalidades](#funcionalidades)
- [Seções do Site](#seções-do-site)
- [Quiz — Perguntas](#quiz--perguntas)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Personalização](#personalização)
- [Compatibilidade](#compatibilidade)
- [Créditos](#créditos)

---

## Visão Geral

**Agro Energia** é um site educativo e interativo que apresenta as principais fontes de energia renovável aplicadas ao agronegócio — energia solar fotovoltaica, biogás, energia eólica e práticas de sustentabilidade agrícola. O projeto foi desenvolvido como uma experiência visual imersiva, combinando animações em CSS/JS, um quiz gamificado e design moderno com estética orgânica.

---

## Como Executar

Nenhuma instalação necessária. Basta:

1. Baixar os três arquivos na mesma pasta:
   ```
   index.html
   style.css
   script.js
   ```

2. Abrir o arquivo `index.html` diretamente no navegador:
   - Duplo clique no arquivo, **ou**
   - Arrastar para a janela do navegador, **ou**
   - Via terminal:
     ```bash
     # macOS
     open index.html

     # Linux
     xdg-open index.html

     # Windows
     start index.html
     ```

> **Dica:** Para a música ambiente funcionar sem bloqueios, clique no botão **▶** no canto inferior direito após a página carregar. Navegadores modernos exigem uma interação do usuário antes de reproduzir áudio automaticamente.

---

## Estrutura de Arquivos

```
agro-energia/
│
├── index.html      # Estrutura HTML — todas as seções e elementos SVG
├── style.css       # Estilos, animações CSS, responsividade, glassmorphism
└── script.js       # Lógica JS — partículas, quiz, música, parallax, sons
```

---

## Funcionalidades

### 🎨 Visual & Animações
| Recurso | Descrição |
|---|---|
| Céu animado | Gradiente dinâmico com `hue-rotate` suave em loop |
| Sol pulsante | Escala e brilho oscilantes com anéis de expansão |
| Nuvens flutuantes | 4 nuvens com velocidades e tamanhos diferentes cruzando a tela |
| Turbinas eólicas | 3 turbinas com palhetas girando em velocidades aleatórias |
| Painéis solares | SVG com efeito de reflexo pulsante |
| Trator animado | Percorre o campo da esquerda para a direita e volta (com espelho) |
| Parallax | Camadas do hero se movem em velocidades diferentes ao rolar |
| Partículas | Canvas com folhas verdes e pontos de energia dourada flutuando |
| Scroll Reveal | Elementos entram suavemente conforme o usuário rola a página |

### 🎵 Música Ambiente
- Reprodução de áudio ambiente em loop via tag `<audio>`
- Controle de **play/pause** com botão dedicado
- **Slider de volume** com feedback visual
- Respeita a política de autoplay dos navegadores modernos

### 📊 Quiz Interativo
- **5 perguntas** de múltipla escolha sobre agroenergia
- Barra de progresso animada
- Feedback imediato com explicação técnica da resposta
- Sons de acerto e erro gerados via **Web Audio API** (sem arquivos externos)
- Contador de pontos com animação de destaque
- Tela de resultado com **medalha**, **estrelas** e mensagem personalizada

### 🔢 Contadores Animados
- Estatísticas na hero section contam de 0 até o valor final com easing

### 🎮 Easter Egg
- Digite o **Konami Code** (`↑ ↑ ↓ ↓ ← → ← → B A`) para desencadear uma chuva de emojis do campo 🌿☀️💨

---

## Seções do Site

### 1. Hero Section
Paisagem interativa com céu, sol, nuvens, turbinas, painéis solares, plantações e trator animado. Apresenta o título principal, subtítulo, botões de ação e três estatísticas sobre agroenergia no Brasil.

### 2. Energia Renovável no Agronegócio (Cards)
Quatro cards informativos com ícones SVG, descrições técnicas e barras de progresso:
- **Energia Solar** — Fotovoltaico rural, redução de até 70% nos custos
- **Biogás** — Biodigestão de resíduos orgânicos de suinocultura e bovinocultura
- **Energia Eólica** — Aerogeradores no cerrado e caatinga brasileiros
- **Sustentabilidade Agrícola** — Créditos de carbono e práticas de baixo impacto

### 3. Quiz Agro Energia
Módulo gamificado com 5 perguntas de nível técnico-educativo. Pontuação acumulada, barra de progresso e três níveis de desempenho no resultado final:
- 🏆 **Excelente** — 4 ou 5 acertos
- 🌿 **Bom** — 2 ou 3 acertos
- 📚 **Pode Melhorar** — 0 ou 1 acerto

### 4. Rodapé
Links de navegação internos, ícones sociais animados (Instagram, X, YouTube, LinkedIn) e créditos do projeto.

---

## Quiz — Perguntas

| # | Tema | Resposta Correta |
|---|---|---|
| 1 | Conversão de resíduos orgânicos em energia | Biodigestor de biogás |
| 2 | Liderança brasileira em renovável para o agro | Bioeletricidade da cana-de-açúcar |
| 3 | Vantagem do sistema fotovoltaico rural | Redução da conta de energia em até 95% |
| 4 | Conceito de créditos de carbono | Certificados de redução/remoção de CO₂ |
| 5 | Maior potencial eólico no agronegócio brasileiro | Nordeste (Sertão e litoral) |

---

## Tecnologias Utilizadas

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura semântica, SVG inline, tag `<audio>`, Canvas |
| **CSS3** | Animações (`@keyframes`), variáveis (`--var`), Grid, Flexbox, Glassmorphism, `clip-path`, `backdrop-filter` |
| **JavaScript ES6+** | Canvas 2D API, Web Audio API, Intersection Observer, `requestAnimationFrame` |
| **Google Fonts** | Playfair Display (títulos) + DM Sans (corpo de texto) |

**Não utiliza** React, Vue, Angular, Bootstrap, Tailwind, jQuery ou qualquer outro framework ou biblioteca externa (exceto Google Fonts via CDN).

---

## Personalização

### Trocar a música ambiente
Substitua a URL na tag `<audio>` dentro do `index.html`:
```html
<audio id="bgMusic" loop>
  <source src="SUA_MUSICA.mp3" type="audio/mpeg" />
</audio>
```

### Alterar cores principais
Edite as variáveis no topo do `style.css`:
```css
:root {
  --green-dark:   #1a5c35;
  --green-mid:    #2e8b57;
  --green-bright: #3aaf6e;
  --gold:         #f4c430;
  --sky-top:      #1a3a5c;
}
```

### Adicionar ou editar perguntas do quiz
No arquivo `script.js`, localize o array `QUESTIONS` e siga o modelo:
```js
{
  question: 'Texto da pergunta?',
  options: ['Opção A', 'Opção B', 'Opção C', 'Opção D'],
  correct: 0,  // índice da opção correta (0 a 3)
  explanation: '✅ Explicação exibida após a resposta.'
}
```

### Ajustar quantidade de partículas
Em `script.js`, localize o trecho abaixo e altere o número `50`:
```js
for (let i = 0; i < 50; i++) particles.push(new Particle());
```

---

## Compatibilidade

| Navegador | Suporte |
|---|---|
| Chrome 90+ | ✅ Completo |
| Firefox 88+ | ✅ Completo |
| Safari 14+ | ✅ Completo |
| Edge 90+ | ✅ Completo |
| Opera 76+ | ✅ Completo |
| IE 11 | ❌ Não suportado |

> O site é **totalmente responsivo**, adaptado para dispositivos móveis (≥ 320px) e desktops.

---

## Créditos

| Papel | Responsável |
|---|---|
| Concept & Design | **Campo Futuro Lab** |
| Desenvolvimento Front-end | **Studio Verde Digital** |
| Conteúdo Técnico | **Instituto Agro Renovável** |
| Consultoria em Sustentabilidade | **GreenField Tech BR** |

---

> *"O campo que alimenta o Brasil também pode energizá-lo."*  
> — AgroEnergia Brasil, 2025
