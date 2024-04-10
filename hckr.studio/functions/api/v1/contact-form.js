/**
 * @param {EventContext<Env>} context
 */
export async function onRequestPost({ request, env }) {
  let url = new URL(request.url);
  const client = url.searchParams.get("client");
  const origin = request.headers.get("origin");
  if (client === "raumea.cz" && origin === "https://www.raumea.cz") {
    const raumeaToken = env.RAUMEA_POSTMARK_TOKEN;
    console.log(request.body);
    return new Response("ok", {status: 200});
  }
  return new Response(null, {status: 400});
}
