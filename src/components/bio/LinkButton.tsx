import type { ComponentType, SVGProps } from "react";
import { cn } from "@/lib/utils";

export type LinkButtonTone = "telegram" | "privacy";

export interface LinkButtonProps {
  href: string;
  label: string;
  sublabel?: string;
  icon: ComponentType<SVGProps<SVGSVGElement>>;
  tone?: LinkButtonTone;
  delay?: number;
}

const toneStyles: Record<LinkButtonTone, { shell: string; badge: string; icon: string; glow: string }> = {
  telegram: {
    shell:
      "border-telegram/40 bg-telegram/15 hover:border-telegram/70 hover:bg-telegram/25",
    badge: "border-telegram/40 bg-telegram/25",
    icon: "text-telegram",
    glow: "hover:shadow-[0_18px_45px_-14px_var(--telegram)]",
  },
  privacy: {
    shell:
      "border-white/15 bg-white/[0.06] hover:border-white/35 hover:bg-white/[0.12]",
    badge: "border-white/20 bg-white/[0.1]",
    icon: "text-foreground",
    glow: "hover:shadow-[0_18px_45px_-14px_rgba(255,255,255,0.5)]",
  },
};

export function LinkButton({
  href,
  label,
  sublabel,
  icon: Icon,
  tone = "privacy",
  delay = 0,
}: LinkButtonProps) {
  const styles = toneStyles[tone];

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ animationDelay: `${delay}ms`, animationFillMode: "backwards" }}
      className={cn(
        "group animate-fade-in relative flex w-full items-center gap-4 overflow-hidden rounded-2xl border px-5 py-4 shadow-lg shadow-black/40 backdrop-blur-xl transition-all duration-300 ease-out hover:-translate-y-0.5 active:scale-[0.975] sm:py-[1.15rem]",
        styles.shell,
        styles.glow,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 -left-1/3 w-1/3 skew-x-12 bg-gradient-to-r from-transparent via-white/15 to-transparent transition-all duration-700 group-hover:left-[110%]"
      />
      <span
        className={cn(
          "flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border transition-transform duration-300 group-hover:scale-105",
          styles.badge,
        )}
      >
        <Icon className={cn("h-5 w-5", styles.icon)} />
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block truncate text-[0.95rem] font-semibold text-foreground sm:text-base">
          {label}
        </span>
        {sublabel ? (
          <span className="block truncate text-xs text-muted-foreground">{sublabel}</span>
        ) : null}
      </span>
      <span className="shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-foreground">
        ↗
      </span>
    </a>
  );
}