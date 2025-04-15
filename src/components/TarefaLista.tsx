'use client';

import { useTarefas } from '../contexts/TarefaContext';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faTrash, faCheck } from '@fortawesome/free-solid-svg-icons';

export default function TarefaLista() {
  const {
    tarefas,
    adicionarTarefa,
    removerTarefa,
    toggleConcluida,
    total
  } = useTarefas();
  
  const [novoItem, setNovoItem] = useState('');
  const [valor, setValor] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!novoItem.trim()) return;
    adicionarTarefa(novoItem, parseFloat(valor) || 0, 'Geral');
    setNovoItem('');
    setValor('');
  };

  return (
    <div className="pb-20 min-h-screen bg-gray-50">
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10">
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="flex gap-2">
            <input
              type="text"
              value={novoItem}
              onChange={(e) => setNovoItem(e.target.value)}
              placeholder="Novo item"
              className="flex-1 p-3 border rounded-lg"
              autoFocus
            />
            <input
              type="number"
              value={valor}
              onChange={(e) => setValor(e.target.value)}
              placeholder="Preço"
              min="0"
              step="0.01"
              className="w-24 p-3 border rounded-lg"
            />
            <button
              type="submit"
              className="bg-emerald-500 text-white px-4 rounded-lg font-medium"
            >
              <FontAwesomeIcon icon={faPlus} />
            </button>
          </div>
        </form>
      </div>

      <div className="p-4 space-y-2">
        {tarefas.length === 0 ? (
          <div className="text-center py-10 text-gray-500">
            Sua lista está vazia. Adicione itens acima.
          </div>
        ) : (
          tarefas.map(tarefa => (
            <div 
              key={tarefa.id} 
              className={`p-3 bg-white rounded-lg shadow ${tarefa.concluida ? 'opacity-75' : ''}`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => toggleConcluida(tarefa.id)}
                    className={`w-6 h-6 rounded-full border flex items-center justify-center ${tarefa.concluida ? 'bg-emerald-500 border-emerald-500' : 'border-gray-300'}`}
                  >
                    {tarefa.concluida && <FontAwesomeIcon icon={faCheck} className="text-white text-xs" />}
                  </button>
                  <span className={tarefa.concluida ? 'line-through' : ''}>
                    {tarefa.texto}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="font-medium text-emerald-600">
                    R$ {tarefa.valor.toFixed(2)}
                  </span>
                  <button
                    onClick={() => removerTarefa(tarefa.id)}
                    className="text-gray-400 hover:text-red-500"
                  >
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 shadow-lg">
        <div className="flex justify-between items-center">
          <span className="font-medium">Total:</span>
          <span className="text-lg font-bold text-emerald-600">
            R$ {total.toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );
}