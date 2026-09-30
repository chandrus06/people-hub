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
    InputTextareaModule
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

  displayLeaveModal: boolean = false;
  leaveForm: FormGroup;
  
  leaveTypes = [
    { label: 'Casual Leave', value: 'casual' },
    { label: 'Sick Leave', value: 'sick' }
  ];

  constructor(private fb: FormBuilder) {
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
      console.log('Leave Application Submitted:', this.leaveForm.value);
      // Here you would typically call a service to save the leave application
      this.hideApplyLeaveModal();
    } else {
      this.leaveForm.markAllAsTouched();
    }
  }
}
