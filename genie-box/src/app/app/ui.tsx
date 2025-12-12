"use client";

import { useMemo, useState } from "react";

function toCents(brl: string) {
  const cleaned = brl.replace(/[^0-9,\.]/g, "").replace(".", "").replace(",", ".");
  const n = Number(cleaned);
  return Number.isFinite(n) ? Math.round(n * 100) : 0;
}

export default function DashboardClient({ user }: { user: any }) {
  const publicUrl = useMemo(() => `/u/${user.username}`, [user.username]);
  const [savingProfile, setSavingProfile] = useState(false);
  const [savingPix, setSavingPix] = useState(false);

  const [name, setName] = useState(user.name ?? "");
  const [bio, setBio] = useState(user.bio ?? "");
  const [avatarUrl, setAvatarUrl] = useState(user.avatarUrl ?? "");
  const [coverUrl, setCoverUrl] = useState(user.coverUrl ?? "");

  const [pixKey, setPixKey] = useState("");
  const [pixKeyType, setPixKeyType] = useState<"PHONE"|"CPF"|"CNPJ"|"EMAIL"|"RANDOM">("EMAIL");

  // Gift form
  const [title, setTitle] = useState("");
  const [priceBRL, setPriceBRL] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const [autoUrl, setAutoUrl] = useState("");
  const [autoMsg, setAutoMsg] = useState<string | null>(null);

  return (
    <main className="min-h-dvh bg-[radial-gradient(900px_circle_at_50%_-10%,rgba(170,90,255,0.25),transparent_55%)] text-white">
      <div className="mx-auto max-w-5xl px-6 py-10">
        <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Seu Genie Box</h1>
            <p className="mt-1 text-sm text-white/70">Seu link público: <a className="underline decoration-white/15" href={publicUrl}>{publicUrl}</a></p>
          </div>
          <a className="text-sm text-white/70 underline decoration-white/15" href="/api/auth/signout">sair</a>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">Perfil</h2>
            <div className="mt-4 grid gap-3">
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
                placeholder="nome"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <textarea className="h-24 resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
                placeholder="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
                placeholder="avatarUrl (cole um link)"
                value={avatarUrl}
                onChange={(e) => setAvatarUrl(e.target.value)}
              />
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
                placeholder="coverUrl (cole um link)"
                value={coverUrl}
                onChange={(e) => setCoverUrl(e.target.value)}
              />

              <button
                className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/15"
                disabled={savingProfile}
                onClick={async () => {
                  setSavingProfile(true);
                  await fetch("/api/user/profile", { method: "POST", body: JSON.stringify({ name, bio, avatarUrl, coverUrl }) });
                  setSavingProfile(false);
                }}
              >
                salvar perfil
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">Pix (obrigatório)</h2>
            <p className="mt-2 text-sm text-white/70">Sua chave Pix fica criptografada no servidor.</p>

            <div className="mt-4 grid gap-3">
              <select
                className="rounded-2xl border border-white/10 bg-[#0b0417] px-4 py-3 text-sm outline-none"
                value={pixKeyType}
                onChange={(e) => setPixKeyType(e.target.value as any)}
              >
                <option value="PHONE">telefone</option>
                <option value="CPF">CPF</option>
                <option value="CNPJ">CNPJ</option>
                <option value="EMAIL">e-mail</option>
                <option value="RANDOM">chave aleatória</option>
              </select>

              <input
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
                placeholder="cole sua chave Pix"
                value={pixKey}
                onChange={(e) => setPixKey(e.target.value)}
              />

              <button
                className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/15"
                disabled={savingPix}
                onClick={async () => {
                  setSavingPix(true);
                  const r = await fetch("/api/user/pix", { method: "POST", body: JSON.stringify({ pixKey, pixKeyType }) });
                  await r.json();
                  setSavingPix(false);
                }}
              >
                salvar Pix
              </button>
            </div>
          </section>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">Criar presente (manual)</h2>
            <div className="mt-4 grid gap-3">
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none" placeholder="nome do presente" value={title} onChange={(e) => setTitle(e.target.value)} />
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none" placeholder="preço (ex: 199,90)" value={priceBRL} onChange={(e) => setPriceBRL(e.target.value)} />
              <textarea className="h-24 resize-none rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none" placeholder="descrição (opcional)" value={description} onChange={(e) => setDescription(e.target.value)} />
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none" placeholder="url do produto (opcional)" value={url} onChange={(e) => setUrl(e.target.value)} />
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none" placeholder="imagem (url)" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} />
              <button
                className="rounded-2xl bg-white/10 px-4 py-3 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/15"
                onClick={async () => {
                  await fetch("/api/gifts/create", {
                    method: "POST",
                    body: JSON.stringify({
                      title,
                      priceCents: toCents(priceBRL),
                      description: description || undefined,
                      url: url || undefined,
                      imageUrl: imageUrl || undefined
                    })
                  });
                  location.reload();
                }}
              >
                adicionar à lista
              </button>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h2 className="text-lg font-semibold">Adicionar por link (OG + “AI”)</h2>
            <p className="mt-2 text-sm text-white/70">Cole um link e nós sugerimos título/descrição/imagem (você edita e confirma).</p>
            <div className="mt-4 grid gap-3">
              <input className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none" placeholder="cole o link do produto" value={autoUrl} onChange={(e) => setAutoUrl(e.target.value)} />
              <button
                className="rounded-2xl border border-white/15 bg-transparent px-4 py-3 text-sm font-semibold hover:bg-white/5"
                onClick={async () => {
                  setAutoMsg(null);
                  const r = await fetch("/api/og", { method: "POST", body: JSON.stringify({ url: autoUrl }) });
                  const j = await r.json();
                  if (!j.ok) return setAutoMsg(j.error ?? "Falha ao ler link.");
                  const s = await fetch("/api/gifts/suggest", { method: "POST", body: JSON.stringify({ url: autoUrl, og: j.og }) });
                  const sj = await s.json();
                  if (!sj.ok) return setAutoMsg(sj.error ?? "Falha ao sugerir.");
                  setTitle(sj.suggestion.title ?? "");
                  setDescription(sj.suggestion.description ?? "");
                  setImageUrl(sj.suggestion.imageUrl ?? "");
                  setUrl(autoUrl);
                  setAutoMsg("Sugestão aplicada no formulário manual. Ajuste preço e confirme.");
                }}
              >
                gerar sugestão
              </button>
              {autoMsg && <p className="text-sm text-emerald-200">{autoMsg}</p>}
            </div>
          </section>
        </div>

        <section className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h2 className="text-lg font-semibold">Seus presentes</h2>
          <div className="mt-4 grid gap-3">
            {user.gifts.map((g: any) => {
              const brl = (g.priceCents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
              return (
                <div key={g.id} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{g.title}</h3>
                        <span className="text-xs text-white/60">{brl}</span>
                        <span className="text-xs text-white/50">• {g.status.toLowerCase()}</span>
                      </div>
                      {g.url ? <a className="text-sm text-white/70 underline decoration-white/15" href={g.url} target="_blank">link</a> : null}
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="rounded-xl border border-white/15 bg-transparent px-3 py-2 text-xs font-semibold hover:bg-white/5"
                        onClick={async () => {
                          await fetch("/api/gifts/toggle", { method: "POST", body: JSON.stringify({ giftId: g.id }) });
                          location.reload();
                        }}
                      >
                        {g.status === "HIDDEN" ? "mostrar" : "ocultar"}
                      </button>
                      <button
                        className="rounded-xl bg-white/10 px-3 py-2 text-xs font-semibold ring-1 ring-white/15 hover:bg-white/15"
                        onClick={async () => {
                          await fetch("/api/gifts/delete", { method: "POST", body: JSON.stringify({ giftId: g.id }) });
                          location.reload();
                        }}
                      >
                        remover
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </main>
  );
}
