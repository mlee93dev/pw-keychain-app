import { Subject } from "rxjs";

export class RedirectService{
  canRedirect = false;
  redirectRoute: string;
  logout: boolean;
}