import { Injectable } from '@angular/core';
import { BehaviorSubject, interval } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CountdownService {
  private countdown$ = new BehaviorSubject({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  startCountdown(targetDate: string) {
    const target = new Date(targetDate).getTime();

    interval(1000)
      .pipe(
        map(() => {
          const now = new Date().getTime();
          const distance = target - now;

          if (distance < 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
          }

          const days = Math.floor(distance / (1000 * 60 * 60 * 24));
          const hours = Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          );
          const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((distance % (1000 * 60)) / 1000);

          return { days, hours, minutes, seconds };
        })
      )
      .subscribe(this.countdown$);

    return this.countdown$.asObservable();
  }
}
