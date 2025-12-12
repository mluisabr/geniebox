import { NextResponse } from "next/server";
import { fetchOG } from "@/lib/og";
import { z } from "zod";

export async function POST(req: Request) {
  const { url } = await req.json();
  const parsed = z.string().url().safeParse(url);
  if (!parsed.success) return NextResponse.json({ ok: false, error: "URL inválida" }, { status: 400 });

  const og = await fetchOG(parsed.data);
  return NextResponse.json({ ok: true, og });
}
