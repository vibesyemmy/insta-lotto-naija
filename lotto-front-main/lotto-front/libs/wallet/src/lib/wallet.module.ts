import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { WalletComponent } from './wallet/wallet.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: WalletComponent }
    ])
  ],
  declarations: [WalletComponent]
})
export class WalletModule { }
