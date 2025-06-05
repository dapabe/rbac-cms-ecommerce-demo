import { IAuthDTOSchema } from '@mono/shared';

export type UserToken = {
  access_token: string;
  user: Omit<IAuthDTOSchema['Read'], 'isActive'>;
};
