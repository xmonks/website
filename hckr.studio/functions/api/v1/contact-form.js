/**
 * @param {EventContext<Env>} context
 */
export async function onRequestPost({ request, env }) {
  console.log({ url: request.url, headers: Array.from(request.headers), body: request.body.toString() });
  const raumeaToken = env.RAUMEA_POSTMARK_TOKEN;
  return new Response("ok", {status: 200});
}
