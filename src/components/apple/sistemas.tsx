// Sistemas mostrados na tela do notebook do hero, na ordem em que aparecem com a rolagem.
//
// PARA ACRESCENTAR UM SISTEMA: crie a tela dele (um componente, como o DiarioScreen em
// DiarioDevice.tsx) e adicione um item aqui com as telas/passos. O hero calcula sozinho a
// altura da cena e a troca de tela — cada passo ganha o mesmo trecho de rolagem.
import type { ReactNode } from "react";
import { DiarioScreen } from "./DiarioDevice";

export type PassoSistema = { titulo: string; texto: string; tela: ReactNode };
export type Sistema = { nome: string; segmento: string; status: "Em produção" | "Em breve"; passos: PassoSistema[] };

export const SISTEMAS: Sistema[] = [
  {
    nome: "Diário Digital",
    segmento: "For Education",
    status: "Em produção",
    passos: [
      {
        titulo: "Chamada em poucos cliques.",
        texto: "Todos começam presentes; o professor marca só quem faltou. A frequência se calcula sozinha.",
        tela: <DiarioScreen tela="chamada" />,
      },
      {
        titulo: "Calendário sempre atualizado.",
        texto: "Feriados, férias e dias letivos definidos pela Secretaria valem para a escola inteira.",
        tela: <DiarioScreen tela="calendario" />,
      },
      {
        titulo: "O histórico em um só lugar.",
        texto: "Frequência, generalidades e menções de cada estudante, mês a mês.",
        tela: <DiarioScreen tela="historico" />,
      },
    ],
  },
  // { nome: "Tutor IA", segmento: "For Education", status: "Em breve", passos: [ ... ] },
];

// Todos os passos de todos os sistemas numa fila só (é isso que a rolagem percorre).
export const PASSOS = SISTEMAS.flatMap((s) => s.passos.map((p) => ({ ...p, sistema: s })));
