import { number, string, z } from "zod";

const validationSchemas = z.object({
  first_name: z.string().min(2).max(50),
  last_name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().regex(/^\d{10}$/),
  id: z.string(),
});

type validForm = z.infer<typeof validationSchemas>;

export type { validForm };
export { validationSchemas };
