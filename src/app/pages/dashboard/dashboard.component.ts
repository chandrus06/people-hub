import { Component } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ProgressBarModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  currentTime = new Date();
  
  attendanceStats = {
    inTime: '09:00 AM',
    outTime: '--:-- PM',
    status: 'Present',
    workedHours: 4.5,
    totalHours: 8
  };

  leaveBalance = {
    annual: { used: 5, total: 20 },
    sick: { used: 2, total: 10 },
  };

  recentTasks = [
    { name: 'Update Dashboard UI', status: 'In Progress', progress: 60 },
    { name: 'API Integration for Leaves', status: 'Pending', progress: 0 },
    { name: 'Fix Login Bug', status: 'Completed', progress: 100 }
  ];

  activeProjects = [
    { name: 'HR Management System', role: 'Frontend Developer', deadline: '2026-10-15' },
    { name: 'Employee Portal', role: 'Full Stack', deadline: '2026-11-01' }
  ];

  get workedPercentage() {
    return (this.attendanceStats.workedHours / this.attendanceStats.totalHours) * 100;
  }
}
