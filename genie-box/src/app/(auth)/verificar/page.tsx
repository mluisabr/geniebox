"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Verificar() {
  const sp = useSearchParams();
  const userId = sp.get("userId") ?? "";
  const [emailCode, setEmailCode] = useState("");
  const [phoneCode, setPhoneCode] = useState("");
  const [devEmailCode, setDevEmailCode] = useState<string | null>(null);
  const [devPhoneCode, setDevPhoneCode] = useState<string | null>(null);
  const [msg, setMsg] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const ready = useMemo(() => Boolean(userId), [userId]);

  useEffect(() => {
    setErr(null);
    setMsg(null);
  }, [userId]);

  return (
    <main className="min-h-dvh grid place-items-center px-6 text-white">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h1 className="text-2xl font-semibold">Verificação</h1>
        <p className="mt-2 text-sm text-white/70">
          Precisamos confirmar <b>email</b> e <b>telefone</b> para ativar sua conta.
        </p>

        {!ready && (
          <p className="mt-6 text-sm text-rose-200">userId ausente. Volte ao cadastro.</p>
        )}

        <div className="mt-6 grid gap-4">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Email</h2>
              <button
                className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold ring-1 ring-white/15 hover:bg-white/15"
                onClick={async () => {
                  setErr(null); setMsg(null);
                  const r = await fetch("/api/verify/email/request", { method: "POST", body: JSON.stringify({ userId }) });
                  const j = await r.json();
                  if (!j.ok) setErr(j.error ?? "Erro ao enviar email.");
                  else {
                    setMsg("Código de email enviado.");
                    if (j.devCode) setDevEmailCode(j.devCode);
                  }
                }}
              >
                enviar código
              </button>
            </div>

            <div className="mt-3 grid gap-2">
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
                placeholder="código do email"
                value={emailCode}
                onChange={(e) => setEmailCode(e.target.value)}
              />
              <button
                className="rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm font-semibold hover:bg-white/5"
                onClick={async () => {
                  setErr(null); setMsg(null);
                  const r = await fetch("/api/verify/email/confirm", { method: "POST", body: JSON.stringify({ userId, code: emailCode }) });
                  const j = await r.json();
                  if (!j.ok) setErr(j.error ?? "Código inválido.");
                  else setMsg("Email verificado ✅");
                }}
              >
                confirmar email
              </button>

              {devEmailCode && (
                <p className="text-xs text-white/60">DEV: código email = {devEmailCode}</p>
              )}
            </div>
          </div>

          <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex items-center justify-between">
              <h2 className="text-sm font-semibold">Telefone</h2>
              <button
                className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold ring-1 ring-white/15 hover:bg-white/15"
                onClick={async () => {
                  setErr(null); setMsg(null);
                  const r = await fetch("/api/verify/phone/request", { method: "POST", body: JSON.stringify({ userId }) });
                  const j = await r.json();
                  if (!j.ok) setErr(j.error ?? "Erro ao enviar SMS.");
                  else {
                    setMsg("Código de telefone enviado.");
                    if (j.devCode) setDevPhoneCode(j.devCode);
                  }
                }}
              >
                enviar código
              </button>
            </div>

            <div className="mt-3 grid gap-2">
              <input
                className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
                placeholder="código do SMS"
                value={phoneCode}
                onChange={(e) => setPhoneCode(e.target.value)}
              />
              <button
                className="rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm font-semibold hover:bg-white/5"
                onClick={async () => {
                  setErr(null); setMsg(null);
                  const r = await fetch("/api/verify/phone/confirm", { method: "POST", body: JSON.stringify({ userId, code: phoneCode }) });
                  const j = await r.json();
                  if (!j.ok) setErr(j.error ?? "Código inválido.");
                  else setMsg("Telefone verificado ✅");
                }}
              >
                confirmar telefone
              </button>

              {devPhoneCode && (
                <p className="text-xs text-white/60">DEV: código telefone = {devPhoneCode}</p>
              )}
            </div>
          </div>

          {err && <p className="text-sm text-rose-200">{err}</p>}
          {msg && <p className="text-sm text-emerald-200">{msg}</p>}

          <a className="text-sm text-white/70 underline decoration-white/15" href="/entrar">
            depois de verificar, entrar
          </a>
        </div>
      </div>
    </main>
  );
}
