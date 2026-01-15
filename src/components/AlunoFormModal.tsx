import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Aluno, AlunoFormData } from "@/types/aluno";
import { Loader2 } from "lucide-react";

const alunoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter no mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  idade: z.coerce.number().min(0, "Idade deve ser maior ou igual a 0"),
});

interface AlunoFormModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: AlunoFormData) => Promise<void>;
  aluno?: Aluno | null;
  isLoading?: boolean;
}

export function AlunoFormModal({
  open,
  onClose,
  onSubmit,
  aluno,
  isLoading,
}: AlunoFormModalProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AlunoFormData>({
    resolver: zodResolver(alunoSchema),
    defaultValues: {
      nome: "",
      email: "",
      idade: 0,
    },
  });

  useEffect(() => {
    if (aluno) {
      reset({
        nome: aluno.nome,
        email: aluno.email,
        idade: aluno.idade,
      });
    } else {
      reset({
        nome: "",
        email: "",
        idade: 0,
      });
    }
  }, [aluno, reset]);

  const handleFormSubmit = async (data: AlunoFormData) => {
    await onSubmit(data);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-lg font-medium">
            {aluno ? "Editar Aluno" : "Novo Aluno"}
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="nome">Nome</Label>
            <Input
              id="nome"
              {...register("nome")}
              placeholder="Nome do aluno"
            />
            {errors.nome && (
              <p className="text-sm text-destructive">{errors.nome.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="email@exemplo.com"
            />
            {errors.email && (
              <p className="text-sm text-destructive">{errors.email.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="idade">Idade</Label>
            <Input
              id="idade"
              type="number"
              {...register("idade")}
              placeholder="0"
              min={0}
            />
            {errors.idade && (
              <p className="text-sm text-destructive">{errors.idade.message}</p>
            )}
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {aluno ? "Salvar" : "Criar"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
