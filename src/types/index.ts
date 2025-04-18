export interface Tarefa {
  id: string;
  texto: string;
  quantidade: number;
  valor: number;
  categoria: string;
  concluida: boolean;
  selecionada: boolean;
  dataCriacao: Date;
}

export interface TarefaContextType {
  tarefas: Tarefa[];
  categorias: string[];
  adicionarTarefa: (texto: string, valor: number, categoria: string) => void;
  removerTarefa: (id: string) => void;
  removerTodas: () => void;
  removerSelecionadas: () => void;
  toggleConcluida: (id: string) => void;
  toggleSelecionada: (id: string) => void;
  selecionarTodas: (selecionar: boolean) => void;
  atualizarTarefa: (id: string, updates: Partial<Tarefa>) => void;
  atualizarPreco: (id: string, novoPreco: number) => void;
  incrementarQuantidade: (id: string) => void;
  decrementarQuantidade: (id: string) => void;
  reordenarTarefas: (startIndex: number, endIndex: number) => void;
  total: number;
  restanteDoLimite: number;
  temSelecionadas: boolean;
  orcamento: number;
  valorRestante: number;
  definirOrcamento: (valor: number) => void;
  limite: number;
  atualizarLimite: (valor: number) => void;
  progresso: number;
  progressoGastos: number;
  limiteGasto: number;
}
