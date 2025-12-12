import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { pixSchema } from "@/lib/validators";
import { encryptString } from "@/lib/crypto";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });

  const body = await req.json();
  const parsed = pixSchema.safeParse(body);
  if (!parsed.success) return NextResponse.json({ ok: false, error: parsed.error.issues[0]?.message ?? "Dados inválidos" }, { status: 400 });

  const email = session.user.email.toLowerCase();
  await db.user.update({
    where: { email },
    data: {
      pixKeyEnc: encryptString(parsed.data.pixKey),
      pixKeyType: parsed.data.pixKeyType
    }
  });

  return NextResponse.json({ ok: true });
}
