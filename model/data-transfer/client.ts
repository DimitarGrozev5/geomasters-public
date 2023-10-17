import { z } from 'zod';

export const POSTNewClient__Schema = z.object({
  name: z.string(),
  email: z.union([z.string().email(), z.string().length(0)]),
  phone: z.string(),
  hasViber: z.boolean(),
});

export type POSTNewClient__Data = z.infer<typeof POSTNewClient__Schema>;
