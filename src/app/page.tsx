'use client';

import ListaComprasOrganizada from '../components/ListaComprasOrganizada';
import { TarefaProvider } from '../contexts/TarefaContext';

export default function Home() {
  return (
    <TarefaProvider>
      <ListaComprasOrganizada />
    </TarefaProvider>
  );
}