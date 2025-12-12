import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  const parsed = z.object({ purchaseId: z.string(), buyerId: z.string().optional() }).safeParse(await req.json());
  if (!parsed.success) return NextResponse.json({ ok: false, error: "Dados inválidos" }, { status: 400 });

  const purchase = await db.purchase.findUnique({ where: { id: parsed.data.purchaseId }, include: { gift: true } });
  if (!purchase || purchase.status !== "PENDING") return NextResponse.json({ ok: false, error: "Compra inválida" }, { status: 400 });

  const now = new Date();

  await db.$transaction([
    db.purchase.update({
      where: { id: purchase.id },
      data: { status: "PAID", paidAt: now, buyerId: parsed.data.buyerId ?? null }
    }),
    db.gift.update({
      where: { id: purchase.giftId },
      data: { status: "BOUGHT", boughtAt: now, boughtById: parsed.data.buyerId ?? null }
    })
  ]);

  return NextResponse.json({ ok: true });
}
