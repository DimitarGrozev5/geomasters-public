import { z } from 'zod';
import {
  EkatteData,
  EkatteData_Schema,
  OblastData,
} from '../../../../data/ekatte';

/**
 * null - no selection
 * string - oblast selected
 * EkatteData - settlement selected
 */
export const EkatteFormType_Schema = z.union([
  z.null(),
  EkatteData_Schema,
  z.string(),
]);

export const MsgUs_FormInputs_Schema = z.object({
  name: z.string(),
  email: z.union([
    z.string().length(0, 'Въведете валиден имейл'),
    z.string().email('Въведете валиден имейл'),
  ]),
  phone: z.string().min(5, 'Моля въведете валиден телефон'),
  hasViber: z.boolean(),
  ekatte: EkatteFormType_Schema,
  problemDescription: z.string().min(1, 'Моля опишете проблема си'),
  meansOfContact: z.union([
    z.literal('phone'),
    z.literal('email'),
    z.literal('viber'),
  ]),
  recaptchaToken: z.string(),
});

export type MsgUs_FormInputs = z.infer<typeof MsgUs_FormInputs_Schema>;
// export type MsgUs_FormInputs1 = {
//   name: string;
//   email: string;
//   phone: string;
//   hasViber: boolean;
//   ekatte: EkatteFormType;
//   problemDescription: string;
//   meansOfContact: 'phone' | 'email' | 'viber';
// };

export type EkatteFormType = z.infer<typeof EkatteFormType_Schema>;
// export type EkatteFormType = null | string | EkatteData;
