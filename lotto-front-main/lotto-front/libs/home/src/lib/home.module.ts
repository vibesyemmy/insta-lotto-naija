import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NumberPickerComponent } from './number-picker/number-picker.component';

@NgModule({
  imports: [
    CommonModule,

    RouterModule.forChild([
      {
        path:'', component: NumberPickerComponent
      }    
    ])
  ],
  declarations: [NumberPickerComponent]
})
export class HomeModule {}
