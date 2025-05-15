import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import CadastroList from "./CadastroList";

const schema = z.object({
  nome: z.string().min(1, "Nome é obrigatório"),
  email: z.string().email("E-mail inválido"),
  telefone: z.string().min(1, "Telefone é obrigatório"),
  cargo: z.string().min(1, "Cargo é obrigatório"),
  linkedin: z.string().url("URL inválida").optional().or(z.literal("")),
  github: z.string().url("URL inválida").optional().or(z.literal("")),
});

export default function Form() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data) => {
    try {
      const members = JSON.parse(localStorage.getItem("members")) || [];
      members.push(data);
      localStorage.setItem("members", JSON.stringify(members));
      reset();
      alert("✅ Cadastro realizado com sucesso!");
    } catch {
      alert("❌ Falha ao cadastrar. Verifique os dados informados.");
    }
  };

  const [mostrarCadastros, setMostrarCadastros] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded-lg p-8 max-w-xl w-full space-y-4">
        <h1 className="text-2xl font-bold text-center text-gray-800">Cadastro de Membros</h1>

        <h2 className="text-xl font-bold text-center text-gray-800">Desafio Front End Fusion</h2>

        <div>
          <label className="block text-sm font-medium text-gray-700">Nome completo *</label>
          <input {...register("nome")} className="input" />
          {errors.nome && <p className="text-red-500 text-sm">{errors.nome.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">E-mail *</label>
          <input {...register("email")} type="email" className="input" />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Telefone *</label>
          <input {...register("telefone")} className="input" />
          {errors.telefone && <p className="text-red-500 text-sm">{errors.telefone.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Cargo pretendido *</label>
          <select {...register("cargo")} className="input">
            <option value="">Selecione</option>
            {[
              "Desenvolvedor Frontend",
              "Desenvolvedor Backend",
              "Desenvolvedor Full Stack",
              "Desenvolvedor Mobile",
              "Desenvolvedor de Software",
              "Engenheiro de Software",
              "Arquiteto de Software",
              "UI/UX Designer",
              "Analista de Sistemas",
              "Analista Programador",
              "DevOps Engineer",
              "Engenheiro de Dados",
              "QA Engineer",
              "Scrum Master",
              "Product Owner",
            ].map((cargo) => (
              <option key={cargo} value={cargo}>{cargo}</option>
            ))}
          </select>
          {errors.cargo && <p className="text-red-500 text-sm">{errors.cargo.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">LinkedIn</label>
          <input {...register("linkedin")} className="input" />
          {errors.linkedin && <p className="text-red-500 text-sm">{errors.linkedin.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">GitHub</label>
          <input {...register("github")} className="input" />
          {errors.github && <p className="text-red-500 text-sm">{errors.github.message}</p>}
        </div>

        <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Cadastrar novo membro
        </button>

         <div className="flex flex-col items-center justify-center gap-4 mt-6">
          <button
            onClick={(e) => {
              e.preventDefault();
              setMostrarCadastros(!mostrarCadastros);
            }}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            {mostrarCadastros ? "Ocultar cadastros" : "Visualizar cadastros"}
          </button>
           {mostrarCadastros && <CadastroList />}
           
        </div>
      </form>

     
            
    </div>
  );
}
