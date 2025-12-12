import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { usernameSchema } from "@/lib/validators";

export async function POST(req: Request) {
  const { username } = await req.json();
  const parsed = usernameSchema.safeParse(username);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Username inválido." }, { status: 400 });

  const exists = await db.user.findUnique({ where: { username: parsed.data } });
  if (exists) return NextResponse.json({ ok: false, error: "Username já está em uso." }, { status: 400 });

  return NextResponse.json({ ok: true });
}
