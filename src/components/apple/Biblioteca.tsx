"use client";

// Biblioteca (fkbook): texto de um lado, a tela do produto no notebook do outro — o mesmo
// aparelho (DeviceFrame) do Diário Digital, com a captura real do painel no lugar do vídeo.
import Image from "next/image";
import { useRef } from "react";
import { useScrollVars } from "./scroll";
import { DeviceFrame } from "./DiarioDevice";
import { RevealText } from "./effects";

const FRENTES = [
  { titulo: "Acervo", texto: "Títulos e exemplares cadastrados num só lugar." },
  { titulo: "Empréstimos", texto: "Retirada no balcão em poucos cliques, com o leitor identificado." },
  { titulo: "Devoluções", texto: "Prazos acompanhados, com os atrasos à vista." },
  { titulo: "Reservas", texto: "Livro reservado, avisado e guardado para retirada." },
];

export default function Biblioteca() {
  const ref = useRef<HTMLDivElement>(null);
  useScrollVars(ref);

  return (
    <section id="biblioteca" data-theme-section="light" className="relative overflow-hidden px-5 py-28 sm:py-36">
      <div ref={ref} className="mx-auto grid max-w-[1180px] items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <p className="ap-eyebrow">For Education · Biblioteca</p>
          <RevealText texto="A biblioteca em movimento." destaque={["movimento."]} className="ap-headline mt-2 max-w-[12ch]" />
          <p className="ap-lead mt-5 max-w-[34ch]">
            Acervo, empréstimos e devoluções organizados num só painel, para a escola saber o que precisa da atenção hoje.
          </p>

          <ul className="mt-9 grid gap-x-6 gap-y-5 sm:grid-cols-2">
            {FRENTES.map((f, i) => {
              const t = `clamp(0, calc(var(--enter, 1) * 3 - ${i * 0.3}), 1)`;
              return (
                <li key={f.titulo} style={{ opacity: t, transform: `translateY(calc((1 - ${t}) * 24px))` }}>
                  <p className="text-[17px] font-semibold tracking-[-0.01em] text-[#1d1d1f]">{f.titulo}</p>
                  <p className="mt-1 text-[15px] leading-snug text-[#6e6e73]">{f.texto}</p>
                </li>
              );
            })}
          </ul>

          <a href="#fale-conosco-education" className="ap-link mt-9 inline-block">
            Quero a Biblioteca na minha escola <span aria-hidden>›</span>
          </a>
        </div>

        <div
          style={{
            opacity: "clamp(0, calc(var(--enter, 1) * 2.4), 1)",
            transform: "translateY(calc((1 - clamp(0, calc(var(--enter, 1) * 2.4), 1)) * 48px))",
          }}
        >
          <DeviceFrame aspecto="aspect-[1471/812]" label="Painel da Biblioteca (fkbook) com acervo, em circulação, atrasados e usuários ativos">
            <Image
              src="/images/fkbook-painel.png"
              alt=""
              fill
              sizes="(min-width: 1024px) 700px, 92vw"
              className="object-cover object-top-left"
            />
          </DeviceFrame>
        </div>
      </div>
    </section>
  );
}
