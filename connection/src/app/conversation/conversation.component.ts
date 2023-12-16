import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { ConversationService } from './services/conversation.service';

@Component({
  selector: 'app-conversation',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './conversation.component.html',
  styleUrl: './conversation.component.scss',
})
export class ConversationComponent implements OnInit {
  newMessage = new FormControl('', { validators: [Validators.required] });

  timer$ = this.conversationService.timer$;

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
