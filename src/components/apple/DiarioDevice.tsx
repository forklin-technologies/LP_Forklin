// O produto real como protagonista (skill apple-design: "show the real product"): réplica fiel
// das telas do Diário Digital dentro de um notebook, em HTML — nada de imagem genérica.
// As cores aqui são as do PRODUTO (roxo do Diário), não as da LP: igual à Apple, a cor
// aparece na tela do aparelho. Nomes de estudantes fictícios (nunca dado real).

export type TelaDiario = "chamada" | "calendario" | "historico";

const ALUNOS = [
  { n: 1, nome: "Ana Beatriz Moura", faltas: [] as number[] },
  { n: 2, nome: "Bruno Henrique Costa", faltas: [3] },
  { n: 3, nome: "Caio Ribeiro Lima", faltas: [] },
  { n: 4, nome: "Daniela Rocha Santos", faltas: [6, 7] },
  { n: 5, nome: "Enzo Martins Alves", faltas: [] },
  { n: 6, nome: "Fernanda Souza Dias", faltas: [2] },
  { n: 7, nome: "Gabriel Nunes Prado", faltas: [] },
  { n: 8, nome: "Helena Castro Vieira", faltas: [] },
  { n: 9, nome: "Igor Pacheco Ramos", faltas: [5] },
  { n: 10, nome: "Júlia Fernandes Luz", faltas: [] },
];
const DIAS = [1, 2, 3, 4, 5, 8, 9, 10];

function Chamada() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[0.55em] font-semibold uppercase tracking-wider text-[#6241A1]">Diário de Classe</p>
          <p className="text-[1.05em] font-bold text-[#1A1A2E]">3º Ano A · Setembro</p>
        </div>
        <span className="rounded-full bg-[#5342A1] px-[0.9em] py-[0.35em] text-[0.55em] font-semibold text-white">Todos presentes</span>
      </div>
      <div className="mt-[0.8em] flex min-h-0 flex-1 flex-col overflow-hidden rounded-[0.6em] border border-[#E8E5F5] bg-white">
        <div className="grid grid-cols-[1.4em_1fr_repeat(8,1.55em)_2.6em] items-center bg-[#F4F3FB] px-[0.6em] py-[0.45em] text-[0.5em] font-semibold text-[#6B6880]">
          <span>Nº</span>
          <span>Estudante</span>
          {DIAS.map((d) => (
            <span key={d} className="text-center">{String(d).padStart(2, "0")}</span>
          ))}
          <span className="text-right">Freq.</span>
        </div>
        {ALUNOS.map((a) => {
          const freq = Math.round(100 - (a.faltas.length / 20) * 100);
          return (
            <div
              key={a.n}
              className="grid flex-1 grid-cols-[1.4em_1fr_repeat(8,1.55em)_2.6em] items-center border-t border-[#F0EEF8] px-[0.6em] text-[0.55em]"
            >
              <span className="font-mono text-[#9A97AD]">{String(a.n).padStart(2, "0")}</span>
              <span className="truncate font-medium text-[#1A1A2E]">{a.nome}</span>
              {DIAS.map((d, i) => {
                const falta = a.faltas.includes(i);
                return (
                  <span key={d} className="flex justify-center">
                    <span
                      className={`flex h-[1.35em] w-[1.35em] items-center justify-center rounded-[0.35em] text-[0.85em] font-bold ${
                        falta ? "bg-[#FDECEC] text-[#C0392B]" : "bg-[#EEF7F1] text-[#1F8A4C]"
                      }`}
                    >
                      {falta ? "F" : "P"}
                    </span>
                  </span>
                );
              })}
              <span className={`text-right font-semibold ${freq < 80 ? "text-[#C0392B]" : "text-[#1A1A2E]"}`}>{freq}%</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Calendario() {
  // Setembro/2026 começa numa terça
  const inicio = 2;
  const especiais: Record<number, { rotulo: string; cor: string }> = {
    7: { rotulo: "Feriado", cor: "bg-[#FDECEC] text-[#C0392B]" },
    18: { rotulo: "Reunião de pais", cor: "bg-[#FFF4DD] text-[#A0650B]" },
    25: { rotulo: "Ponto facultativo", cor: "bg-[#EAF2FF] text-[#2451FF]" },
  };
  const cells = [...Array(inicio).fill(null), ...Array.from({ length: 30 }, (_, i) => i + 1)];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-[0.55em] font-semibold uppercase tracking-wider text-[#6241A1]">Calendário escolar</p>
          <p className="text-[1.05em] font-bold text-[#1A1A2E]">Setembro 2026</p>
        </div>
        <span className="text-[0.55em] font-medium text-[#6B6880]">20 dias letivos</span>
      </div>
      <div className="mt-[0.8em] grid min-h-0 flex-1 grid-cols-7 grid-rows-[auto_repeat(5,1fr)] gap-[0.4em] text-[0.55em]">
        {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((d) => (
          <span key={d} className="text-center font-semibold text-[#9A97AD]">{d}</span>
        ))}
        {cells.map((d, i) => {
          if (d === null) return <span key={`v${i}`} />;
          const fimDeSemana = i % 7 === 0 || i % 7 === 6;
          const esp = especiais[d];
          return (
            <span
              key={d}
              className={`flex min-h-0 flex-col justify-between overflow-hidden rounded-[0.45em] p-[0.35em] ${
                esp ? esp.cor : fimDeSemana ? "bg-[#F7F7FA] text-[#B8B6C6]" : "bg-white text-[#1A1A2E]"
              } border border-[#EEECF6]`}
            >
              <span className="font-semibold">{d}</span>
              {esp && <span className="text-[0.8em] font-semibold leading-tight">{esp.rotulo}</span>}
            </span>
          );
        })}
      </div>
    </div>
  );
}

function Historico() {
  const mencoes = [
    ["Língua Portuguesa", "PS", "PS"],
    ["Matemática", "S", "PS"],
    ["Ciências", "PS", "S"],
    ["História", "S", "S"],
    ["Geografia", "PS", "PS"],
  ];
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-[0.7em]">
        <span className="flex h-[2.4em] w-[2.4em] items-center justify-center rounded-full bg-[#EDE9FB] text-[0.8em] font-bold text-[#5342A1]">AB</span>
        <div>
          <p className="text-[1.05em] font-bold text-[#1A1A2E]">Ana Beatriz Moura</p>
          <p className="text-[0.55em] text-[#6B6880]">3º Ano A · Nº 01 · desde fevereiro</p>
        </div>
      </div>
      <div className="mt-[0.8em] grid grid-cols-3 gap-[0.5em]">
        {[
          ["Frequência", "98,5%"],
          ["Faltas no ano", "2"],
          ["Generalidades", "1"],
        ].map(([r, v]) => (
          <div key={r} className="rounded-[0.6em] border border-[#E8E5F5] bg-white p-[0.9em]">
            <p className="text-[0.5em] font-medium text-[#6B6880]">{r}</p>
            <p className="text-[1.1em] font-bold text-[#1A1A2E]">{v}</p>
          </div>
        ))}
      </div>
      <div className="mt-[0.6em] flex min-h-0 flex-1 flex-col overflow-hidden rounded-[0.6em] border border-[#E8E5F5] bg-white text-[0.55em]">
        <div className="grid grid-cols-[1fr_4em_4em] bg-[#F4F3FB] px-[0.8em] py-[0.45em] font-semibold text-[#6B6880]">
          <span>Componente</span>
          <span className="text-center">1º tri</span>
          <span className="text-center">2º tri</span>
        </div>
        {mencoes.map(([c, a, b]) => (
          <div key={c} className="grid flex-1 grid-cols-[1fr_4em_4em] items-center border-t border-[#F0EEF8] px-[0.8em]">
            <span className="text-[#1A1A2E]">{c}</span>
            <span className="text-center font-semibold text-[#5342A1]">{a}</span>
            <span className="text-center font-semibold text-[#5342A1]">{b}</span>
          </div>
        ))}
      </div>
      <p className="mt-[0.9em] text-[0.55em] font-semibold uppercase tracking-wider text-[#6B6880]">Generalidades</p>
      <div className="mt-[0.4em] flex items-center justify-between rounded-[0.6em] border border-[#E8E5F5] bg-white px-[0.8em] py-[0.5em] text-[0.55em]">
        <span className="text-[#1A1A2E]">12/03 · Atestado médico</span>
        <span className="rounded-full bg-[#EDE9FB] px-[0.7em] py-[0.15em] font-semibold text-[#5342A1]">Falta justificada</span>
      </div>
    </div>
  );
}

const MENU = ["Início", "Diário de Classe", "Estudantes", "Generalidades", "Relatórios", "Avaliação"];

// Tela do Diário Digital (menu lateral + a tela escolhida, com transição entre elas).
export function DiarioScreen({ tela = "chamada" }: { tela?: TelaDiario }) {
  const ativo = tela === "chamada" ? 1 : tela === "calendario" ? 0 : 2;
  return (
    <div className="flex h-full">
      <aside className="flex w-[22%] flex-col gap-[0.35em] bg-[#24183B] p-[0.9em] text-white">
        <p className="mb-[0.6em] text-[0.75em] font-bold">Diário Digital</p>
        {MENU.map((m, i) => (
          <span key={m} className={`rounded-[0.45em] px-[0.6em] py-[0.4em] text-[0.55em] ${i === ativo ? "bg-white/15 font-semibold" : "text-white/60"}`}>
            {m}
          </span>
        ))}
        <span className="mt-auto text-[0.5em] text-white/50">EMEB Modelo · Secretaria</span>
      </aside>
      {/* <div>, não <main>: a página já tem o seu <main> (só pode haver um) */}
      <div className="relative flex-1 p-[1.1em]">
        {(["chamada", "calendario", "historico"] as const).map((t) => (
          <div
            key={t}
            aria-hidden={t !== tela}
            className="absolute inset-[1.1em] transition-[opacity,transform] duration-500 ease-out"
            style={{ opacity: t === tela ? 1 : 0, transform: t === tela ? "none" : "translateY(0.6em)" }}
          >
            {t === "chamada" ? <Chamada /> : t === "calendario" ? <Calendario /> : <Historico />}
          </div>
        ))}
      </div>
    </div>
  );
}

// Moldura do notebook — serve pra QUALQUER sistema (a tela vem como children).
// A letra da tela acompanha a LARGURA DO NOTEBOOK (container query), não a da janela: o
// mesmo aparelho aparece grande no hero e menor no bento, sempre proporcional.
export function DeviceFrame({ children, label = "Tela do sistema", semSombra = false }: { children: React.ReactNode; label?: string; semSombra?: boolean }) {
  return (
    <div className="mx-auto w-full text-left [container-type:inline-size]" aria-label={label} role="img">
      <div className={`rounded-[1.4rem] bg-[#1d1d1f] p-[0.9%] ${semSombra ? "" : "shadow-[0_40px_80px_-40px_rgba(0,0,0,0.45)]"}`}>
        <div className="relative aspect-[16/10] overflow-hidden rounded-[0.9rem] bg-[#FAFAFD] text-[2.3cqw]">{children}</div>
      </div>
      <div className="mx-auto h-[0.9rem] w-[108%] -translate-x-[3.7%] rounded-b-[1.2rem] bg-gradient-to-b from-[#d6d6db] to-[#a9a9b1]" />
    </div>
  );
}

export default function DiarioDevice({ tela = "chamada" }: { tela?: TelaDiario }) {
  return (
    <DeviceFrame label="Tela do Diário Digital">
      <DiarioScreen tela={tela} />
    </DeviceFrame>
  );
}
