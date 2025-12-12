import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });

  const { giftId } = await req.json();
  const parsed = z.string().min(3).safeParse(giftId);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "giftId inválido" }, { status: 400 });

  const user = await db.user.findUnique({ where: { email: session.user.email.toLowerCase() } });
  if (!user) return NextResponse.json({ ok: false, error: "Usuário não encontrado" }, { status: 404 });

  const gift = await db.gift.findFirst({ where: { id: parsed.data, ownerId: user.id } });
  if (!gift) return NextResponse.json({ ok: false, error: "Presente não encontrado" }, { status: 404 });

  const next = gift.status === "HIDDEN" ? "AVAILABLE" : "HIDDEN";
  await db.gift.update({ where: { id: gift.id }, data: { status: next as any } });

  return NextResponse.json({ ok: true, status: next });
}
