import { db } from "@/lib/db";
import GiftCard from "@/components/GiftCard";

export default async function PublicProfile({ params }: { params: { username: string } }) {
  const user = await db.user.findUnique({
    where: { username: params.username },
    include: { gifts: { where: { status: { in: ["AVAILABLE", "BOUGHT"] } }, orderBy: { createdAt: "desc" } } }
  });

  if (!user) return <div className="p-10 text-white/80">Perfil não encontrado.</div>;

  return (
    <main className="min-h-dvh bg-[radial-gradient(800px_circle_at_50%_-10%,rgba(170,90,255,0.25),transparent_55%)] text-white">
      <header className="mx-auto max-w-4xl px-6 pt-10">
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
          <div className="h-40 w-full bg-[linear-gradient(135deg,rgba(200,140,255,0.16),rgba(255,255,255,0.02))]" />
          <div className="-mt-10 flex items-end gap-4 px-6 pb-6">
            <div className="h-20 w-20 overflow-hidden rounded-2xl bg-white/10 ring-1 ring-white/15">
              {user.avatarUrl ? <img src={user.avatarUrl} alt="" className="h-full w-full object-cover" /> : null}
            </div>
            <div className="pb-1">
              <h1 className="text-2xl font-semibold">@{user.username}</h1>
              {user.bio && <p className="mt-1 text-sm text-white/70">{user.bio}</p>}
            </div>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-6 py-10">
        <h2 className="text-lg font-semibold">Lista de desejos</h2>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {user.gifts.map((g) => (
            <GiftCard key={g.id} gift={g} />
          ))}
        </div>
      </section>
    </main>
  );
}
