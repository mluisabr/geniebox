"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";

export default function Entrar() {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState<string | null>(null);

  return (
    <main className="min-h-dvh grid place-items-center px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold">Entrar</h1>
        <p className="mt-2 text-sm text-white/70">Use email, telefone ou @username.</p>

        <div className="mt-6 grid gap-3">
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-white/10"
            placeholder="email, telefone ou username"
            value={login}
            onChange={(e) => setLogin(e.target.value)}
          />
          <input
            className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-white/10"
            placeholder="senha"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          {err && <p className="text-sm text-rose-200">{err}</p>}

          <button
            className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/15"
            onClick={async () => {
              setErr(null);
              const res = await signIn("credentials", { login, password, redirect: false });
              if (res?.error) setErr("Falha ao entrar. Verifique dados e se email/telefone já estão verificados.");
              else location.href = "/app";
            }}
          >
            entrar
          </button>

          <div className="mt-2 grid gap-2">
            <button
              className="rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm font-semibold hover:bg-white/5"
              onClick={() => signIn("google", { callbackUrl: "/app" })}
            >
              continuar com Google
            </button>
            <button
              className="rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm font-semibold hover:bg-white/5"
              onClick={() => signIn("apple", { callbackUrl: "/app" })}
            >
              continuar com iCloud (Apple)
            </button>
          </div>

          <a className="mt-2 text-sm text-white/70 underline decoration-white/15" href="/cadastrar">
            não tem conta? criar agora
          </a>
        </div>
      </div>
    </main>
  );
}
