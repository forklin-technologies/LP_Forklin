import Image from "next/image";

type LogoProps = {
  className?: string;
};

export default function Logo({ className }: LogoProps) {
  return (
    <span className={`inline-flex items-center gap-1 ${className ?? ""}`}>
      <Image
        src="/images/logo-forklin.png"
        alt=""
        aria-hidden
        width={32}
        height={32}
        priority
        className="h-8 w-8 shrink-0"
      />
      <span className="text-xl font-bold tracking-tight text-[var(--ink)]">
        forklin
      </span>
    </span>
  );
}
