import { useState } from "react";
import { useNavigate } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/login/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
        credentials: "include",
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.detail || "Erro ao fazer login");
        return;
      }

      const data = await res.json();
      console.log("Login ok:", data);
      // Redireciona para dashboard após login bem-sucedido
      navigate("/");
    } catch (err) {
      setError("Erro de rede: " + err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ maxWidth: 400, margin: "40px auto" }}>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: 12 }}>
          <label>
            Usuário:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
              required
            />
          </label>
        </div>
        <div style={{ marginBottom: 12 }}>
          <label>
            Senha:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: "100%", padding: 8, boxSizing: "border-box" }}
              required
            />
          </label>
        </div>
        {error && (
          <p style={{ color: "red", marginBottom: 12 }}>
            {error}
          </p>
        )}
        <button 
          type="submit" 
          disabled={loading}
          style={{ padding: "10px 20px", cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </form>
    </div>
  );
}

export default LoginPage;
