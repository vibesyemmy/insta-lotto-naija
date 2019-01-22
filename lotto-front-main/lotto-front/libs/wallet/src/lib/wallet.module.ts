import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonsModule, WavesModule, CardsFreeModule } from 'angular-bootstrap-md'
import { WalletComponent } from './wallet/wallet.component';
import { AddFundsComponent } from './add-funds/add-funds.component';
import { TransferFundsComponent } from './transfer-funds/transfer-funds.component';

@NgModule({
  imports: [
    CommonModule, ButtonsModule, WavesModule, CardsFreeModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: WalletComponent },
      { path: 'addFunds', component: AddFundsComponent },
      { path: 'transferFunds', component: TransferFundsComponent }
    ])
  ],
  declarations: [WalletComponent, AddFundsComponent, TransferFundsComponent]
})
export class WalletModule { }
