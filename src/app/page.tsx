"use client";

import ListaCompras from "../components/ListaCompras";
import { TarefaProvider } from "../contexts/TarefaContext";

export default function Home() {
  return (
    <TarefaProvider>
      <ListaCompras />
    </TarefaProvider>
  );
}