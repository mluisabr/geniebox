import PixCheckoutModal from "./PixCheckoutModal";

export default function GiftCard({ gift }: { gift: any }) {
  const brl = (gift.priceCents / 100).toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-base font-semibold">{gift.title}</h3>
          <p className="mt-1 text-sm text-white/70">{brl}</p>
        </div>

        {gift.status === "BOUGHT" ? (
          <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70 ring-1 ring-white/10">
            comprado
          </span>
        ) : (
          <PixCheckoutModal giftId={gift.id} />
        )}
      </div>

      {gift.description && <p className="mt-3 text-sm text-white/70">{gift.description}</p>}
      {gift.url && (
        <a className="mt-3 inline-block text-sm text-white/80 underline decoration-white/20" href={gift.url} target="_blank">
          ver link
        </a>
      )}
    </div>
  );
}
