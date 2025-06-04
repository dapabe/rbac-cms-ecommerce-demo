import { z } from "zod";
import { IndexedClassDTO } from "../types/indexed-class-dto";
import { UserRole } from "../enums/user.enums";

export class AuthDTO {
	static Read = z.object({
		id: z.number().int(),
		username: z.string().min(3).max(20).default("guest"),
		role: z.nativeEnum(UserRole),
		isActive: z.boolean(),
	});

	static LogIn = AuthDTO.Read.omit({
		id: true,
		isActive: true,
		role: true,
	}).extend({
		password: z.string().min(6).max(100).default("guest"),
	});
}

export type IAuthDTOSchema = IndexedClassDTO<typeof AuthDTO>;
