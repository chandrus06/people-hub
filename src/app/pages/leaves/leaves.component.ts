import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { CalendarModule } from 'primeng/calendar';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ToastModule } from 'primeng/toast';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-leaves',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule,
    CardModule, 
    ButtonModule,
    DialogModule,
    DropdownModule,
    InputNumberModule,
    CalendarModule,
    InputTextareaModule,
    ToastModule
  ],
  templateUrl: './leaves.component.html',
  styleUrl: './leaves.component.scss'
})
export class LeavesComponent {
  leaveStats = {
    casualLeave: 12,
    sickLeave: 5,
    earnedLeave: 10,
    balanceLeave: 27,
    compOff: 2
  };

  recentRequests = [
    { id: 'LV-001', type: 'Casual Leave', typeClass: 'purple', duration: 'Oct 24, 2023 ⇌ Oct 25, 2023', days: '2 Days', status: 'APPROVED', statusClass: 'approved', reason: 'Family event' },
    { id: 'LV-002', type: 'Sick Leave', typeClass: 'red', duration: 'Oct 12, 2023 ⇌ Oct 12, 2023', days: '1 Day', status: 'APPROVED', statusClass: 'approved', reason: 'Fever' },
    { id: 'LV-003', type: 'Earned Leave', typeClass: 'yellow', duration: 'Nov 01, 2023 ⇌ Nov 05, 2023', days: '5 Days', status: 'PENDING', statusClass: 'pending', reason: 'Vacation' },
    { id: 'LV-004', type: 'Comp Off', typeClass: 'blue', duration: 'Sep 28, 2023 ⇌ Sep 28, 2023', days: '1 Day', status: 'APPROVED', statusClass: 'approved', reason: 'Weekend project support' },
    { id: 'LV-005', type: 'Casual Leave', typeClass: 'purple', duration: 'Aug 15, 2023 ⇌ Aug 16, 2023', days: '2 Days', status: 'REJECTED', statusClass: 'rejected', reason: 'Personal work' },
  ];

  displayLeaveModal: boolean = false;
  leaveForm: FormGroup;
  
  leaveTypes = [
    { label: 'Casual Leave', value: 'casual' },
    { label: 'Sick Leave', value: 'sick' },
    { label: 'Earned Leave', value: 'earned' },
    { label: 'Comp Off', value: 'compoff' }
  ];

  constructor(private fb: FormBuilder, private toastService: ToasterService) {
    this.leaveForm = this.fb.group({
      leaveType: [null, Validators.required],
      numberOfDays: [null, [Validators.required, Validators.min(0.5)]],
      fromDate: [null, Validators.required],
      toDate: [null, Validators.required],
      reason: ['', Validators.required]
    });
  }

  showApplyLeaveModal() {
    this.displayLeaveModal = true;
  }

  hideApplyLeaveModal() {
    this.displayLeaveModal = false;
    this.leaveForm.reset();
  }

  submitLeaveApplication() {
    if (this.leaveForm.valid) {
      this.toastService.showSuccess('Leave application submitted successfully!', 3000);
      this.hideApplyLeaveModal();
    } else {
      this.leaveForm.markAllAsTouched();
    }
  }
}
