import { Injectable, inject } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
  
})
export class ToasterService {
  private messageService = inject(MessageService);
  showSuccess(message: string, life: number = 3000) {
    this.messageService.add({
      severity: 'success',    
      summary: 'Success',
      detail: message,
      life
    });
  }
  showError(message: string, life: number = 3000) {
    this.messageService.add({
      severity: 'error',
      summary: 'Error',
      detail: message,
      life
    });
  }
  showWarn(message: string, life: number = 3000) {
    this.messageService.add({
      severity: 'warn',
      summary: 'Warning',
      detail: message,
      life
    });
  }
  showInfo(message: string, life: number = 3000) {
    this.messageService.add({
      severity: 'info',
      summary: 'Info',
      detail: message,
      life
    });
  }
}
