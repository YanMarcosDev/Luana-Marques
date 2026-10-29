import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { AgeGate, hasStoredConsent } from "@/components/bio/AgeGate";
import { TurnstileGate, hasValidHumanSession } from "@/components/bio/TurnstileGate";
import { BioPage } from "@/components/bio/BioPage";
import { ParticleField } from "@/components/bio/ParticleField";
import { siteConfig } from "@/config/site";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: siteConfig.seoTitle },
      { name: "description", content: siteConfig.seoDescription },
      { name: "theme-color", content: "#090909" },
      { property: "og:title", content: siteConfig.seoTitle },
      { property: "og:description", content: siteConfig.seoDescription },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  component: Index,
});

function Index() {
  const [ready, setReady] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    setConfirmed(hasStoredConsent());
    setVerified(hasValidHumanSession());
    setReady(true);
  }, []);

  const handleVerified = useCallback(() => setVerified(true), []);

  return (
    <div className="relative min-h-[100dvh] overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-[-18%] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-white/[0.07] blur-[120px]"
      />
      <ParticleField />
      {!ready ? null : !confirmed ? (
        <AgeGate onEnter={() => setConfirmed(true)} />
      ) : !verified ? (
        <TurnstileGate onVerified={handleVerified} />
      ) : (
        <BioPage />
      )}
    </div>
  );
}
