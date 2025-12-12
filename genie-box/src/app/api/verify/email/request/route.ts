import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { hashCode, randomNumericCode } from "@/lib/crypto";
import { rateLimit } from "@/lib/rateLimit";

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for") ?? "local";
  const rl = rateLimit(`email:req:${ip}`, 5, 60_000);
  if (!rl.ok) return NextResponse.json({ ok: false, error: "Muitas tentativas. Tente novamente." }, { status: 429 });

  const { userId } = await req.json();
  if (!userId) return NextResponse.json({ ok: false, error: "userId obrigatório" }, { status: 400 });

  const code = randomNumericCode(6);
  const expiresAt = new Date(Date.now() + 10 * 60_000);

  const user = await db.user.findUnique({ where: { id: userId } });
  if (!user) return NextResponse.json({ ok: false, error: "Usuário não encontrado" }, { status: 404 });

  await db.verificationCode.create({
    data: {
      userId,
      kind: "EMAIL",
      channel: "EMAIL",
      codeHash: hashCode(code),
      expiresAt
    }
  });

  // TODO: send email via provider (Resend/SMTP)
  return NextResponse.json({ ok: true, devCode: process.env.NODE_ENV === "development" ? code : undefined });
}
