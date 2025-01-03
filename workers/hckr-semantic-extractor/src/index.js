import { DOMParser } from "linkedom/cached";
import { parseStructuredData } from "./structured-data-extractor";

function parseHTML(text) {
  const parser = new DOMParser();
  const document = parser.parseFromString(text, "text/html");
  return { document };
}

export default {
  /*
   * @param {Request} request
   * @param {Env} env
   * @param {ExecutionContext} ctx
   */
  async fetch(request, env, ctx) {
    const { searchParams } = new URL(request.url);
    if (searchParams.get("token") !== env.SEMANTIC_EXTRACTOR_SECRET) {
      return new Response(null, { status: 401 });
    }
    if (!searchParams.has("url")) {
      return new Response(null, { status: 400 });
    }

    const url = searchParams.get("url");
    console.log(`Extracting structured data from ${url}`)
    const resp = await fetch(url);
    const html = await resp.text();
    const { document } = parseHTML(html);
    const result = parseStructuredData(document);
    return Response.json({ url, title: document.title, ...result });
  },
};
