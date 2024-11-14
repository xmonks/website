import { DOMParser } from "linkedom/cached";

export async function onRequestGet({ request }) {
  const url = new URL(request.url);
  const artist = url.searchParams.get("artist") ?? "Alessio_Busta";
  const resp = await fetch(`https://serato.com/playlists/${artist}/live`);
  const html = await resp.text();
  const document = new DOMParser().parseFromString(html, "text/html");
  const playlist = document.querySelectorAll(".playlist-trackname");
  if (!playlist.length) {
    return new Response("Not playing", { status: 404 });
  }
  const currentSong = playlist.at(-1).innerText.trim();
  return new Response(currentSong);
}
