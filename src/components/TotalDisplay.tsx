"use client";

import { useTarefas } from "../contexts/TarefaContext";
import { motion } from "framer-motion";

export default function TotalDisplay() {
  const { total, limite } = useTarefas();

  const progresso = limite ? Math.min((total / limite) * 100, 100) : 0;
  const restante = Math.max(limite - total, 0);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-200 px-4 py-3 sm:px-6 sm:py-4 shadow-md z-50"
    >
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center max-w-4xl mx-auto gap-3 sm:gap-0">
        <div className="flex-1">
          <p className="text-xs sm:text-sm text-gray-500">Total da compra</p>
          <p className="text-lg sm:text-xl font-semibold text-emerald-600">
            R$ {total.toFixed(2)}
          </p>
          {limite > 0 && (
            <p className="text-xs sm:text-sm text-gray-500 mt-1">
              Restante do limite:{" "}
              <span
                className={`font-medium ${
                  restante === 0 ? "text-red-500" : "text-gray-700"
                }`}
              >
                R$ {restante.toFixed(2)}
              </span>
            </p>
          )}
        </div>

        {limite > 0 && (
          <div className="w-full sm:w-1/2">
            <div className="flex justify-between text-xs sm:text-sm mb-1 text-gray-500">
              <span>Limite: R$ {limite.toFixed(2)}</span>
              <span>{progresso.toFixed(0)}%</span>
            </div>
            <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-emerald-500"
                style={{ width: `${progresso}%` }}
                initial={{ width: 0 }}
                animate={{ width: `${progresso}%` }}
                transition={{ duration: 0.8 }}
              />
            </div>
          </div>
        )}
      </div>
    </motion.div>
  );
}
