import { useEffect, useState } from "react";

export default function CadastroList() {
  const [cadastros, setCadastros] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("members")) || [];
    setCadastros(stored);
  }, []);

  if (cadastros.length === 0) {
    return (
      <div className="text-center text-gray-600 mt-4">
        Nenhum cadastro encontrado.
      </div>
    );
  }

  return (
    <div className="p-6 bg-white shadow rounded mt-4 w-full mx-auto ">
      <h2 className="text-2xl font-bold mb-4 justify-center flex">Lista de Cadastros</h2>
      <ul className="space-y-4 flex flex-col">
        {cadastros.map((cadastro, index) => (
          <li
            key={index}
            className="border border-gray-300 rounded p-4 shadow-sm"
          >
            <p><strong>Nome:</strong> {cadastro.nome}</p>
            <p><strong>Email:</strong> {cadastro.email}</p>
            <p><strong>Telefone:</strong> {cadastro.telefone}</p>
            <p><strong>Cargo:</strong> {cadastro.cargo}</p>
            {cadastro.linkedin && <p><strong>LinkedIn:</strong> {cadastro.linkedin}</p>}
            {cadastro.github && <p><strong>GitHub:</strong> {cadastro.github}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
}
