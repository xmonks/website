import { jsonLd } from "./structured-data-extractor/json-ld.js";
import { metaTags } from "./structured-data-extractor/meta-tags.js";
import { microdata } from "./structured-data-extractor/microdata.js";

/**
 * @param {Document} document
 * @param {Record<string, any>} [options]
 */
export function parseStructuredData(document, options) {
  return Object.fromEntries([
    ["metatags", Object.fromEntries(metaTags(document))],
    ["jsonld", Object.fromEntries(jsonLd(document, options))],
    [
      "microdata",
      microdata(document, () => undefined, options).map((m) => Object.fromEntries(m)),
    ],
    // TODO: RDFa
  ]);
}
