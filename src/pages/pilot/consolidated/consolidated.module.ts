import { NgModule } from '@angular/core';
import { IonicPageModule, NavController, NavParams } from 'ionic-angular';
import { ConsolidatedPage } from './consolidated';

@NgModule({
  declarations: [
    ConsolidatedPage,
  ],
  imports: [
    IonicPageModule.forChild(ConsolidatedPage),
  ],
})
export class ConsolidatedPageModule {
  
}
