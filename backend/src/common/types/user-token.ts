import { IAuthDTO } from '@mono/shared';

export type UserToken = {
  access_token: string;
  user: Omit<IAuthDTO['Read'], 'isActive'>;
};
