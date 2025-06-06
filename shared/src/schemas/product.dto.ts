import { IndexedClassDTO } from "src/types/indexed-class-dto";
import { z } from "zod";

export class ProductDTOSchema {
	static Read = z.object({
		id: z.number().int(),
		title: z.string().min(1).max(100),
		content: z.string().min(1).max(5000),
		summary: z.string().max(500).optional(),
		featuredImage: z.string().url().optional(),
		createdAt: z.coerce.date(),
		updatedAt: z.coerce.date(),
	});
	static Create = ProductDTOSchema.Read.pick({
		title: true,
		content: true,
		summary: true,
		featuredImage: true,
	});
	static Update = ProductDTOSchema.Create.partial();
}

export type IProductDTO = IndexedClassDTO<typeof ProductDTOSchema>;
