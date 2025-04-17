"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { Tarefa, TarefaContextType } from "../types";

const TarefaContext = createContext<TarefaContextType | undefined>(undefined);

export const TarefaProvider = ({ children }: { children: React.ReactNode }) => {
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [categorias] = useState<string[]>([
    "Hortifruti",
    "Limpeza",
    "Mercearia",
    "Bebidas",
    "Padaria",
    "Carnes",
    "Congelados",
  ]);

  const [orcamento, setOrcamento] = useState<number>(0);
  const [limite, setLimite] = useState<number>(0);
  const [valorRestante, setValorRestante] = useState<number>(0);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedOrcamento = localStorage.getItem("orcamento");
      const savedLimite = localStorage.getItem("limite");
      const savedTarefas = localStorage.getItem("tarefas");

      if (savedOrcamento) setOrcamento(parseFloat(savedOrcamento));
      if (savedLimite) setLimite(parseFloat(savedLimite));
      if (savedTarefas) {
        try {
          const parsed = JSON.parse(savedTarefas);
          setTarefas(
            parsed.map((t: Tarefa) => ({
              ...t,
              selecionada: false,
              dataCriacao: new Date(t.dataCriacao),
            }))
          );
        } catch (e) {
          console.error("Erro ao carregar tarefas salvas:", e);
        }
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("tarefas", JSON.stringify(tarefas));
    }
  }, [tarefas]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("orcamento", orcamento.toString());
    }
  }, [orcamento]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("limite", limite.toString());
    }
  }, [limite]);

  useEffect(() => {
    const gastoTotal = tarefas
      .filter((t) => t.concluida)
      .reduce((sum, t) => sum + t.quantidade * t.valor, 0);
    setValorRestante(orcamento - gastoTotal);
  }, [tarefas, orcamento]);

  const definirOrcamento = (valor: number) => setOrcamento(valor);
  const atualizarLimite = (valor: number) => setLimite(valor);

  const adicionarTarefa = (texto: string, valor: number, categoria: string) => {
    if (!texto.trim()) return;
    setTarefas((prev) => [
      {
        id: crypto.randomUUID(),
        texto: texto.trim(),
        quantidade: 1,
        valor: Number(valor) || 0,
        categoria: categoria || categorias[0],
        concluida: false,
        selecionada: false,
        dataCriacao: new Date(),
      },
      ...prev,
    ]);
  };

  const removerTarefa = (id: string) =>
    setTarefas((prev) => prev.filter((t) => t.id !== id));

  const removerTodas = () => setTarefas([]);

  const removerSelecionadas = () =>
    setTarefas((prev) => prev.filter((t) => !t.selecionada));

  const toggleConcluida = (id: string) =>
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, concluida: !t.concluida } : t))
    );

  const toggleSelecionada = (id: string) =>
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, selecionada: !t.selecionada } : t))
    );

  const selecionarTodas = (selecionar: boolean) =>
    setTarefas((prev) => prev.map((t) => ({ ...t, selecionada: selecionar })));

  const atualizarTarefa = (id: string, updates: Partial<Tarefa>) =>
    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );

  const atualizarPreco = (id: string, novoPreco: number) =>
    setTarefas((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, valor: Number(novoPreco) || 0 } : t
      )
    );

  const incrementarQuantidade = (id: string) =>
    setTarefas((prev) =>
      prev.map((t) =>
        t.id === id ? { ...t, quantidade: t.quantidade + 1 } : t
      )
    );

  const decrementarQuantidade = (id: string) =>
    setTarefas((prev) =>
      prev.map((t) =>
        t.id === id && t.quantidade > 1
          ? { ...t, quantidade: t.quantidade - 1 }
          : t
      )
    );

  const reordenarTarefas = (startIndex: number, endIndex: number) => {
    const result = Array.from(tarefas);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    setTarefas(result);
  };

  const totalCompras = tarefas
    .filter((t) => t.concluida)
    .reduce((sum, t) => sum + t.quantidade * t.valor, 0);

  const restanteDoLimite = limite - totalCompras;
  const limiteGasto = totalCompras > limite;
  const progresso = tarefas.length
    ? (tarefas.filter((t) => t.concluida).length / tarefas.length) * 100
    : 0;
  const progressoGastos = limite > 0 ? (totalCompras / limite) * 100 : 0;

  const temSelecionadas = tarefas.some((t) => t.selecionada);

  return (
    <TarefaContext.Provider
      value={{
        tarefas,
        categorias,
        adicionarTarefa,
        removerTarefa,
        removerTodas,
        removerSelecionadas,
        toggleConcluida,
        toggleSelecionada,
        selecionarTodas,
        atualizarTarefa,
        atualizarPreco,
        incrementarQuantidade,
        decrementarQuantidade,
        total: totalCompras,
        restanteDoLimite,
        reordenarTarefas,
        temSelecionadas,
        orcamento,
        valorRestante,
        definirOrcamento,
        limite,
        atualizarLimite,
        progresso,
        progressoGastos,
        limiteGasto: +limiteGasto
      }}
    >
      {children}
    </TarefaContext.Provider>
  );
};

export const useTarefas = () => {
  const context = useContext(TarefaContext);
  if (!context) {
    throw new Error("useTarefas must be used within a TarefaProvider");
  }
  return context;
};
