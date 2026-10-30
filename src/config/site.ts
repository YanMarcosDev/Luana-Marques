/**
 * ÚNICO ARQUIVO A EDITAR.
 * Troque foto, nome, descrição e os dois links aqui.
 */
export const siteConfig = {
  name: "Luana Marques",
  description: "",
  /**
   * FOTO DE PERFIL — SUBSTITUA A URL ABAIXO PELA FOTO DEFINITIVA DA CRIADORA.
   * (é o único lugar onde a imagem é definida)
   */
  photo: "/luana-marques.jpg",
  seoTitle: "Luana Marques — Links Oficiais",
  seoDescription:
    "Acesse os canais oficiais de Luana Marques: Close Privê e Privacy. Conteúdo exclusivo.",
  links: {
    // Substitua pelas URLs reais
    telegram: "https://telegram.me/LuanaMarquescpbot",
    privacy: "https://privacy.com.br/@min_montebelo",
  },
  turnstile: {
    /**
     * Chave pública (site key) do Cloudflare Turnstile.
     * Defina VITE_TURNSTILE_SITE_KEY ou troque o valor abaixo.
     * O padrão é a chave de teste da Cloudflare (sempre aprova).
     */
    siteKey:
      import.meta.env.VITE_TURNSTILE_SITE_KEY ?? "1x00000000000000000000AA",
    /** Duração da sessão verificada, em horas. */
    sessionHours: 6,
  },
} as const;