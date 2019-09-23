import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';


@NgModule({
  declarations: [NotFoundComponent],
  imports: [
    CommonModule,
    AngularFontAwesomeModule
  ]
})
export class ErrosModule { }
