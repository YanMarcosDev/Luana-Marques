import type { SVGProps } from "react";

/** Ícone oficial do Telegram (avião de papel). */
export function TelegramIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M21.94 4.3 18.9 19.1c-.23 1.02-.84 1.27-1.7.79l-4.7-3.47-2.27 2.19c-.25.25-.46.46-.94.46l.34-4.79 8.72-7.88c.38-.34-.08-.53-.59-.19L6.98 12.9l-4.64-1.45c-1.01-.32-1.03-1.01.21-1.5l18.14-6.99c.84-.31 1.57.19 1.25 1.34Z" />
    </svg>
  );
}

/** Ícone do Privacy (cadeado/acesso privado). */
export function PrivacyIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M12 2a5 5 0 0 0-5 5v2H6.5A2.5 2.5 0 0 0 4 11.5v8A2.5 2.5 0 0 0 6.5 22h11a2.5 2.5 0 0 0 2.5-2.5v-8A2.5 2.5 0 0 0 17.5 9H17V7a5 5 0 0 0-5-5Zm3 7H9V7a3 3 0 1 1 6 0v2Zm-3 4.25a1.75 1.75 0 0 1 .75 3.33V18a.75.75 0 0 1-1.5 0v-1.42A1.75 1.75 0 0 1 12 13.25Z" />
    </svg>
  );
}