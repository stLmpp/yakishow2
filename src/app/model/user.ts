import { ThemesEnum } from './themes.enum';

export class User {
  creationDate: Date;
  lastUpdateDate: Date;
  id: number;
  username: string;
  token: string;
  theme: ThemesEnum;
}
