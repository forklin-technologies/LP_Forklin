import type { ReactNode } from "react";

// Ícones de traço compartilhados pelas seções novas (24x24, currentColor).
type IconProps = { size?: number };

function Svg({ size = 20, children }: IconProps & { children: ReactNode }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      {children}
    </svg>
  );
}

const stroke = {
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function ArrowRightIcon(props: IconProps) {
  return <Svg size={16} {...props}><path d="M5 12h14M13 6l6 6-6 6" {...stroke} strokeWidth={2} /></Svg>;
}

export function CheckIcon(props: IconProps) {
  return <Svg size={14} {...props}><path d="m5 12.5 4.5 4.5L19 7.5" {...stroke} strokeWidth={2.4} /></Svg>;
}

export function CapIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M2.5 9 12 4.5 21.5 9 12 13.5 2.5 9Z" {...stroke} />
      <path d="M6.5 11v4.5c0 1.4 2.5 3 5.5 3s5.5-1.6 5.5-3V11M21.5 9v5" {...stroke} />
    </Svg>
  );
}

export function TrendIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3 17 9 11l4 4 8-8M15 7h6v6" {...stroke} />
    </Svg>
  );
}

export function BookIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 6.5C10.5 5 8 4.5 4 4.5v14c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2v-14c-4 0-6.5.5-8 2ZM12 6.5v14" {...stroke} />
    </Svg>
  );
}


export function BoxIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M3.5 8 12 3.5 20.5 8 12 12.5 3.5 8ZM3.5 8v9L12 21.5 20.5 17V8M12 12.5v9" {...stroke} />
    </Svg>
  );
}

export function TargetIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="8.5" {...stroke} />
      <circle cx="12" cy="12" r="4.5" {...stroke} />
      <circle cx="12" cy="12" r="1" fill="currentColor" />
    </Svg>
  );
}

export function GearIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <circle cx="12" cy="12" r="3.2" {...stroke} />
      <path d="M12 3.5v2.2M12 18.3v2.2M20.5 12h-2.2M5.7 12H3.5M17.9 6.1l-1.55 1.55M7.65 16.35 6.1 17.9M17.9 17.9l-1.55-1.55M7.65 7.65 6.1 6.1" {...stroke} />
    </Svg>
  );
}

export function BoltIcon(props: IconProps) {
  return <Svg {...props}><path d="M13 3 5 13.5h5.5L11 21l8-10.5h-5.5L13 3Z" {...stroke} /></Svg>;
}

export function ChartIcon(props: IconProps) {
  return <Svg {...props}><path d="M4 20V10M12 20V4M20 20v-7M4 20h16" {...stroke} /></Svg>;
}

export function SparkleIcon(props: IconProps) {
  return (
    <Svg {...props}>
      <path d="M12 3.5 13.6 9l5.4 1.6L13.6 12l-1.6 5.5L10.4 12 5 10.6 10.4 9 12 3.5ZM19 15.5l.7 2.5 2.3.7-2.3.7-.7 2.3-.7-2.3-2.3-.7 2.3-.7.7-2.5Z" {...stroke} />
    </Svg>
  );
}




