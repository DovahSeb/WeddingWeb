import { Component, inject } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CountdownService } from '../service/countdown.service';
import { InvitationService } from '../service/invitation.service';
import { ToastrService } from 'ngx-toastr';

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
  confirmation: string = '';
  inviteCodeMessage: string = '';
  isCodeValid: boolean | null = null;

  private readonly countdownService = inject(CountdownService);
  private readonly invitationService = inject(InvitationService);
  private readonly toastr = inject(ToastrService);
  
  ngOnInit(): void {
    this.countdownInit();
  }

  countdownInit(){
    this.countdownService.startCountdown('2025-01-14T10:30:00').subscribe((data) => {
      this.countdown = data;
    });
  }

  toggleRsvpForm() {
    this.showRsvpForm = !this.showRsvpForm;
  }

  validateInviteCode(): void {
    if (this.inviteCode.length >= 8) {
      this.invitationService.isValidConfirmationCode(this.inviteCode).subscribe({
        next: (response) => {
          this.isCodeValid = response.isValid;
          if (!response.isValid) {
            this.inviteCodeMessage = 'Code déjà utilisé ou invalide';
          } else {
            this.inviteCodeMessage = '';
          }
        }
      });
    } else {
      this.inviteCodeMessage = '';
    }
  }

  confirmInvitation(result: { inviteCode: string, confirmation: string }): void {
    const confirmInvitation = {
      code: result.inviteCode,
      confirmation: result.confirmation
    };

    this.invitationService.confirmInvitation(confirmInvitation).subscribe({
      next: () => this.toastr.show(
        'Invitation Enregistrée 💍',
        '',
        { 
          toastClass: 'ngx-toastr wedding-toast' 
        }
      )
    });
    this.resetRsvpForm();
  }

  resetRsvpForm(): void {
    this.inviteCode = '';
    this.confirmation = '';
    this.showRsvpForm = false;
  }
}
