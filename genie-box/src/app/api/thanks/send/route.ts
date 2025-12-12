import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { z } from "zod";

export async function POST(req: Request) {
  const parsed = z.object({
    purchaseId: z.string(),
    receiverId: z.string(),
    message: z.string().min(2).max(800)
  }).safeParse(await req.json());

  if (!parsed.success) return NextResponse.json({ ok: false, error: "Dados inválidos" }, { status: 400 });

  const purchase = await db.purchase.findUnique({
    where: { id: parsed.data.purchaseId },
    include: { gift: true }
  });
  if (!purchase || purchase.status !== "PAID") return NextResponse.json({ ok: false, error: "Compra não paga" }, { status: 400 });

  const thanks = await db.thankYou.create({
    data: {
      purchaseId: purchase.id,
      buyerId: purchase.buyerId,
      receiverId: parsed.data.receiverId,
      message: parsed.data.message
    }
  });

  return NextResponse.json({ ok: true, thanksId: thanks.id });
}
