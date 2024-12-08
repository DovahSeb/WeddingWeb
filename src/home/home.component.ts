import { Component, inject } from '@angular/core';
import { CountdownService } from '../service/countdown.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };

  private readonly countdownService = inject(CountdownService);
  
  ngOnInit(): void {
    this.countdownInit();
  }

  countdownInit(){
    this.countdownService.startCountdown('2025-01-14T00:00:00').subscribe((data) => {
      this.countdown = data;
    });
  }
}
