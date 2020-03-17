import { NavigateBack } from '../shared/navigate-back/navigate-back.component';

export interface RouteHistory {
  id: number;
  url: string;
  instance?: NavigateBack;
}
