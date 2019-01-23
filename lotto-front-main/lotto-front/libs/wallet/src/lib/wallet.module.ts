import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  ButtonsModule,
  WavesModule,
  CardsFreeModule
} from 'angular-bootstrap-md';
import { WalletComponent } from './wallet/wallet.component';
import { AddFundsComponent } from './add-funds/add-funds.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import {
  WALLET_FEATURE_KEY,
  initialWalletState as walletInitialState,
  walletReducer
} from './+state/wallet.reducer';
import { WalletEffects } from './+state/wallet.effects';
import {
  TRANSACTION_FEATURE_KEY,
  initialTranxState as transactionInitialState,
  transactionReducer
} from './+state/transaction.reducer';
import { TransactionEffects } from './+state/transaction.effects';
import { WalletService } from './wallet.service';
import { TransactionService } from './transaction.service';
import { WalletFacade } from './+state/wallet.facade';

@NgModule({
  imports: [
    CommonModule,
    ButtonsModule,
    WavesModule,
    CardsFreeModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: WalletComponent },
      { path: 'addFunds', component: AddFundsComponent },
      { path: 'transferFunds', component: TransferFundsComponent }
    ]),
    StoreModule.forFeature(WALLET_FEATURE_KEY, walletReducer, {
      initialState: walletInitialState
    }),
    EffectsModule.forFeature([WalletEffects]),
    StoreModule.forFeature(TRANSACTION_FEATURE_KEY, transactionReducer, {
      initialState: transactionInitialState
    }),
    EffectsModule.forFeature([TransactionEffects])
  ],
  declarations: [WalletComponent, AddFundsComponent, TransferFundsComponent],
  providers: [WalletEffects, WalletFacade, WalletService, TransactionEffects, TransactionService]
})
export class WalletModule {}
