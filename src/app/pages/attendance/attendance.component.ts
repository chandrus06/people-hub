import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [CommonModule, ButtonModule, ToastModule],
  templateUrl: './attendance.component.html',
  styleUrl: './attendance.component.scss'
})
export class AttendanceComponent implements OnInit, OnDestroy {
  inTime: Date | null = null;
  outTime: Date | null = null;
  totalWorkedMilliseconds: number = 0;
  totalRequiredMilliseconds: number = 9 * 60 * 60 * 1000; // 9 hours
  timer: any;

  // New mockup data
  user = {
    name: 'Alex Rivera',
    department: 'Product Engineering'
  };

  stats = [
    { title: 'Days Present', value: '18 / 22', subtitle: 'Current Month', iconClass: 'pi pi-check-circle', colorClass: 'green' },
    { title: 'Total Hours', value: '162.5h', subtitle: '+12% vs last month', iconClass: 'pi pi-clock', colorClass: 'blue' },
    { title: 'Avg. Daily Hours', value: '8h 45m', subtitle: 'Standard: 9h', iconClass: 'pi pi-history', colorClass: 'purple' },
    { title: 'Late Arrivals', value: '02', subtitle: 'Threshold: 03', iconClass: 'pi pi-exclamation-circle', colorClass: 'orange' }
  ];

  attendanceRecords = [
    { date: 'Oct 24, 2023', day: 'Tuesday', loginTime: '09:02 AM', logoutTime: '06:15 PM', totalHours: '09h 13m', status: 'PRESENT', notes: 'Office - HQ', statusClass: 'present' },
    { date: 'Oct 23, 2023', day: 'Monday', loginTime: '09:45 AM', logoutTime: '06:30 PM', totalHours: '08h 45m', status: 'LATE', notes: 'Traffic delay', statusClass: 'late' },
    { date: 'Oct 20, 2023', day: 'Friday', loginTime: '08:55 AM', logoutTime: '01:00 PM', totalHours: '04h 05m', status: 'HALF DAY', notes: 'Doctor appointment', statusClass: 'half-day' },
    { date: 'Oct 19, 2023', day: 'Thursday', loginTime: '-', logoutTime: '-', totalHours: '0h 0m', status: 'LEAVE', notes: 'Personal Leave', statusClass: 'leave' },
    { date: 'Oct 18, 2023', day: 'Wednesday', loginTime: '09:10 AM', logoutTime: '-', totalHours: '4h 50m+', status: 'MISSING LOGOUT', notes: 'Forgot to punch out', statusClass: 'missing' },
    { date: 'Oct 17, 2023', day: 'Tuesday', loginTime: '09:00 AM', logoutTime: '06:05 PM', totalHours: '09h 05m', status: 'PRESENT', notes: 'Remote', statusClass: 'present' },
  ];

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

  ngOnDestroy() {
    if (this.timer) {
      clearInterval(this.timer);
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
}
