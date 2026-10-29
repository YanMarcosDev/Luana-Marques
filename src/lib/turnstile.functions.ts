import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const VerifyInput = z.object({
  token: z.string().trim().min(1).max(4096),
});

/** Chave de teste da Cloudflare (sempre aprova) usada como fallback local. */
const TEST_SECRET = "1x0000000000000000000000000000000AA";

/**
 * Valida o token do Turnstile no servidor.
 * A secret real deve ser salva como TURNSTILE_SECRET_KEY.
 */
export const verifyTurnstile = createServerFn({ method: "POST" })
  .validator((data: unknown) => VerifyInput.parse(data))
  .handler(async ({ data }): Promise<{ success: boolean }> => {
    const secret = process.env.TURNSTILE_SECRET_KEY ?? TEST_SECRET;

    try {
      const response = await fetch(
        "https://challenges.cloudflare.com/turnstile/v0/siteverify",
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ secret, response: data.token }),
        },
      );

      if (!response.ok) return { success: false };

      const result = (await response.json()) as { success?: boolean };
      return { success: result.success === true };
    } catch (error) {
      console.error("turnstile verify failed", error);
      return { success: false };
    }
  });