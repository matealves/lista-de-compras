"use client";

import { useTarefas } from "../contexts/TarefaContext";
import TotalDisplay from "./TotalDisplay";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import LimiteGasto from "./LimiteGasto";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faCheck,
  faPen,
  faCirclePlus,
  faCircleMinus,
  faShoppingCart,
  faCheckCircle,
  faCircle,
  faTimes,
  faGripVertical,
} from "@fortawesome/free-solid-svg-icons";

export default function ListaComprasPremium() {
  const {
    tarefas,
    categorias,
    adicionarTarefa,
    removerTarefa,
    removerSelecionadas,
    toggleConcluida,
    toggleSelecionada,
    selecionarTodas,
    atualizarPreco,
    incrementarQuantidade,
    decrementarQuantidade,
    reordenarTarefas,
    temSelecionadas,
  } = useTarefas();

  const [novoItem, setNovoItem] = useState("");
  const [valor, setValor] = useState("");
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(
    categorias[0]
  );
  const [editandoId, setEditandoId] = useState<string | null>(null);
  const [novoPreco, setNovoPreco] = useState("");
  const [modoSelecao, setModoSelecao] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const precoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editandoId && precoInputRef.current) {
      precoInputRef.current.focus();
      precoInputRef.current.select();
    }
  }, [editandoId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoItem.trim()) return;
    adicionarTarefa(novoItem, parseFloat(valor) || 0, categoriaSelecionada);
    setNovoItem("");
    setValor("");
  };

  const onDragStart = () => {
    setIsDragging(true);
  };

  const onDragEnd = (result: any) => {
    setIsDragging(false);
    if (!result.destination) return;
    reordenarTarefas(result.source.index, result.destination.index);
  };

  const handleSalvarPreco = (id: string) => {
    if (novoPreco.trim() && !isNaN(parseFloat(novoPreco))) {
      atualizarPreco(id, parseFloat(novoPreco));
    }
    setEditandoId(null);
  };

  const handleClick = (e: React.MouseEvent, callback: Function) => {
    e.stopPropagation();
    callback();
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-50 to-gray-100 pb-28">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white p-5 shadow-lg sticky top-0 z-20"
      >
        <div className="flex items-center justify-between max-w-6xl mx-auto">
          <motion.div
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 500 }}
            className="flex items-center space-x-3"
          >
            <FontAwesomeIcon icon={faShoppingCart} className="text-2xl" />
            <h1 className="text-2xl font-bold tracking-tight">
              Sua Lista de Compras
            </h1>
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setModoSelecao(!modoSelecao)}
            className={`p-2 rounded-full transition-colors ${
              modoSelecao ? "bg-emerald-700" : "bg-white/20 hover:bg-white/30"
            }`}
            aria-label={modoSelecao ? "Sair do modo seleção" : "Modo seleção"}
          >
            <FontAwesomeIcon icon={modoSelecao ? faCheckCircle : faCircle} />
          </motion.button>
        </div>
      </motion.div>

      <LimiteGasto />

      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="sticky top-20 z-10 bg-white p-5 mx-auto mt-4 rounded-xl shadow-lg border border-gray-200 max-w-6xl"
      >
        <form onSubmit={handleSubmit} className="space-y-3">
          <motion.div className="relative">
            <input
              type="text"
              value={novoItem}
              onChange={(e) => setNovoItem(e.target.value)}
              placeholder="Digite o nome do item"
              className="w-full p-4 pr-12 border rounded-xl bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              aria-label="Nome do item"
            />
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              type="submit"
              className="absolute right-2 top-2 bg-emerald-500 text-white p-2 rounded-lg hover:bg-emerald-600 transition-colors"
              aria-label="Adicionar item"
            >
              <FontAwesomeIcon icon={faPlus} />
            </motion.button>
          </motion.div>

          <div className="flex gap-3">
            <motion.div className="flex-1">
              <input
                type="number"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                placeholder="Preço unitário"
                min="0"
                step="0.01"
                className="w-full p-4 border rounded-xl bg-white text-gray-900 placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Preço do item"
              />
            </motion.div>

            <motion.div className="flex-1">
              <select
                value={categoriaSelecionada}
                onChange={(e) => setCategoriaSelecionada(e.target.value)}
                className="w-full p-4 border rounded-xl bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                aria-label="Categoria do item"
              >
                {categorias.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </motion.div>
          </div>
        </form>
      </motion.div>

      <AnimatePresence>
        {modoSelecao && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="bg-white p-3 mx-auto shadow-lg rounded-lg flex justify-between items-center max-w-6xl mb-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) =>
                handleClick(e, () => selecionarTodas(!temSelecionadas))
              }
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                temSelecionadas
                  ? "bg-yellow-500 hover:bg-yellow-600 text-white"
                  : "bg-emerald-500 hover:bg-emerald-600 text-white"
              }`}
            >
              {temSelecionadas ? "Desmarcar todas" : "Marcar todas"}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => handleClick(e, removerSelecionadas)}
              disabled={!temSelecionadas}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                temSelecionadas
                  ? "bg-red-500 hover:bg-red-600 text-white"
                  : "bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              Remover selecionadas
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      <DragDropContext onDragStart={onDragStart} onDragEnd={onDragEnd}>
        <Droppable droppableId="tarefas">
          {(provided) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="p-4 space-y-3 max-w-6xl mx-auto"
            >
              <AnimatePresence>
                {tarefas.length === 0 ? (
                  <motion.div
                    key="empty-state"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center py-16 bg-white rounded-xl shadow"
                  >
                    <motion.p
                      animate={{
                        scale: [1, 1.05, 1],
                        transition: { repeat: Infinity, duration: 2 },
                      }}
                      className="text-gray-500 text-lg"
                    >
                      Sua lista está vazia
                    </motion.p>
                    <p className="text-sm text-gray-400 mt-2">
                      Adicione itens usando o formulário acima
                    </p>
                  </motion.div>
                ) : (
                  tarefas.map((tarefa, index) => (
                    <Draggable
                      key={tarefa.id}
                      draggableId={tarefa.id}
                      index={index}
                      isDragDisabled={modoSelecao}
                    >
                      {(provided, snapshot) => (
                        <motion.div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          layout
                          initial={{ opacity: 0, y: 20 }}
                          animate={{
                            opacity: 1,
                            y: 0,
                            scale: snapshot.isDragging ? 1.02 : 1,
                            boxShadow:
                              tarefa.selecionada && modoSelecao
                                ? "0 0 0 2px rgba(16, 185, 129, 0.8)"
                                : snapshot.isDragging
                                ? "0 10px 20px rgba(0,0,0,0.1)"
                                : "0 2px 5px rgba(0,0,0,0.1)",
                          }}
                          exit={{ opacity: 0, x: -100 }}
                          transition={{
                            type: "spring",
                            stiffness: 500,
                            damping: 30,
                          }}
                          className={`bg-white rounded-xl overflow-hidden transition-colors ${
                            tarefa.concluida ? "opacity-80" : ""
                          } ${
                            snapshot.isDragging ? "ring-2 ring-emerald-400" : ""
                          }`}
                        >
                          <div className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start flex-1">
                                {modoSelecao ? (
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) =>
                                      handleClick(e, () =>
                                        toggleSelecionada(tarefa.id)
                                      )
                                    }
                                    className={`mt-1 flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center mr-3 transition-colors ${
                                      tarefa.selecionada
                                        ? "bg-emerald-500 text-white"
                                        : "border border-gray-300 hover:border-emerald-300"
                                    }`}
                                    aria-label={
                                      tarefa.selecionada
                                        ? "Desmarcar item"
                                        : "Marcar item"
                                    }
                                  >
                                    {tarefa.selecionada && (
                                      <FontAwesomeIcon
                                        icon={faCheck}
                                        size="xs"
                                      />
                                    )}
                                  </motion.button>
                                ) : (
                                  <>
                                    <div
                                      {...provided.dragHandleProps}
                                      className="mt-1 mr-2 text-gray-300 hover:text-gray-500 cursor-grab active:cursor-grabbing"
                                    >
                                      <FontAwesomeIcon icon={faGripVertical} />
                                    </div>
                                    <motion.button
                                      whileHover={{ scale: 1.1 }}
                                      whileTap={{ scale: 0.9 }}
                                      onClick={(e) =>
                                        handleClick(e, () =>
                                          toggleConcluida(tarefa.id)
                                        )
                                      }
                                      className={`flex-shrink-0 w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
                                        tarefa.concluida
                                          ? "bg-emerald-500 border-emerald-500 text-white"
                                          : "border-gray-300 hover:border-emerald-300"
                                      }`}
                                      aria-label={
                                        tarefa.concluida
                                          ? "Marcar como não concluído"
                                          : "Marcar como concluído"
                                      }
                                    >
                                      {tarefa.concluida && (
                                        <FontAwesomeIcon
                                          icon={faCheck}
                                          size="xs"
                                        />
                                      )}
                                    </motion.button>
                                  </>
                                )}

                                <div className="ml-3 flex-1">
                                  <p
                                    className={`font-medium ${
                                      tarefa.concluida
                                        ? "line-through text-gray-500"
                                        : "text-gray-800"
                                    }`}
                                  >
                                    {tarefa.texto}
                                  </p>
                                  <div className="mt-1 flex items-center">
                                    <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded-full text-xs">
                                      {tarefa.categoria}
                                    </span>
                                  </div>
                                </div>
                              </div>

                              {!modoSelecao && (
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) =>
                                    handleClick(e, () =>
                                      removerTarefa(tarefa.id)
                                    )
                                  }
                                  className="text-gray-300 hover:text-red-500 ml-2 transition-colors"
                                  aria-label="Remover item"
                                >
                                  <FontAwesomeIcon icon={faTimes} />
                                </motion.button>
                              )}
                            </div>

                            <div className="flex items-center justify-between mt-3">
                              <div className="flex items-center space-x-2">
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) =>
                                    handleClick(e, () =>
                                      decrementarQuantidade(tarefa.id)
                                    )
                                  }
                                  className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
                                    tarefa.quantidade <= 1
                                      ? "bg-gray-100 text-gray-300 cursor-not-allowed"
                                      : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                                  }`}
                                  disabled={tarefa.quantidade <= 1}
                                  aria-label="Diminuir quantidade"
                                >
                                  <FontAwesomeIcon
                                    icon={faCircleMinus}
                                    size="xs"
                                  />
                                </motion.button>
                                <span className="w-6 text-center font-medium">
                                  {tarefa.quantidade}
                                </span>
                                <motion.button
                                  whileHover={{ scale: 1.1 }}
                                  whileTap={{ scale: 0.9 }}
                                  onClick={(e) =>
                                    handleClick(e, () =>
                                      incrementarQuantidade(tarefa.id)
                                    )
                                  }
                                  className="w-8 h-8 flex items-center justify-center bg-gray-100 rounded-full text-gray-500 hover:bg-gray-200 transition-colors"
                                  aria-label="Aumentar quantidade"
                                >
                                  <FontAwesomeIcon
                                    icon={faCirclePlus}
                                    size="xs"
                                  />
                                </motion.button>
                              </div>

                              {editandoId === tarefa.id ? (
                                <motion.div
                                  initial={{ opacity: 0, x: 10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  className="flex items-center"
                                >
                                  <input
                                    ref={precoInputRef}
                                    type="number"
                                    value={novoPreco}
                                    onChange={(e) =>
                                      setNovoPreco(e.target.value)
                                    }
                                    onBlur={() => handleSalvarPreco(tarefa.id)}
                                    onKeyDown={(e) =>
                                      e.key === "Enter" &&
                                      handleSalvarPreco(tarefa.id)
                                    }
                                    className="w-20 p-1 border rounded focus:ring-2 focus:ring-emerald-500"
                                    aria-label="Novo preço"
                                    min="0"
                                    step="0.01"
                                  />
                                  <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) =>
                                      handleClick(e, () =>
                                        handleSalvarPreco(tarefa.id)
                                      )
                                    }
                                    className="ml-2 text-emerald-600 hover:text-emerald-800 transition-colors"
                                    aria-label="Salvar preço"
                                  >
                                    OK
                                  </motion.button>
                                </motion.div>
                              ) : (
                                <div className="flex items-center">
                                  <span className="font-bold text-emerald-600">
                                    R${" "}
                                    {(tarefa.quantidade * tarefa.valor).toFixed(
                                      2
                                    )}
                                  </span>
                                  <motion.button
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) =>
                                      handleClick(e, () => {
                                        setEditandoId(tarefa.id);
                                        setNovoPreco(tarefa.valor.toString());
                                      })
                                    }
                                    className="ml-2 text-gray-400 hover:text-emerald-600 transition-colors"
                                    aria-label="Editar preço"
                                  >
                                    <FontAwesomeIcon icon={faPen} size="xs" />
                                  </motion.button>
                                </div>
                              )}
                            </div>
                          </div>
                        </motion.div>
                      )}
                    </Draggable>
                  ))
                )}
              </AnimatePresence>
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>

      <TotalDisplay />
    </div>
  );
}
