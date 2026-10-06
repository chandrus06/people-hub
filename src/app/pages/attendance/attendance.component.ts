import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { ToastModule } from 'primeng/toast';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, CardModule, ButtonModule, ProgressBarModule, ToastModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent implements OnInit {
  inTime: Date | null = null;
  outTime: Date | null = null;
  totalWorkedMilliseconds: number = 0;
  totalRequiredMilliseconds: number = 9 * 60 * 60 * 1000; // 9 hours
  timer: any;

  constructor(private toastService: ToasterService) {}

  ngOnInit() {
    if (typeof localStorage !== 'undefined') {
      const savedInTime = localStorage.getItem('inTime');
      if (savedInTime) {
        this.inTime = new Date(savedInTime);
        this.startTimer();
      }
    }
  }

  punchIn() {
    if (!this.inTime) {
      this.inTime = new Date();
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem('inTime', this.inTime.toISOString());
      }
      this.startTimer();
      this.toastService.showSuccess('Punched in successfully!', 3000);
    }
  }

  punchOut() {
    if (this.inTime && !this.outTime) {
      this.outTime = new Date();
      clearInterval(this.timer);
      this.calculateTime();
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem('inTime');
      }
      this.toastService.showSuccess('Punched out successfully!', 3000);
    }
  }

  startTimer() {
    this.timer = setInterval(() => {
      this.calculateTime();
    }, 1000);
  }

  calculateTime() {
    if (this.inTime) {
      const now = this.outTime ? this.outTime : new Date();
      this.totalWorkedMilliseconds = now.getTime() - this.inTime.getTime();
    }
  }

  get formattedWorkedTime(): string {
    const hours = Math.floor(this.totalWorkedMilliseconds / (1000 * 60 * 60));
    const minutes = Math.floor((this.totalWorkedMilliseconds % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((this.totalWorkedMilliseconds % (1000 * 60)) / 1000);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }

  get progressPercentage(): number {
    const percentage = (this.totalWorkedMilliseconds / this.totalRequiredMilliseconds) * 100;
    return Math.min(percentage, 100);
  }
}
