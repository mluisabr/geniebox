import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { giftSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });

  const body = await req.json();
  const parsed = giftSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos" }, { status: 400 });

  const user = await db.user.findUnique({ where: { email: session.user.email.toLowerCase() } });
  if (!user) return NextResponse.json({ ok: false, error: "Usuário não encontrado" }, { status: 404 });

  const gift = await db.gift.create({
    data: { ...parsed.data, ownerId: user.id }
  });

  return NextResponse.json({ ok: true, giftId: gift.id });
}
