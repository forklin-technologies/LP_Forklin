
export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] items-center justify-center overflow-hidden px-6 pb-16 pt-32 sm:px-10 sm:pb-20 sm:pt-36"
    >
      {/* ilustrações isométricas: vendas, funil, educação e ecossistema */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[url('/images/hero-illustrations.svg')] bg-cover bg-center [mask-image:linear-gradient(to_bottom,black_75%,transparent)]"
      />

      <div className="relative mx-auto flex max-w-4xl flex-col items-center text-center">
        <p className="mb-5 text-xl italic text-[var(--ink-soft)] sm:text-2xl">
          Um ecossistema, várias soluções
        </p>
        <h1 className="font-extrabold leading-[1.1] tracking-tight text-[var(--ink)]">
          <span className="block whitespace-nowrap text-[clamp(2rem,8.5vw,5.25rem)]">
            Seu ecossistema.
          </span>
          <span className="block whitespace-nowrap text-[clamp(2rem,8.5vw,5.25rem)]">
            Cresça com a{" "}
            <span className="text-[var(--btn-primary)]">Forklin.</span>
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-balance text-base text-[var(--ink-soft)] opacity-70 sm:text-lg">
          Desenvolvemos sistemas e produtos digitais que transformam ideias em
          resultados reais.
        </p>

        <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row">
          <a
            href="#fale-conosco"
            className="inline-flex items-center justify-center rounded-full bg-[var(--btn-primary)] px-7 py-3.5 text-base font-semibold text-white transition hover:bg-[var(--btn-primary-hover)]"
          >
            Realizar Orçamento
          </a>
          <a
            href="#segmentos"
            className="inline-flex items-center justify-center rounded-full bg-black px-7 py-3.5 text-base font-semibold text-white transition hover:bg-neutral-800"
          >
            Conhecer os Produtos
          </a>
        </div>
      </div>
    </section>
  );
}
