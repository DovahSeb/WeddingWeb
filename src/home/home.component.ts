import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CountdownService } from '../service/countdown.service';
import { InvitationService } from '../service/invitation.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  countdown = { days: 0, hours: 0, minutes: 0, seconds: 0 };
  showRsvpForm = false;
  inviteCode: string = '';
  confirmation: string = ''; // Either "Oui" or "Non"

  private readonly countdownService = inject(CountdownService);
  private readonly invitationService = inject(InvitationService);
  
  ngOnInit(): void {
    this.countdownInit();
  }

  countdownInit(){
    this.countdownService.startCountdown('2025-01-14T00:00:00').subscribe((data) => {
      this.countdown = data;
    });
  }

  toggleRsvpForm() {
    this.showRsvpForm = !this.showRsvpForm;
  }

  confirmInvitation(result: { inviteCode: string, confirmation: string }): void {
    const confirmInvitation = {
      code: result.inviteCode,
      confirmation: result.confirmation
    };

    this.invitationService.confirmInvitation(confirmInvitation);
    this.resetRsvpForm();
  }

  resetRsvpForm(): void {
    this.inviteCode = '';
    this.confirmation = '';
    this.showRsvpForm = false;
  }
}
