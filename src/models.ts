import * as z from "zod";

export const Message = z.object({
  key_id: z.string(),
  wallet_address: z.string(),
  channel: z.string().optional(),
  content: z.string(),
});
