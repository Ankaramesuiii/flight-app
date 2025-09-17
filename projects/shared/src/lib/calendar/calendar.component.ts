import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'lib-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrl: './calendar.component.scss'
})
export class CalendarComponent {
 @Output() dateSelected = new EventEmitter<string>();

  currentDate = new Date();
  month = this.currentDate.getMonth();
  year = this.currentDate.getFullYear();
  
  displayDate = new Date(this.year, this.month, 2);

  daysInMonth: number[] = [];
  firstDayOfMonth = 0;
  selectedDay: number | null = null;

  constructor() {
    this.generateCalendar();
  }

  generateCalendar(): void {
    this.displayDate = new Date(this.year, this.month, 2);
    
    const date = new Date(this.year, this.month, 2);
    this.firstDayOfMonth = date.getDay();
    console.log(this.firstDayOfMonth);
    
    const daysCount = new Date(this.year, this.month + 1, 0).getDate();
    this.daysInMonth = Array.from({ length: daysCount }, (_, i) => i + 1);
  }

  previousMonth(): void {
    this.month--;
    if (this.month < 0) {
      this.month = 11;
      this.year--;
    }
    this.generateCalendar();
  }

  nextMonth(): void {
    this.month++;
    if (this.month > 11) {
      this.month = 0;
      this.year++;
    }
    this.generateCalendar();
  }

  selectDay(day: number): void {
    this.selectedDay = day;
    const formattedDate = `${this.year}-${(this.month + 1).toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`;
    this.dateSelected.emit(formattedDate);
  }
}