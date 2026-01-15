import { Aluno, AlunoFormData } from "@/types/aluno";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8080";

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.text();
    throw new Error(error || `Erro: ${response.status}`);
  }
  return response.json();
}

export const alunosApi = {
  async getAll(): Promise<Aluno[]> {
    const response = await fetch(`${API_URL}/api/alunos`);
    return handleResponse<Aluno[]>(response);
  },

  async create(data: AlunoFormData): Promise<Aluno> {
    const response = await fetch(`${API_URL}/api/alunos`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Aluno>(response);
  },

  async update(id: number, data: AlunoFormData): Promise<Aluno> {
    const response = await fetch(`${API_URL}/api/alunos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    return handleResponse<Aluno>(response);
  },

  async delete(id: number): Promise<void> {
    const response = await fetch(`${API_URL}/api/alunos/${id}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const error = await response.text();
      throw new Error(error || `Erro: ${response.status}`);
    }
  },
};
