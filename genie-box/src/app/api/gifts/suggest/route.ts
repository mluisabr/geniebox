import { NextResponse } from "next/server";
import { aiSuggestGift } from "@/lib/ai";
import { z } from "zod";

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = z.object({
    url: z.string().url(),
    og: z.object({
      title: z.string().nullable(),
      description: z.string().nullable(),
      image: z.string().nullable(),
      site: z.string().nullable()
    })
  }).safeParse(body);

  if (!parsed.success) return NextResponse.json({ ok: false, error: "Dados inválidos" }, { status: 400 });

  const suggestion = await aiSuggestGift({ url: parsed.data.url, og: parsed.data.og });
  return NextResponse.json({ ok: true, suggestion });
}
