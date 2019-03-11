
import { Component, Input } from '@angular/core';

@Component({
  selector: 'calendar',
  templateUrl: 'calendar.html'
})
export class CalendarComponent {

  @Input() StartDate: String;
  @Input() EndDate: String;

  //StartDate=new Date();
  FirstWeek: Date[] = [];
  SecondWeek: Date[] = [];
  ThirdWeek: Date[] = [];
  FourthWeek: Date[] = [];
  FifthWeek: Date[] = [];
 
   constructor() {
    this.populateCalendar();
  }

  populateCalendar() {
    alert(this.StartDate)
    let calendatStart: Date = this.getCalendarStartDate()
    let date: Date = calendatStart;
    let i = 1;
    for (i = 1; i <= 35; i++) {
      if (i <= 7) {
        this.FirstWeek.push(new Date(date));
      }
      else if (i <= 14) {
        this.SecondWeek.push(new Date(date));
      }
      else if (i <= 21) {
        this.ThirdWeek.push(new Date(date));
      }
      else if (i <= 28) {
        this.FourthWeek.push(new Date(date));
      }
      else if (i <= 35) {
        this.FifthWeek.push(new Date(date));
      }
      date.setDate(date.getDate() + 1)

    }

  }

  getCalendarStartDate(): Date {
    let date = new Date();
    // date.setDate(1)
    // date.setMonth(this.StartDate.getMonth())
    // date.setFullYear(2018)
    // date.setDate(date.getDate() - (date.getDay()))
    return date;
  }

  ionViewDidLoad() {
  }

}
