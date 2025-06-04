import { AuthDTOSchema } from 'src/auth/dto/auth.dto';

export type UserToken = {
  access_token: string;
  user: Omit<AuthDTOSchema['Read'], 'isActive'>;
};
