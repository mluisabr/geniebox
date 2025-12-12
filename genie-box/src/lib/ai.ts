export async function aiSuggestGift(input: {
  url: string;
  og: { title: string | null; description: string | null; image: string | null; site: string | null };
}) {
  const title = (input.og.title ?? "Presente").slice(0, 120);
  const description = (input.og.description ?? "").slice(0, 240) || undefined;
  return { title, description, imageUrl: input.og.image ?? undefined };
}
