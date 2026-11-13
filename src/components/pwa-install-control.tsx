"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";

type InstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: "accepted" | "dismissed"; platform: string }>;
};

export function PwaInstallControl() {
  const [installEvent, setInstallEvent] = useState<InstallPromptEvent | null>(null);
  const [installed, setInstalled] = useState(false);
  const [showInstallHelp, setShowInstallHelp] = useState(false);
  const [isIos, setIsIos] = useState(false);
  const [isAndroid, setIsAndroid] = useState(false);

  useEffect(() => {
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      ("standalone" in navigator &&
        Boolean((navigator as Navigator & { standalone?: boolean }).standalone));
    const appleMobile =
      /iPhone|iPad|iPod/i.test(navigator.userAgent) ||
      (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    setIsAndroid(/Android/i.test(navigator.userAgent));

    setInstalled(standalone);
    setIsIos(appleMobile);

    if (process.env.NODE_ENV === "production" && "serviceWorker" in navigator) {
      void navigator.serviceWorker
        .register("/sw.js", { scope: "/", updateViaCache: "none" })
        .catch(() => undefined);
    }

    const onBeforeInstall = (event: Event) => {
      event.preventDefault();
      setInstallEvent(event as InstallPromptEvent);
    };
    const onInstalled = () => {
      setInstalled(true);
      setInstallEvent(null);
    };

    window.addEventListener("beforeinstallprompt", onBeforeInstall);
    window.addEventListener("appinstalled", onInstalled);
    return () => {
      window.removeEventListener("beforeinstallprompt", onBeforeInstall);
      window.removeEventListener("appinstalled", onInstalled);
    };
  }, []);

  async function install() {
    if (installEvent) {
      await installEvent.prompt();
      await installEvent.userChoice;
      setInstallEvent(null);
      return;
    }
    setShowInstallHelp(true);
  }

  if (installed) return null;

  return (
    <>
      <button type="button" className="install-control" onClick={install}>
        <Icon name="download" />
        <span>Instalar app</span>
      </button>
      {showInstallHelp && (
        <div className="install-dialog-backdrop">
          <section
            className="install-dialog"
            role="dialog"
            aria-modal="true"
            aria-labelledby="install-title"
          >
            <button
              type="button"
              className="install-dialog-close"
              aria-label="Fechar instruções"
              onClick={() => setShowInstallHelp(false)}
            >
              <Icon name="close" />
            </button>
            <span className="install-dialog-mark" aria-hidden="true">
              E
            </span>
            <p className="eyebrow">EMILLY STUDIO NO SEU DISPOSITIVO</p>
            <h2 id="install-title">Leve seu estúdio para a tela inicial.</h2>
            {isIos ? (
              <ol>
                <li>Abra esta página no Safari.</li>
                <li>Toque em Compartilhar, na barra inferior.</li>
                <li>Escolha “Adicionar à Tela de Início”.</li>
              </ol>
            ) : isAndroid ? (
              <ol>
                <li>Abra esta página no Chrome.</li>
                <li>Toque no menu ⋮ do navegador.</li>
                <li>Escolha “Instalar app” ou “Adicionar à tela inicial”.</li>
              </ol>
            ) : (
              <ol>
                <li>No Chrome ou Edge, abra o menu do navegador.</li>
                <li>Escolha “Instalar Emilly Studio” ou o ícone de instalação na barra.</li>
                <li>Confirme para abrir o app em uma janela própria.</li>
              </ol>
            )}
            <p className="install-dialog-note">
              {isIos
                ? "A instalação pelo Safari abre o app em tela própria. Em outros navegadores do iPhone, essa opção pode não estar disponível."
                : "A disponibilidade e o nome da opção variam conforme o navegador. O app não será publicado em uma loja nesta etapa."}
            </p>
            <button
              type="button"
              className="install-dialog-done"
              onClick={() => setShowInstallHelp(false)}
            >
              Entendi
            </button>
          </section>
        </div>
      )}
    </>
  );
}
