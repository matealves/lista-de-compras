"use client";

import { useTarefas } from "../contexts/TarefaContext";
import { Tarefa } from "../types";
import { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faCheck,
  faPencil,
  faPlus,
  faMinus,
} from "@fortawesome/free-solid-svg-icons";

export default function TarefaItem({ tarefa }: { tarefa: Tarefa }) {
  const {
    atualizarPreco,
    toggleConcluida,
    removerTarefa,
    incrementarQuantidade,
    decrementarQuantidade,
  } = useTarefas();

  const [editandoPreco, setEditandoPreco] = useState(false);
  const [novoPreco, setNovoPreco] = useState(tarefa.valor.toString());
  const precoInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (editandoPreco && precoInputRef.current) {
      precoInputRef.current.focus();
    }
  }, [editandoPreco]);

  const handleSalvarPreco = () => {
    atualizarPreco(tarefa.id, parseFloat(novoPreco) || 0);
    setEditandoPreco(false);
  };

  return (
    <div
      className={`p-4 border-b flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
        tarefa.concluida ? "bg-gray-50" : "bg-white"
      }`}
    >
      <div className="flex items-center space-x-3 flex-1 min-w-0">
        <button
          onClick={() => toggleConcluida(tarefa.id)}
          className={`w-6 h-6 rounded-full border flex items-center justify-center transition-colors ${
            tarefa.concluida
              ? "bg-emerald-500 border-emerald-500 text-white"
              : "border-gray-300"
          }`}
        >
          {tarefa.concluida && <FontAwesomeIcon icon={faCheck} size="xs" />}
        </button>

        <span
          className={`flex-1 truncate ${
            tarefa.concluida ? "line-through text-gray-500" : "text-gray-800"
          } text-sm sm:text-base`}
        >
          {tarefa.texto}
        </span>
      </div>

      <div className="flex items-center gap-3 flex-wrap justify-end sm:justify-normal">
        <div className="flex items-center gap-2">
          <button
            onClick={() => decrementarQuantidade(tarefa.id)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
            disabled={tarefa.quantidade <= 1}
          >
            {/* <FontAwesomeIcon icon={faMinus} size="lg" /> */}
          </button>
          <span className="w-6 text-center text-gray-800 text-sm font-medium">
            {tarefa.quantidade}
          </span>
          <button
            onClick={() => incrementarQuantidade(tarefa.id)}
            className="w-8 h-8 flex items-center justify-center bg-gray-100 text-gray-500 hover:bg-gray-200 transition"
          >
            {/* <FontAwesomeIcon icon={faPlus} size="xs" /> */}
          </button>
        </div>

        {editandoPreco ? (
          <div className="flex items-center gap-2">
            <input
              ref={precoInputRef}
              type="number"
              value={novoPreco}
              onChange={(e) => setNovoPreco(e.target.value)}
              onBlur={handleSalvarPreco}
              onKeyDown={(e) => e.key === "Enter" && handleSalvarPreco()}
              className="w-24 sm:w-28 p-2 rounded-md border border-emerald-300 text-gray-700 placeholder-gray-400 bg-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all shadow-sm"
              placeholder="Preço"
            />
            <button
              onClick={handleSalvarPreco}
              className="text-emerald-600 text-sm font-semibold hover:underline"
            >
              OK
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-emerald-600 text-sm sm:text-base">
              R$ {(tarefa.quantidade * tarefa.valor).toFixed(2)}
            </span>
            <button
              onClick={() => {
                setEditandoPreco(true);
                setNovoPreco(tarefa.valor.toString());
              }}
              className="text-gray-400 hover:text-emerald-600 transition"
            >
              <FontAwesomeIcon icon={faPencil} size="xs" />
            </button>
          </div>
        )}

        <button
          onClick={() => removerTarefa(tarefa.id)}
          className="text-gray-300 hover:text-red-500 transition"
        >
          <FontAwesomeIcon icon={faTrash} />
        </button>
      </div>
    </div>
  );
}
