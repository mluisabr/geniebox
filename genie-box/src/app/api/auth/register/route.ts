import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { createUserSchema } from "@/lib/validators";
import { hashPassword } from "@/lib/crypto";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = createUserSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos" }, { status: 400 });

  const { username, email, phone, password, name } = parsed.data;
  const lowerEmail = email.toLowerCase();

  const exists = await db.user.findFirst({ where: { OR: [{ username }, { email: lowerEmail }, { phone }] } });
  if (exists) return NextResponse.json({ ok: false, error: "Username, email ou telefone já cadastrado." }, { status: 400 });

  const passwordHash = await hashPassword(password);
  const user = await db.user.create({
    data: { username, email: lowerEmail, phone, passwordHash, name: name ?? null }
  });

  return NextResponse.json({ ok: true, userId: user.id });
}
