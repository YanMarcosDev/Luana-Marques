import { useEffect, useRef, useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { siteConfig } from "@/config/site";
import { verifyTurnstile } from "@/lib/turnstile.functions";

const STORAGE_KEY = "human-verified-until";
const SCRIPT_ID = "cf-turnstile-script";
const SCRIPT_SRC =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

type TurnstileApi = {
  render: (
    el: HTMLElement,
    options: {
      sitekey: string;
      theme?: "dark" | "light" | "auto";
      callback: (token: string) => void;
      "error-callback"?: () => void;
      "expired-callback"?: () => void;
    },
  ) => string;
  reset: (id?: string) => void;
};

declare global {
  interface Window {
    turnstile?: TurnstileApi;
  }
}

export function hasValidHumanSession(): boolean {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return false;
    const until = Number(raw);
    return Number.isFinite(until) && until > Date.now();
  } catch {
    return false;
  }
}

function storeHumanSession() {
  try {
    const until = Date.now() + siteConfig.turnstile.sessionHours * 3600_000;
    localStorage.setItem(STORAGE_KEY, String(until));
  } catch {
    /* ignora */
  }
}

function loadScript(): Promise<void> {
  return new Promise((resolve, reject) => {
    if (window.turnstile) return resolve();
    const existing = document.getElementById(SCRIPT_ID) as HTMLScriptElement | null;
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("script")));
      return;
    }
    const script = document.createElement("script");
    script.id = SCRIPT_ID;
    script.src = SCRIPT_SRC;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("script"));
    document.head.appendChild(script);
  });
}

export function TurnstileGate({ onVerified }: { onVerified: () => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const widgetIdRef = useRef<string | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "checking" | "error">(
    "loading",
  );
  const verify = useServerFn(verifyTurnstile);

  useEffect(() => {
    let cancelled = false;

    const handleToken = async (token: string) => {
      if (cancelled) return;
      setStatus("checking");
      try {
        const result = await verify({ data: { token } });
        if (cancelled) return;
        if (result.success) {
          storeHumanSession();
          onVerified();
          return;
        }
        setStatus("error");
        window.turnstile?.reset(widgetIdRef.current ?? undefined);
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    loadScript()
      .then(() => {
        if (cancelled || !containerRef.current || !window.turnstile) return;
        widgetIdRef.current = window.turnstile.render(containerRef.current, {
          sitekey: siteConfig.turnstile.siteKey,
          theme: "dark",
          callback: (token) => void handleToken(token),
          "error-callback": () => setStatus("error"),
          "expired-callback": () => setStatus("ready"),
        });
        setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("error");
      });

    return () => {
      cancelled = true;
    };
  }, [onVerified, verify]);

  return (
    <div className="fixed inset-0 z-50 flex h-[100dvh] w-full items-center justify-center bg-background/80 px-5 py-8">
      <div className="animate-scale-in w-full max-w-sm rounded-3xl border border-white/10 bg-white/[0.045] p-7 text-center shadow-[0_24px_80px_-24px_rgba(0,0,0,0.9)] backdrop-blur-2xl">
        <h2 className="text-balance text-lg font-semibold leading-snug text-foreground">
          Verificação de segurança
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
          Confirme que você não é um robô para acessar o conteúdo.
        </p>

        <div className="mt-6 flex min-h-[70px] items-center justify-center">
          <div ref={containerRef} />
        </div>

        {status === "loading" && (
          <p className="text-xs text-muted-foreground">Carregando verificação…</p>
        )}
        {status === "checking" && (
          <p className="text-xs text-muted-foreground">Validando…</p>
        )}
        {status === "error" && (
          <p className="text-xs text-destructive">
            Não foi possível validar. Tente novamente.
          </p>
        )}
      </div>
    </div>
  );
}