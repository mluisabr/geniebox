import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import DashboardClient from "./ui";

export default async function AppDashboard() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return (
      <main className="min-h-dvh grid place-items-center text-white">
        <a className="underline decoration-white/15" href="/entrar">Você precisa entrar.</a>
      </main>
    );
  }

  const user = await db.user.findUnique({
    where: { email: session.user.email.toLowerCase() },
    include: { gifts: { orderBy: { createdAt: "desc" } } }
  });

  if (!user) {
    return (
      <main className="min-h-dvh grid place-items-center text-white">
        <p>Usuário não encontrado.</p>
      </main>
    );
  }

  return <DashboardClient user={user} />;
}
