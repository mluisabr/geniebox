import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashCode } from "@/lib/crypto";

export async function POST(req: Request) {
  const { userId, code } = await req.json();
  if (!userId || !code) return NextResponse.json({ ok: false, error: "Dados incompletos" }, { status: 400 });

  const now = new Date();
  const rec = await db.verificationCode.findFirst({
    where: {
      userId,
      kind: "PHONE",
      usedAt: null,
      expiresAt: { gt: now },
      codeHash: hashCode(code)
    },
    orderBy: { createdAt: "desc" }
  });

  if (!rec) return NextResponse.json({ ok: false, error: "Código inválido/expirado" }, { status: 400 });

  await db.$transaction([
    db.verificationCode.update({ where: { id: rec.id }, data: { usedAt: now } }),
    db.user.update({ where: { id: userId }, data: { phoneVerifiedAt: now } })
  ]);

  return NextResponse.json({ ok: true });
}
