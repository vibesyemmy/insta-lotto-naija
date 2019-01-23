import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { WalletFacade } from '../+state/wallet.facade';
import { Wallet } from '../+state/wallet.reducer';
import { Observable } from 'rxjs';

@Component({
  selector: 'lotto-front-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WalletComponent implements OnInit {

  wallet$: Observable<Wallet>;

  constructor(private walletFacade: WalletFacade) {
    walletFacade.loadWallet();
  }

  ngOnInit() {
    this.wallet$ = this.walletFacade.wallet$;
  }

}
