"use client";

import { useState } from "react";

export default function PixCheckoutModal({ giftId }: { giftId: string }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any>(null);
  const [err, setErr] = useState<string | null>(null);

  async function start() {
    setLoading(true);
    setErr(null);
    const res = await fetch("/api/pix/checkout", { method: "POST", body: JSON.stringify({ giftId }) });
    const json = await res.json();
    if (!json.ok) setErr(json.error ?? "Erro ao gerar Pix.");
    setData(json.ok ? json : null);
    setLoading(false);
  }

  return (
    <>
      <button
        className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/15"
        onClick={() => {
          setOpen(true);
          start();
        }}
      >
        presentear
      </button>

      {open && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-6">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-[#0b0417] p-6 text-white shadow-[0_30px_100px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between">
              <h4 className="text-lg font-semibold">Pagar com Pix</h4>
              <button className="text-white/70 hover:text-white" onClick={() => setOpen(false)}>✕</button>
            </div>

            {loading && <p className="mt-4 text-sm text-white/70">Gerando QR…</p>}
            {err && <p className="mt-4 text-sm text-rose-200">{err}</p>}

            {data && (
              <div className="mt-5 grid gap-4">
                <img src={data.qrDataUrl} alt="QR Pix" className="mx-auto w-56 rounded-2xl bg-white p-2" />
                <textarea
                  className="h-28 w-full resize-none rounded-2xl border border-white/10 bg-white/5 p-3 text-xs text-white/80"
                  value={data.payload}
                  readOnly
                />
                <button
                  className="rounded-2xl bg-white/10 px-4 py-2 text-sm font-semibold ring-1 ring-white/15 hover:bg-white/15"
                  onClick={async () => {
                    await navigator.clipboard.writeText(data.payload);
                  }}
                >
                  copiar Pix
                </button>

                <button
                  className="rounded-2xl border border-white/15 bg-transparent px-4 py-2 text-sm font-semibold text-white/90 hover:bg-white/5"
                  onClick={async () => {
                    await fetch("/api/gifts/buy", { method: "POST", body: JSON.stringify({ purchaseId: data.purchaseId }) });
                    location.reload();
                  }}
                >
                  já paguei (confirmar)
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
