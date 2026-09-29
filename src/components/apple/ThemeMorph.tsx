"use client";

import { useThemeMorph } from "./scroll";

// Liga a troca claro↔escuro da página conforme a rolagem (ver useThemeMorph).
export default function ThemeMorph() {
  useThemeMorph();
  return null;
}
