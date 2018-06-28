import { Subject } from "rxjs";

export class AccountsService{
  accountsUpdate = new Subject<any[]>();
  accountsFiltered = new Subject<any[]>();
}