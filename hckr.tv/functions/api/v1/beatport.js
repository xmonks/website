import { DOMParser } from "linkedom/cached";

/**
 * @param {EventContext<Env>} context
 */
export async function onRequestGet({ request }) {
  const qs = new URL(request.url).searchParams;
  /** @type Response */
  const resp = await fetch(
    `https://www.beatport.com/search?${new URLSearchParams({
      q: qs.get("track"),
      _pjax: "#pjax-inner-wrapper"
    })}`,
    {
      credentials: "include",
      headers: {
        "X-PJAX": "true",
        "X-PJAX-Container": "#pjax-inner-wrapper"
      },
      referrer: "https://www.beatport.com/",
      method: "GET",
      mode: "cors"
    }
  );
  const html = await resp.text();
  const document = new DOMParser().parseFromString(html, "text/html");
  const tracks = document.querySelectorAll(".bucket-item.track");
  if (!tracks.length) {
    return new Response(null, { status: 404 });
  }
  const [track] = tracks;
  return Response.json({
      "@context": "https://schema.org",
      "@type": "MusicRecording",
      byArtist: track.querySelector(".buk-track-artists").innerText.trim(),
      name: track.querySelector(".buk-track-primary-title").innerText.trim(),
      version: track.querySelector(".buk-track-remixed").innerText.trim(),
      genre: track.querySelector(".buk-track-genre").innerText.trim(),
      url: `https://www.beatport.com${track.querySelector(".buk-track-title a").getAttribute("href")}`,
      image: track.querySelector("img").getAttribute("src")
    }
  );
}
