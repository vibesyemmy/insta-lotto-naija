import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as Parse from 'parse';
import { Wallet, initialWallet } from './+state/wallet.reducer';

@Injectable({
  providedIn: 'root'
})
export class WalletService {
  constructor() {}

  getWallet(): Observable<Wallet> {
    const user = Parse.User.current();
    const walletQ = new Parse.Query('Wallet');
    walletQ.equalTo('user', user);

    return Observable.create(emitter => {
      walletQ
        .first()
        .then((wallet: Parse.Object) => {
          if (wallet) {
            emitter.next(<Wallet>{
              objectId: wallet.id,
              balance: wallet.has('balance')
                ? this.convertToNaira(wallet.get('balance'))
                : 0
            });
          } else {
            emitter.next(initialWallet);
          }

          emitter.complete();
        })
        .catch(error => {
          emitter.error(error);
        });
    });
  }

  convertToNaira(kobo: number): number {
    return kobo / 100;
  }
}
