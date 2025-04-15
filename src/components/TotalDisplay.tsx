'use client';

import { useTarefas } from '../contexts/TarefaContext';

export default function TotalDisplay() {
  const { total } = useTarefas();
  
  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <div className="flex justify-between items-center">
        <span className="font-bold text-lg">Total:</span>
        <span className="text-2xl font-bold text-emerald-600">
          R$ {total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}