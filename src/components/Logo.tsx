import Image from "next/image";

type LogoProps = {
  className?: string;
  /** Versão com texto branco, para fundos escuros (footer). */
  light?: boolean;
  /** Só a escrita "forklin", sem o símbolo (header). */
  soEscrita?: boolean;
};

export default function Logo({ className, light = false, soEscrita = false }: LogoProps) {
  if (soEscrita) {
    return (
      <Image
        src={light ? "/images/logo-forklin-wordmark-light.png" : "/images/logo-forklin-wordmark.png"}
        alt="Forklin"
        width={850}
        height={247}
        priority={!light}
        className={`w-auto ${className ?? "h-7"}`}
      />
    );
  }
  return (
    <Image
      src={light ? "/images/logo-forklin-full-light.png" : "/images/logo-forklin-full.png"}
      alt="Forklin"
      width={1200}
      height={315}
      priority={!light}
      className={`w-auto ${className ?? "h-8"}`}
    />
  );
}
