import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FirewallManagerPage } from './firewall-manager';

@NgModule({
  declarations: [
    FirewallManagerPage,
  ],
  imports: [
    IonicPageModule.forChild(FirewallManagerPage),
  ],
})
export class FirewallManagerPageModule {}

