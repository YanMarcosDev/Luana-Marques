import { siteConfig } from "@/config/site";
import { LinkButton } from "./LinkButton";
import { TelegramIcon } from "./BrandIcons";
import { CopyLinkButton } from "./CopyLinkButton";

export function BioPage() {
  return (
    <main className="relative z-10 mx-auto flex min-h-[100dvh] w-full max-w-md flex-col items-center justify-center px-6 py-12 text-center">
      <div className="animate-scale-in group relative">
        <div
          aria-hidden="true"
          className="absolute -inset-6 rounded-full bg-white/15 blur-3xl transition-opacity duration-500 group-hover:opacity-80"
        />
        {/* FOTO DA CRIADORA — para trocar a imagem, edite `photo` em src/config/site.ts */}
        <img
          src={siteConfig.photo}
          alt={`Foto de ${siteConfig.name}`}
          width={180}
          height={180}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          className="relative h-[150px] w-[150px] rounded-full border border-white/70 object-cover shadow-[0_0_45px_-10px_rgba(255,255,255,0.45)] transition-transform duration-500 ease-out group-hover:scale-[1.04] sm:h-[180px] sm:w-[180px]"
        />
      </div>

      <h1
        style={{ animationDelay: "80ms", animationFillMode: "backwards" }}
        className="animate-fade-in mt-6 text-2xl font-semibold tracking-tight text-foreground sm:text-3xl"
      >
        {siteConfig.name}
      </h1>
      <p
        style={{ animationDelay: "140ms", animationFillMode: "backwards" }}
        className="animate-fade-in mt-3 max-w-xs text-pretty text-sm leading-relaxed text-muted-foreground sm:max-w-sm"
      >
        {siteConfig.description}
      </p>

      <div className="mt-8 flex w-full flex-col gap-3.5">
        <LinkButton
          href={siteConfig.links.telegram}
          label="Entrar no Telegram"
          sublabel="Canal exclusivo"
          icon={TelegramIcon}
          tone="telegram"
          delay={220}
        />
      </div>

      <div
        style={{ animationDelay: "400ms", animationFillMode: "backwards" }}
        className="animate-fade-in mt-7"
      >
        <CopyLinkButton />
      </div>

      <footer
        style={{ animationDelay: "480ms", animationFillMode: "backwards" }}
        className="animate-fade-in mt-12 text-[0.7rem] tracking-wide text-muted-foreground/70"
      >
        Conteúdo destinado exclusivamente para maiores de 18 anos.
      </footer>
    </main>
  );
}