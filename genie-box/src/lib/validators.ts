import { z } from "zod";

export const usernameSchema = z
  .string()
  .min(3)
  .max(24)
  .regex(/^[a-z0-9_\.]+$/i, "Use letras, números, _ ou .");

export const phoneBRSchema = z
  .string()
  .min(10)
  .max(15)
  .regex(/^\+?55\d{10,13}$/, "Use formato +55DDDNUMERO (ex: +5511999999999)");

export const passwordSchema = z.string().min(8).max(128);

export const pixKeyTypeSchema = z.enum(["PHONE", "CPF", "CNPJ", "EMAIL", "RANDOM"]);

export const createUserSchema = z.object({
  username: usernameSchema,
  email: z.string().email(),
  phone: phoneBRSchema,
  password: passwordSchema,
  name: z.string().max(60).optional()
});

export const giftSchema = z.object({
  title: z.string().min(2).max(120),
  description: z.string().max(600).optional(),
  priceCents: z.number().int().min(100),
  url: z.string().url().optional(),
  imageUrl: z.string().url().optional()
});

export const pixSchema = z.object({
  pixKey: z.string().min(3).max(120),
  pixKeyType: pixKeyTypeSchema
});
