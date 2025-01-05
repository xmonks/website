import { jsonLd } from "./structured-data-extractor/json-ld.js";
import { metaTags } from "./structured-data-extractor/meta-tags.js";
import { microdata } from "./structured-data-extractor/microdata.js";

// import { rdfa } from "./structured-data-extractor/rdfa.js";

/**
 * @param {Document} document
 * @param {Record<string, any>} [options]
 */
export function parseStructuredData(document, options) {
  return Object.fromEntries([
    ["metatags", metaTags(document)],
    ["jsonld", jsonLd(document, options)],
    ["microdata", microdata(document, () => undefined, options)],
    // ["rdfa", rdfa(document, options)]
  ]);
}
