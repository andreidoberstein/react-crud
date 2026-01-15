import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { alunosApi } from "@/services/alunosApi";
import { AlunoFormData } from "@/types/aluno";
import { useToast } from "@/hooks/use-toast";

export function useAlunos() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const query = useQuery({
    queryKey: ["alunos"],
    queryFn: alunosApi.getAll,
  });

  const createMutation = useMutation({
    mutationFn: alunosApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alunos"] });
      toast({ title: "Aluno criado com sucesso" });
    },
    onError: (error: Error) => {
      toast({ title: "Erro ao criar aluno", description: error.message, variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: AlunoFormData }) =>
      alunosApi.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alunos"] });
      toast({ title: "Aluno atualizado com sucesso" });
    },
    onError: (error: Error) => {
      toast({ title: "Erro ao atualizar aluno", description: error.message, variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: alunosApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["alunos"] });
      toast({ title: "Aluno excluído com sucesso" });
    },
    onError: (error: Error) => {
      toast({ title: "Erro ao excluir aluno", description: error.message, variant: "destructive" });
    },
  });

  return {
    alunos: query.data ?? [],
    isLoading: query.isLoading,
    error: query.error,
    createAluno: createMutation.mutateAsync,
    updateAluno: updateMutation.mutateAsync,
    deleteAluno: deleteMutation.mutateAsync,
    isCreating: createMutation.isPending,
    isUpdating: updateMutation.isPending,
    isDeleting: deleteMutation.isPending,
  };
}
