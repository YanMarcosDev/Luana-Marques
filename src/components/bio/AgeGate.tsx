import { useState } from "react";

const STORAGE_KEY = "age-confirmed-18";

export function hasStoredConsent() {
  try {
    return localStorage.getItem(STORAGE_KEY) === "true";
  } catch {
    return false;
  }
}

export function storeConsent() {
  try {
    localStorage.setItem(STORAGE_KEY, "true");
  } catch {
    /* ignora */
  }
}

export function AgeGate({ onEnter }: { onEnter: () => void }) {
  const [denied, setDenied] = useState(false);

  if (denied) {
    return (
      <div className="fixed inset-0 z-50 flex h-[100dvh] w-full items-center justify-center bg-background px-5 py-8">
        <div className="animate-scale-in w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.045] p-7 text-center shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
          <h1 className="text-balance text-lg font-semibold leading-snug text-foreground">
            Este conteúdo é destinado apenas para maiores de 18 anos.
          </h1>
          <button
            type="button"
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              } else {
                window.location.href = "https://www.google.com";
              }
            }}
            className="mt-7 w-full rounded-2xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-transform duration-200 hover:opacity-90 active:scale-[0.97]"
          >
            Voltar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex h-[100dvh] w-full items-center justify-center bg-background/80 px-5 py-8">
      <div className="animate-scale-in w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.045] p-7 text-center shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
        <span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-white/15 bg-white/[0.06] text-sm font-semibold tracking-widest text-foreground">
          18+
        </span>
        <h1 className="mt-6 text-balance text-lg font-semibold leading-snug text-foreground">
          Este conteúdo é destinado exclusivamente para maiores de 18 anos.
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Ao continuar, você declara que possui 18 anos ou mais e concorda em acessar
          conteúdo destinado ao público adulto.
        </p>
        <div className="mt-7 flex flex-col gap-3">
          <button
            type="button"
            onClick={() => {
              storeConsent();
              onEnter();
            }}
            className="w-full rounded-2xl bg-foreground px-6 py-3.5 text-sm font-semibold text-background transition-transform duration-200 hover:opacity-90 active:scale-[0.97]"
          >
            Tenho mais de 18 anos
          </button>
          <button
            type="button"
            onClick={() => setDenied(true)}
            className="w-full rounded-2xl border border-white/10 bg-white/[0.03] px-6 py-3.5 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-white/[0.07] hover:text-foreground active:scale-[0.97]"
          >
            Não tenho 18 anos
          </button>
        </div>
      </div>
    </div>
  );
}