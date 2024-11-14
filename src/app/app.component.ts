import { isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'] // Corrected `styleUrls`
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'flash-sale-counter';

  // Initialize fromDate and toDate as Date objects
  fromDate: Date = new Date('2024-11-13T08:00:00');
  toDate: Date = new Date('2024-11-17T08:00:00'); // Example end date

  days: string = '00';
  hours: string = '00';
  minutes: string = '00';
  seconds: string = '00';

  private timerInterval: any;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startCountdown();
    }
  }

  ngOnDestroy(): void {
    if (this.timerInterval) {
      clearInterval(this.timerInterval);
    }
  }

  startCountdown(): void {
    this.timerInterval = setInterval(() => {
      const now = new Date().getTime();
      const distance = this.toDate.getTime() - now;

      if (distance < 0) {
        clearInterval(this.timerInterval);
        this.days = this.hours = this.minutes = this.seconds = '00';
        return;
      }

      this.days = this.formatTime(Math.floor(distance / (1000 * 60 * 60 * 24)));
      this.hours = this.formatTime(Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
      this.minutes = this.formatTime(Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
      this.seconds = this.formatTime(Math.floor((distance % (1000 * 60)) / 1000));
    }, 1000);
  }

  formatTime(time: number): string {
    return time < 10 ? '0' + time : time.toString();
  }
}
