import { Categoria } from './Categoria.model';
export interface Tarefa{
    tarefaId?: number;
    titulo: string;
    descricao: string;
    categoria?: Categoria;
    categoriaId?: number;
    status: string;
  }