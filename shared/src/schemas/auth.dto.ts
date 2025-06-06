import { z } from "zod";
import { IndexedClassDTO } from "../types/indexed-class-dto";
import { UserRole } from "../enums/user.enums";

export class AuthDTOSchema {
	static Read = z.object({
		id: z.number(),
		username: z.string(),
		role: z.nativeEnum(UserRole),
		isActive: z.boolean(),
	});

	static UserCommon = AuthDTOSchema.Read.omit({
		id: true,
		isActive: true,
		role: true,
	}).extend({
		password: z.string().trim().min(6).max(100),
	});

	static UserGuest = z.object({
		recaptchaToken: z.string().trim().min(1),
	});
}

export type IAuthDTO = IndexedClassDTO<typeof AuthDTOSchema>;
