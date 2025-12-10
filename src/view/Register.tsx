// src/view/Register.tsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerWithEmail } from "../services/authService";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("La contraseña debe tener al menos 6 caracteres");
      return;
    }

    try {
      await registerWithEmail(email, password);
      navigate("/login");
    } catch (err: any) {
      console.error(err);

      if (err.code === "auth/email-already-in-use") {
        setError("El email ya está registrado");
      } else if (err.code === "auth/invalid-email") {
        setError("El email es inválido");
      } else {
        setError("No se pudo registrar");
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-[#111] rounded w-96 mx-auto"
    >
      <h2 className="text-xl text-pink-400 mb-4">Registro</h2>

      {error && <p className="text-red-400 mb-3">{error}</p>}

      <input
        type="email"
        placeholder="Email"
        className="w-full p-2 mb-3 rounded bg-black text-white border border-gray-700"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Contraseña"
        className="w-full p-2 mb-3 rounded bg-black text-white border border-gray-700"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button
        type="submit"
        className="w-full bg-pink-500 hover:bg-pink-600 transition p-2 rounded"
      >
        Registrarse
      </button>
    </form>
  );
};

export default Register;
