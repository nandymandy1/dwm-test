import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TrainingCalendarPage } from './training-calendar';
import { ComponentsModule } from '../../../components/components.module';

@NgModule({
  declarations: [
    TrainingCalendarPage,
  ],
  imports: [
    IonicPageModule.forChild(TrainingCalendarPage),
    ComponentsModule
  ],
})
export class TrainingCalendarPageModule {}
