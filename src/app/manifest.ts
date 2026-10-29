import type { MetadataRoute } from "next";

/* the web app manifest: name, colours and icons for "add to home screen" (the icons are made from the logo mark) */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "NXT Frame",
    short_name: "NXT Frame",
    description: "Websites die gevonden worden en verkopen.",
    lang: "nl",
    start_url: "/",
    display: "browser",
    theme_color: "#02261e",
    background_color: "#f7f1e8",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
      { src: "/icon-maskable-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
    ],
  };
}
