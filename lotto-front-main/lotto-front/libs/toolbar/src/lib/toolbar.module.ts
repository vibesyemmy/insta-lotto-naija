import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { WalletFacade, WalletEffects, WalletService } from '@lotto-front/wallet';
import { SharedModule } from '@lotto-front/shared';

@NgModule({
  imports: [CommonModule, MDBBootstrapModule, RouterModule, SharedModule],
  exports: [NavbarComponent],
  declarations: [NavbarComponent],
  providers: [WalletFacade, WalletEffects, WalletService]
})
export class ToolbarModule {}
