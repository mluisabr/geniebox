import NoiseOverlay from "./NoiseOverlay";
import Link from "next/link";

export default function GenieBoxHero() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(1200px_circle_at_50%_15%,rgba(200,140,255,0.25),transparent_55%),radial-gradient(900px_circle_at_50%_110%,rgba(140,80,255,0.22),transparent_60%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(15,8,26,0.2),rgba(10,4,18,0.9))]" />
      <NoiseOverlay />

      <div className="relative mx-auto flex min-h-[88dvh] max-w-6xl flex-col items-center justify-center px-6 text-center">
        <div className="relative mb-10">
          <div className="h-48 w-48 rounded-[38px] bg-[linear-gradient(145deg,rgba(255,255,255,0.06),rgba(255,255,255,0.01))] shadow-[0_30px_80px_rgba(0,0,0,0.55)]" />
          <div className="pointer-events-none absolute inset-0 rounded-[38px] ring-1 ring-white/10" />
          <div className="pointer-events-none absolute inset-0 rounded-[38px] shadow-[inset_0_0_0_2px_rgba(255,255,255,0.06)]" />
          <div className="pointer-events-none absolute -inset-1 rounded-[42px] bg-[radial-gradient(120px_circle_at_35%_25%,rgba(255,255,255,0.18),transparent_55%)] blur-[2px]" />
          <div className="pointer-events-none absolute inset-[10px] rounded-[28px] bg-[linear-gradient(180deg,rgba(0,0,0,0.10),rgba(0,0,0,0.35))]" />
          <div className="pointer-events-none absolute inset-[10px] rounded-[28px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.07)]" />
        </div>

        <p className="text-sm tracking-wide text-white/70">O site mais esperado chegou no momento perfeito.</p>
        <p className="mt-2 text-sm tracking-wide text-white/70">Suas preces foram ouvidas</p>

        <h1 className="mt-6 max-w-3xl text-balance text-3xl font-semibold leading-tight text-white md:text-5xl">
          Faça muito mais do que três pedidos para os gênios da lâmpada da internet
        </h1>

        <p className="mt-4 max-w-2xl text-pretty text-base text-white/70 md:text-lg">
          Genie Box é seu perfil compartilhável de desejos — e o jeito mais simples de pessoas te presentearem via Pix.
        </p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row">
          <Link
            href="/cadastrar"
            className="rounded-2xl bg-white/10 px-6 py-3 text-sm font-semibold text-white shadow-[0_10px_30px_rgba(0,0,0,0.35)] ring-1 ring-white/15 backdrop-blur transition hover:bg-white/15"
          >
            Crie a sua lista AGORA e veja!
          </Link>
          <Link
            href="/entrar"
            className="rounded-2xl border border-white/15 bg-transparent px-6 py-3 text-sm font-semibold text-white/90 transition hover:bg-white/5"
          >
            Entrar
          </Link>
        </div>

        <div className="mt-14 h-px w-full max-w-2xl bg-gradient-to-r from-transparent via-white/15 to-transparent" />
      </div>
    </section>
  );
}
