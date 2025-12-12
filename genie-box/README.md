# Genie Box 🇧🇷✨

Starter repo for a WishTender-like wishlist/sponsoring website focused on Brazil + Pix.

## Tech
- Next.js (App Router) + TypeScript + Tailwind
- Prisma + Postgres
- NextAuth (Credentials + Google + Apple)
- Argon2id passwords + encrypted Pix key at rest
- Email + phone verification (code-based)

## Quickstart
1) `cp .env.example .env` and fill env vars
2) Create a Postgres DB and set `DATABASE_URL`
3) `npm i`
4) `npx prisma migrate dev`
5) `npm run dev`

## MVP notes
- Pix checkout generates a unique txid each time and renders a QR + “copia e cola”.
- Payment confirmation is **manual** via button (replace with PSP/webhook later).
- OAuth users must complete onboarding (set username + phone + verify phone).

## Routes
- `/` landing
- `/cadastrar` register + onboarding starter
- `/verificar` verify email + phone
- `/app` dashboard (profile + Pix + gifts)
- `/u/[username]` public profile/wishlist
