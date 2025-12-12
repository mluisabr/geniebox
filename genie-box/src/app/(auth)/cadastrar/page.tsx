"use client";

import { useState } from "react";

export default function Cadastrar() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("+55");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  return (
    <main className="min-h-dvh grid place-items-center px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold">Criar perfil</h1>
        <p className="mt-2 text-sm text-white/70">
          Email + telefone serão verificados para ativar sua conta.
        </p>

        <div className="mt-6 grid gap-3">
          <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
            placeholder="username (único)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            onBlur={async () => {
              if (!username) return;
              const r = await fetch("/api/username/check", { method: "POST", body: JSON.stringify({ username }) });
              const j = await r.json();
              if (!j.ok) setErr(j.error ?? "Username indisponível");
              else setErr(null);
            }}
          />
          <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
            placeholder="nome (opcional)"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
            placeholder="telefone (+55DDDNUMERO)"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
          <input className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
            placeholder="senha (mín. 8)"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {err && <p className="text-sm text-rose-200">{err}</p>}
          {msg && <p className="text-sm text-emerald-200">{msg}</p>}

          <button
            className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/15"
            disabled={loading}
            onClick={async () => {
              setLoading(true);
              setErr(null);
              setMsg(null);
              const res = await fetch("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({ username, email, phone, password, name })
              });
              const json = await res.json();
              setLoading(false);
              if (!json.ok) return setErr(json.error ?? "Erro ao criar conta.");
              setMsg("Conta criada! Agora verifique email e telefone.");
              // send to verify screen with userId
              location.href = `/verificar?userId=${encodeURIComponent(json.userId)}`;
            }}
          >
            criar conta
          </button>

          <a className="mt-2 text-sm text-white/70 underline decoration-white/15" href="/entrar">
            já tem conta? entrar
          </a>
        </div>
      </div>
    </main>
  );
}
