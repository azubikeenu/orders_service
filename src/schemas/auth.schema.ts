import { object, string, TypeOf } from 'zod';

export const loginSchema = object({
  body: object({
    email: string({
      required_error: 'Email is required',
    }),
    password: string({
      required_error: 'Password is required',
    }),

    token : string().optional()
  }),
});


export type loginInput = TypeOf<typeof loginSchema>;