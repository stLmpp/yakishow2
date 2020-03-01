import { CreateInstance } from '../core/create-instance/create-instance.interceptor';

@CreateInstance()
export class User {
  creationDate: Date;
  lastUpdateDate: Date;
  id: number;
  username: string;
  token: string;
}
