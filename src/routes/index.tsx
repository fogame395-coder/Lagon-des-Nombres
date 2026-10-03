import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { initAds, onGameOver } from "@/lib/ads";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lagon des Nombres" },
      { name: "description", content: "Jeu de nombres multilingue pour enfants : Lagon des Nombres." },
      { property: "og:title", content: "Lagon des Nombres" },
      { property: "og:description", content: "Jeu de nombres multilingue pour enfants." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showButton, setShowButton] = useState(true);

  useEffect(() => {
    initAds();
    const handler = (e: MessageEvent) => {
      if (e.data?.type === "lagon:game-over") onGameOver();
    };
    window.addEventListener("message", handler);
    const fsHandler = () => setIsFullscreen(Boolean(document.fullscreenElement));
    document.addEventListener("fullscreenchange", fsHandler);
    return () => {
      window.removeEventListener("message", handler);
      document.removeEventListener("fullscreenchange", fsHandler);
    };
  }, []);

  const toggleFullscreen = useCallback(() => {
    if (document.fullscreenElement) {
      void document.exitFullscreen();
    } else {
      void document.documentElement.requestFullscreen().catch(() => {});
    }
  }, []);

  // Masque le bouton après quelques secondes hors plein écran, le rend
  // toujours visible en plein écran pour pouvoir en sortir.
  useEffect(() => {
    if (isFullscreen) {
      setShowButton(true);
      return;
    }
    const t = setTimeout(() => setShowButton(false), 4000);
    return () => clearTimeout(t);
  }, [isFullscreen]);

  useEffect(() => {
    if (showButton || isFullscreen) return;
    const wake = () => setShowButton(true);
    window.addEventListener("mousemove", wake, { once: true });
    window.addEventListener("touchstart", wake, { once: true });
    return () => {
      window.removeEventListener("mousemove", wake);
      window.removeEventListener("touchstart", wake);
    };
  }, [showButton, isFullscreen]);

  return (
    <div className="fixed inset-0">
      <iframe
        src="/jeu.html"
        title="Lagon des Nombres"
        className="h-full w-full border-0"
        allow="autoplay; fullscreen"
      />
      <button
        type="button"
        onClick={toggleFullscreen}
        aria-label={isFullscreen ? "Quitter le plein écran" : "Mettre le jeu en plein écran"}
        className={`fixed right-3 top-3 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-xl shadow-lg backdrop-blur transition-opacity duration-300 hover:bg-white ${
          showButton ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      >
        {isFullscreen ? "✕" : "⛶"}
      </button>
    </div>
  );
}
