import { z } from 'zod';

export const LoginCredentials__Schema = z.object({
  email: z.string(),
  password: z.string(),
});

export type LoginCredentials = z.infer<typeof LoginCredentials__Schema>;
