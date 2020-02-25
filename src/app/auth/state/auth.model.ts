import { User } from '../../model/user';

export interface Auth {
  user: User;
  token: string;
  loading?: boolean;
}
