"use client";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="error-screen" role="alert">
      <p className="eyebrow">UM PEQUENO INTERVALO</p>
      <h1>Não foi possível abrir este espaço.</h1>
      <p>Tente novamente. Nenhuma ação desta prévia foi salva.</p>
      <button type="button" onClick={() => reset()}>
        Tentar novamente
      </button>
    </main>
  );
}
