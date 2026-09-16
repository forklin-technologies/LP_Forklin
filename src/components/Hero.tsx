import Image from "next/image";

export default function Hero() {
  return (
    <section
      id="top"
      className="relative overflow-hidden bg-[var(--surface)] px-6 pb-10 pt-28 sm:px-10 sm:pb-14 sm:pt-36"
    >
      <Image
        src="/images/hero-network.png"
        alt=""
        aria-hidden
        fill
        priority
        sizes="100vw"
        className="pointer-events-none select-none object-cover opacity-40"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="mb-5 text-xl italic text-[var(--ink-soft)] sm:text-2xl">
          Um ecossistema, várias soluções
        </p>
        <h1 className="text-balance text-5xl font-extrabold leading-[1.1] tracking-tight text-[var(--ink)] sm:text-6xl md:text-7xl">
          Seu ecossistema.
          <br />
          Cresça com a{" "}
          <span className="text-[var(--btn-primary)]">Forklin.</span>
        </h1>
        <p className="mt-6 max-w-xl text-balance text-lg text-[var(--ink-soft)] opacity-70 sm:text-xl">
          Desenvolvemos sistemas e produtos digitais que transformam ideias em
          resultados reais.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#orcamento"
            className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary)] px-7 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--btn-primary-hover)]"
          >
            Realizar Orçamento
          </a>
          <a
            href="#solucoes"
            className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3.5 text-base font-semibold text-white transition hover:bg-neutral-800"
          >
            Conhecer os Produtos
          </a>
        </div>
      </div>
    </section>
  );
}
