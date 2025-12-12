genie-box/
  README.md
  package.json
  next.config.mjs
  tsconfig.json
  postcss.config.mjs
  tailwind.config.ts
  prisma/
    schema.prisma
  src/
    app/
      layout.tsx
      globals.css
      page.tsx
      (auth)/
        entrar/page.tsx
        cadastrar/page.tsx
        verificar/page.tsx
      u/[username]/page.tsx
      api/
        auth/[...nextauth]/route.ts
        verify/email/request/route.ts
        verify/email/confirm/route.ts
        verify/phone/request/route.ts
        verify/phone/confirm/route.ts
        og/route.ts
        pix/checkout/route.ts
        gifts/buy/route.ts
        thanks/send/route.ts
    components/
      GenieBoxHero.tsx
      NoiseOverlay.tsx
      Button.tsx
      Input.tsx
      GiftCard.tsx
      PixCheckoutModal.tsx
    lib/
      auth.ts
      db.ts
      crypto.ts
      rateLimit.ts
      pix.ts
      og.ts
      validators.ts
      ai.ts
  .env.example
# Genie Box

## Setup
1) pnpm i (or npm i)
2) Create Postgres DB and set DATABASE_URL
3) cp .env.example .env
4) npx prisma migrate dev
5) npm run dev

## Notes
- Email + phone verification are enforced for Credentials sign-in.
- Pix key is encrypted at rest.
- Pix payload + QR is generated per purchase with a unique txid.
- Payment confirmation is MVP-manual; replace with PSP webhook later.

