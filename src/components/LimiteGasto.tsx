'use client';

import { useTarefas } from '../contexts/TarefaContext';
import { useState, useEffect } from 'react';

export default function LimiteGasto() {
  const { limite, atualizarLimite } = useTarefas();
  const [inputValue, setInputValue] = useState(limite.toString());

  // Atualiza o input se o limite mudar externamente
  useEffect(() => {
    setInputValue(limite.toString());
  }, [limite]);

  const handleSalvar = () => {
    const valor = parseFloat(inputValue);
    if (!isNaN(valor)) {
      atualizarLimite(valor);
    }
  };

  return (
    <div className="mx-4 mt-4 p-5 rounded-xl bg-white shadow-lg border border-gray-200">
      <h2 className="text-lg font-semibold mb-3 text-gray-800">📊 Definir Limite de Gasto</h2>

      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <input
          type="number"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Digite o limite de gasto"
          className="flex-1 p-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 outline-none"
        />
        <button
          onClick={handleSalvar}
          className="bg-indigo-500 hover:bg-indigo-600 text-white px-5 py-2 rounded-lg font-semibold transition"
        >
          Salvar limite
        </button>
      </div>
    </div>
  );
}
