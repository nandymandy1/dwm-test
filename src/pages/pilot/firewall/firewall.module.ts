import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirewallPage } from './firewall';

@NgModule({
  declarations: [
    FirewallPage,
  ],
  imports: [
    IonicPageModule.forChild(FirewallPage),
  ],
})
export class FirewallPageModule {}
