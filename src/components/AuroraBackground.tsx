/**
 * Aurora suave atrás da página inteira (fixa na tela): três faixas de luz desfocadas em
 * tons de azul-claro da marca, movendo devagar. Opacidade baixa — o branco continua predominante e os
 * cards brancos ganham contraste. Só transform é animado (GPU), o blur é estático.
 */
const BANDS = [
  {
    className: "left-[-20%] top-[-15%] h-[65vh] w-[85vw]",
    color: "rgba(96, 165, 250, 0.22)", // azul claro
    animation: "aurora-a 26s ease-in-out infinite",
  },
  {
    className: "right-[-25%] top-[20%] h-[60vh] w-[80vw]",
    color: "rgba(125, 211, 252, 0.26)", // azul-céu claro
    animation: "aurora-b 32s ease-in-out infinite",
  },
  {
    className: "bottom-[-20%] left-[5%] h-[55vh] w-[75vw]",
    color: "rgba(147, 197, 253, 0.2)", // azul bem suave
    animation: "aurora-c 38s ease-in-out infinite",
  },
];

export default function AuroraBackground() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-[var(--surface)]">
      {BANDS.map((band) => (
        <div
          key={band.color}
          className={`absolute rounded-[50%] blur-[70px] will-change-transform sm:blur-[100px] ${band.className}`}
          style={{
            background: `radial-gradient(ellipse at center, ${band.color} 0%, transparent 70%)`,
            animation: band.animation,
          }}
        />
      ))}
      {/* véu branco no topo e na base para manter a leitura limpa */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(255,255,255,0.35)_100%)]" />
    </div>
  );
}
