import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ButtonsModule, WavesModule, CardsFreeModule } from 'angular-bootstrap-md'
import { WalletComponent } from './wallet/wallet.component';

@NgModule({
  imports: [
    CommonModule, ButtonsModule, WavesModule, CardsFreeModule,
    RouterModule.forChild([
      { path: '', pathMatch: 'full', component: WalletComponent }
    ])
  ],
  declarations: [WalletComponent]
})
export class WalletModule { }
