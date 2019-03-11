import { NgModule } from '@angular/core';
import { CalendarComponent } from './calendar/calendar';
import { IonicModule } from 'ionic-angular';
import { TrainCalRadioBtnComponent } from './train-cal-radio-btn/train-cal-radio-btn';
@NgModule({
	declarations: [
    CalendarComponent,
    TrainCalRadioBtnComponent],
	imports: [
        IonicModule
    ],
	exports: [
    CalendarComponent,
    TrainCalRadioBtnComponent]
})
export class ComponentsModule {}
