import { Component, OnInit } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { ProgressBarModule } from 'primeng/progressbar';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, ProgressBarModule, ChartModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {
  currentTime = new Date();
  
  attendanceStats = {
    inTime: '09:00 AM',
    outTime: '--:-- PM',
    status: 'PRESENT',
    workedHours: 4.5,
    totalHours: 8
  };

  leaveBalance = {
    annual: { used: 5, total: 20 },
    sick: { used: 2, total: 10 },
  };

  recentTasks = [
    { name: 'Update Dashboard UI', status: 'IN PROGRESS', progress: 60, colorClass: 'in-progress' },
    { name: 'API Integration for Leaves', status: 'PENDING', progress: 0, colorClass: 'pending' },
    { name: 'Fix Login Bug', status: 'COMPLETED', progress: 100, colorClass: 'completed' }
  ];

  activeProjects = [
    { name: 'HR Management Sys', role: 'Frontend Developer', deadline: 'Oct 15' },
    { name: 'Employee Portal', role: 'Full Stack', deadline: 'Nov 01' }
  ];
  
  performanceTrend = {
    title: 'Performance Trend',
    description: 'Your productivity is up by 12% this week. Keep it up!'
  };

  upcomingHoliday = {
    title: 'Upcoming Holidays',
    description: 'Diwali holidays are approaching (Oct 24 - Oct 26).'
  };

  get pendingTasksCount() {
    return this.recentTasks.filter(t => t.status === 'PENDING').length;
  }

  barData: any;
  barOptions: any;
  pieData: any;
  pieOptions: any;

  ngOnInit() {
    this.initCharts();
  }

  initCharts() {
    const textColorSecondary = '#64748b';
    const surfaceBorder = '#e2e8f0';
    
    // Bar Chart Data (Weekly Hours)
    this.barData = {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
      datasets: [
        {
          label: 'Hours Logged',
          backgroundColor: '#3b82f6',
          borderColor: '#3b82f6',
          data: [8, 7.5, 9, 8, 4.5],
          borderRadius: 4,
          barThickness: 24
        }
      ]
    };
    
    this.barOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false }
      },
      scales: {
        x: {
          ticks: { color: textColorSecondary, font: { size: 11 } },
          grid: { display: false, drawBorder: false }
        },
        y: {
          ticks: { color: textColorSecondary, font: { size: 11 }, stepSize: 2 },
          grid: { color: surfaceBorder, drawBorder: false, borderDash: [5, 5] },
          min: 0,
          max: 10
        }
      }
    };

    // Doughnut Chart Data (Task Distribution)
    this.pieData = {
      labels: ['completed', 'in progress', 'pending'],
      datasets: [
        {
          data: [12, 5, 8],
          backgroundColor: ['#10b981', '#3b82f6', '#f59e0b'],
          hoverBackgroundColor: ['#059669', '#2563eb', '#d97706'],
          borderWidth: 0
        }
      ]
    };
    
    this.pieOptions = {
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'bottom',
          labels: { color: textColorSecondary, usePointStyle: true, boxWidth: 8, font: { size: 11 } }
        }
      },
      cutout: '75%',
    };
  }

  get workedPercentage() {
    return (this.attendanceStats.workedHours / this.attendanceStats.totalHours) * 100;
  }
}
