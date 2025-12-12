export async function fetchOG(url: string) {
  const res = await fetch(url, { redirect: "follow", headers: { "user-agent": "GenieBoxBot/1.0" } });
  const html = await res.text();

  const og = (prop: string) => {
    const re = new RegExp(`<meta[^>]+property=["']${prop}["'][^>]+content=["']([^"']+)["'][^>]*>`, "i");
    return re.exec(html)?.[1];
  };

  return {
    title: og("og:title") ?? null,
    description: og("og:description") ?? null,
    image: og("og:image") ?? null,
    site: og("og:site_name") ?? null
  };
}
