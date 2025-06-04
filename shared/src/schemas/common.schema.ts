import { z } from "zod";

export const CoercedIntegerSchema = z.coerce.number().positive().int();
