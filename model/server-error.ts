import { z } from 'zod';

export const IServerError__Schema = z.object({
  code: z.coerce.number(),
  userMessage: z.string(),
  fullMessage: z.string(),
});

export type IServerError = z.infer<typeof IServerError__Schema>;

export class ServerError extends Error implements IServerError {
  constructor(
    public code: number,
    public userMessage: string,
    public fullMessage: string
  ) {
    super(userMessage);
  }
}
