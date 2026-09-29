import Image from "next/image";

type LogoProps = {
  className?: string;
  /** Versão com texto branco, para fundos escuros (footer). */
  light?: boolean;
};

export default function Logo({ className, light = false }: LogoProps) {
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
