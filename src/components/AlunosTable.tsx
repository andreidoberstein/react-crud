import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Aluno } from "@/types/aluno";
import { Pencil, Trash2 } from "lucide-react";

interface AlunosTableProps {
  alunos: Aluno[];
  onEdit: (aluno: Aluno) => void;
  onDelete: (aluno: Aluno) => void;
}

export function AlunosTable({ alunos, onEdit, onDelete }: AlunosTableProps) {
  if (alunos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-muted-foreground">
        <p>Nenhum aluno cadastrado</p>
        <p className="text-sm">Clique em "Novo Aluno" para adicionar</p>
      </div>
    );
  }

  return (
    <div className="border rounded-md">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-16">ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Email</TableHead>
            <TableHead className="w-20">Idade</TableHead>
            <TableHead className="w-24 text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {alunos.map((aluno) => (
            <TableRow key={aluno.id}>
              <TableCell className="font-mono text-muted-foreground">
                {aluno.id}
              </TableCell>
              <TableCell className="font-medium">{aluno.nome}</TableCell>
              <TableCell className="text-muted-foreground">
                {aluno.email}
              </TableCell>
              <TableCell>{aluno.idade}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onEdit(aluno)}
                    className="h-8 w-8"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => onDelete(aluno)}
                    className="h-8 w-8 hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
