import GenieBoxHero from "@/components/GenieBoxHero";

export default function HomePage() {
  return (
    <main className="min-h-dvh">
      <GenieBoxHero />
      <section className="mx-auto max-w-5xl px-6 pb-20">
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold">Pix do jeitinho certo</h3>
            <p className="mt-2 text-sm text-white/70">
              Cada presente gera um Pix “copia e cola” + QR com referência única (txid).
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold">Perfil público e linkável</h3>
            <p className="mt-2 text-sm text-white/70">
              Compartilhe seu link em qualquer rede: /u/seuusername.
            </p>
          </div>
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur">
            <h3 className="text-lg font-semibold">Seguro por padrão</h3>
            <p className="mt-2 text-sm text-white/70">
              Senhas com Argon2id, Pix criptografado, verificação de email e telefone.
            </p>
          </div>
        </div>
      </section>
    </main>
  );
}
