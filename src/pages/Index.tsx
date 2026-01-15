import { useState } from "react";
import { Button } from "@/components/ui/button";
import { AlunosTable } from "@/components/AlunosTable";
import { AlunoFormModal } from "@/components/AlunoFormModal";
import { DeleteConfirmDialog } from "@/components/DeleteConfirmDialog";
import { useAlunos } from "@/hooks/useAlunos";
import { Aluno, AlunoFormData } from "@/types/aluno";
import { Plus, Loader2, AlertCircle, RefreshCw } from "lucide-react";

const Index = () => {
  const {
    alunos,
    isLoading,
    error,
    createAluno,
    updateAluno,
    deleteAluno,
    isCreating,
    isUpdating,
    isDeleting,
  } = useAlunos();

  const [formModalOpen, setFormModalOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedAluno, setSelectedAluno] = useState<Aluno | null>(null);

  const handleCreate = () => {
    setSelectedAluno(null);
    setFormModalOpen(true);
  };

  const handleEdit = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setFormModalOpen(true);
  };

  const handleDelete = (aluno: Aluno) => {
    setSelectedAluno(aluno);
    setDeleteDialogOpen(true);
  };

  const handleFormSubmit = async (data: AlunoFormData) => {
    if (selectedAluno) {
      await updateAluno({ id: selectedAluno.id, data });
    } else {
      await createAluno(data);
    }
  };

  const handleConfirmDelete = async () => {
    if (selectedAluno) {
      await deleteAluno(selectedAluno.id);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-4xl py-8 md:py-12">
        <header className="mb-8">
          <h1 className="text-2xl font-semibold tracking-tight">
            Gestão de Alunos
          </h1>
          <p className="text-muted-foreground mt-1">
            Cadastre, edite e gerencie os alunos do sistema
          </p>
        </header>

        <div className="flex justify-between items-center mb-6">
          <div className="text-sm text-muted-foreground">
            {alunos.length} aluno{alunos.length !== 1 ? "s" : ""} cadastrado
            {alunos.length !== 1 ? "s" : ""}
          </div>
          <Button onClick={handleCreate}>
            <Plus className="h-4 w-4 mr-2" />
            Novo Aluno
          </Button>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Carregando...</span>
          </div>
        ) : error ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <AlertCircle className="h-8 w-8 text-destructive mb-2" />
            <p className="text-destructive font-medium">Erro ao carregar alunos</p>
            <p className="text-sm text-muted-foreground mt-1">
              {error instanceof Error ? error.message : "Erro desconhecido"}
            </p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => window.location.reload()}
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Tentar novamente
            </Button>
          </div>
        ) : (
          <AlunosTable
            alunos={alunos}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        <AlunoFormModal
          open={formModalOpen}
          onClose={() => setFormModalOpen(false)}
          onSubmit={handleFormSubmit}
          aluno={selectedAluno}
          isLoading={isCreating || isUpdating}
        />

        <DeleteConfirmDialog
          open={deleteDialogOpen}
          onClose={() => setDeleteDialogOpen(false)}
          onConfirm={handleConfirmDelete}
          alunoNome={selectedAluno?.nome}
          isLoading={isDeleting}
        />
      </div>
    </div>
  );
};

export default Index;
