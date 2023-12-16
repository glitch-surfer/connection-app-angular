import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { ConversationService } from './services/conversation.service';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule, MatProgressSpinnerModule],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss',
})
export class ConversationComponent implements OnInit {
  newMessage = new FormControl('', { validators: [Validators.required] });

  timer$!: BehaviorSubject<number>;

  loading$ = this.conversationService.loading$;

  messages$ = this.conversationService.messages$;

  isConversationExist$ = this.conversationService.isConversationExist$;

  userId$ = this.conversationService.userId$;

  constructor(
    private conversationService: ConversationService,
    private router: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.conversationService.conversationId = this.router.snapshot.params['id'];

    const timer = this.conversationService.timers[this.conversationService.conversationId];
    if (!timer) {
      this.conversationService.timers[this.conversationService.conversationId] =
        new BehaviorSubject<number>(0);
    }
    this.timer$ = this.conversationService.timers[this.conversationService.conversationId];

    this.conversationService.initConversation();
  }

  onUpdateMessages(): void {
    this.conversationService.setTimer();
    this.conversationService.getMessages();
  }

  onDeleteConversation(): void {
    this.conversationService.deleteConversation();
  }

  onSendMessage(): void {
    if (this.newMessage.invalid || !this.newMessage.value) {
      return;
    }

    this.conversationService.sendMessage(this.newMessage.value);

    this.newMessage.setValue('');
  }
}
