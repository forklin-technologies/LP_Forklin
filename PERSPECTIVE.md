OBJETIVO:
Crie o código completo de um carrossel/slider de imagens com efeito de curvatura 3D em arco (estilo concave gallery / 3D curved carousel) utilizando HTML, CSS avançado e JavaScript interativo.

REFERÊNCIA VISUAL & DESIGN:
- Layout em forma de arco côncavo: as extremidades laterais dos cards se curvam para frente/trás, inclinando-se levemente em rotação 3D para simular um painel panorâmico.
- Cada item do slider deve conter:
  1. Uma imagem de alta qualidade com cantos arredondados (`border-radius: 16px` a `24px`).
  2. Um identificador numérico abaixo (ex: #01, #02).
  3. Um título descritivo do projeto/categoria (ex: "Strategy & Planning", "Design & Development").
- Design limpo, moderno e responsivo.

REQUISITOS TÉCNICOS:

1. HTML:
   - Estrutura semântica e organizada.
   - Suporte para no mínimo 5 a 7 cards no carrossel.

2. CSS (Styling & Efeito 3D):
   - Uso de `perspective` no container pai para definir o ponto de vista tridimensional.
   - Aplicação de `transform-style: preserve-3d` na trilha/track do slider.
   - Cálculo preciso de transformações CSS (`rotateY()`, `translateZ()`, `translateY()`, `scale()`) para gerar a parábola/curvatura uniforme dos cards.
   - Estilização moderna com sombras sutis (`box-shadow`), transições suaves (`transition: transform 0.4s ease`) e efeito ao passar o mouse (`:hover`).

3. JAVASCRIPT (Interatividade & Dinâmica):
   - Funcionalidade de arrastar com o mouse (Drag) no Desktop e suporte a gestos de toque (Touch/Swipe) em dispositivos móveis.
   - Cálculo dinâmico das rotações/posições no eixos X, Y e Z à medida que o usuário navega, mantendo o formato de arco contínuo.
   - Suporte para navegação contínua/loop infinito ou rolagem fluida com desaceleração (physics/inertia).

ENTREGA ESPERADA:
Forneça o código em um único arquivo HTML estruturado (com `<style>` e `<script>` embutidos ou separados) totalmente funcional, limpo, comentado e pronto para ser testado no navegador.