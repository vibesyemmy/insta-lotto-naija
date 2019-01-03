import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationComponent } from './pagination/pagination.component';
import { WavesModule } from 'angular-bootstrap-md'
import { PaginationService } from './pagination.service';

@NgModule({
  imports: [CommonModule, WavesModule],
  declarations: [PaginationComponent],
  exports: [PaginationComponent],
  providers: [PaginationService]
})
export class PaginationModule {}
