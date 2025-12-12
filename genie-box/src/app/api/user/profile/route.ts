import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return NextResponse.json({ ok: false, error: "Não autorizado" }, { status: 401 });

  const body = await req.json();
  const parsed = z.object({
    name: z.string().max(60).optional(),
    bio: z.string().max(500).optional(),
    avatarUrl: z.string().url().optional().or(z.literal("")),
    coverUrl: z.string().url().optional().or(z.literal(""))
  }).safeParse(body);

  if (!parsed.success) return NextResponse.json({ ok: false, error: "Dados inválidos" }, { status: 400 });

  const email = session.user.email.toLowerCase();
  await db.user.update({
    where: { email },
    data: {
      name: parsed.data.name ?? null,
      bio: parsed.data.bio ?? null,
      avatarUrl: parsed.data.avatarUrl ? parsed.data.avatarUrl : null,
      coverUrl: parsed.data.coverUrl ? parsed.data.coverUrl : null
    }
  });

  return NextResponse.json({ ok: true });
}
