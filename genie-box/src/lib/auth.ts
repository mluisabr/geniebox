import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import AppleProvider from "next-auth/providers/apple";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";
import { verifyPassword } from "./crypto";
import { z } from "zod";

export const authOptions: NextAuthOptions = {
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Email/Telefone",
      credentials: {
        login: { label: "Email ou Telefone", type: "text" },
        password: { label: "Senha", type: "password" }
      },
      async authorize(creds) {
        const parsed = z.object({
          login: z.string().min(3),
          password: z.string().min(8)
        }).safeParse(creds);

        if (!parsed.success) return null;

        const login = parsed.data.login.trim().toLowerCase();
        const user = await db.user.findFirst({
          where: { OR: [{ email: login }, { phone: login }, { username: login }] }
        });
        if (!user || !user.passwordHash) return null;

        const ok = await verifyPassword(user.passwordHash, parsed.data.password);
        if (!ok) return null;

        if (!user.emailVerifiedAt || !user.phoneVerifiedAt) return null;

        return { id: user.id, name: user.name ?? user.username, email: user.email };
      }
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? ""
    }),
    AppleProvider({
      clientId: process.env.APPLE_CLIENT_ID ?? "",
      clientSecret: process.env.APPLE_CLIENT_SECRET ?? ""
    })
  ],
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider !== "credentials") {
        const email = user.email?.toLowerCase();
        if (!email) return false;

        const existing = await db.user.findUnique({ where: { email } });
        if (!existing) {
          await db.user.create({
            data: {
              email,
              phone: `+55` + Math.floor(1e10 + Math.random() * 9e10).toString(),
              username: `user_${Math.random().toString(16).slice(2, 10)}`,
              emailVerifiedAt: new Date()
            }
          });
        } else if (!existing.emailVerifiedAt) {
          await db.user.update({ where: { id: existing.id }, data: { emailVerifiedAt: new Date() } });
        }
      }
      return true;
    },
    async jwt({ token }) {
      if (!token.email) return token;
      const u = await db.user.findUnique({ where: { email: token.email.toLowerCase() } });
      if (u) token.sub = u.id;
      return token;
    }
  },
  pages: { signIn: "/entrar" }
};
