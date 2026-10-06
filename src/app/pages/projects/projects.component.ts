import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { DropdownModule } from 'primeng/dropdown';
import { InputNumberModule } from 'primeng/inputnumber';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { ToasterService } from '../../core/services/toaster.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    CommonModule, 
    ReactiveFormsModule, 
    CardModule, 
    InputTextModule, 
    ButtonModule,
    InputTextareaModule,
    DropdownModule,
    InputNumberModule,
    TabViewModule,
    ToastModule
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent implements OnInit {
  projectDetailsForm: FormGroup;
  dailyUpdateForm: FormGroup;
  
  projectDetails: any = null;
  isEditingDetails: boolean = true;
  submittedUpdates: any[] = [];

  roles = [
    { label: 'Frontend Developer', value: 'frontend' },
    { label: 'Backend Developer', value: 'backend' },
    { label: 'Full Stack Developer', value: 'fullstack' },
    { label: 'UI/UX Designer', value: 'uiux' },
    { label: 'QA Engineer', value: 'qa' },
    { label: 'Project Manager', value: 'pm' }
  ];

  constructor(private fb: FormBuilder, private toastService: ToasterService) {
    this.projectDetailsForm = this.fb.group({
      projectName: ['', Validators.required],
      clientName: ['', Validators.required],
      technologyName: ['', Validators.required],
      role: [null, Validators.required],
      yearsOfExperience: [null, [Validators.required, Validators.min(0)]]
    });

    this.dailyUpdateForm = this.fb.group({
      assignedTask: ['', Validators.required],
      completedTask: ['', Validators.required],
      pendingTask: ['', Validators.required]
    });
  }

  ngOnInit() {
    const savedDetails = localStorage.getItem('projectDetails');
    if (savedDetails) {
      this.projectDetails = JSON.parse(savedDetails);
      this.projectDetailsForm.patchValue(this.projectDetails);
      this.isEditingDetails = false;
    }

    const savedUpdates = localStorage.getItem('dailyUpdates');
    if (savedUpdates) {
      this.submittedUpdates = JSON.parse(savedUpdates);
    }
  }

  saveProjectDetails() {
    if (this.projectDetailsForm.valid) {
      this.projectDetails = this.projectDetailsForm.value;
      localStorage.setItem('projectDetails', JSON.stringify(this.projectDetails));
      this.isEditingDetails = false;
      this.toastService.showSuccess('Project details saved successfully!', 3000);
    } else {
      this.projectDetailsForm.markAllAsTouched();
    }
  }

  editProjectDetails() {
    this.isEditingDetails = true;
  }

  submitDailyUpdate() {
    if (this.dailyUpdateForm.valid) {
      const newUpdate = {
        ...this.dailyUpdateForm.value,
        date: new Date().toISOString()
      };
      
      this.submittedUpdates.unshift(newUpdate);
      localStorage.setItem('dailyUpdates', JSON.stringify(this.submittedUpdates));
      this.dailyUpdateForm.reset();
      this.toastService.showSuccess('Daily update submitted successfully!', 3000);
    } else {
      this.dailyUpdateForm.markAllAsTouched();
    }
  }

  getRoleLabel(roleValue: string): string {
    const role = this.roles.find(r => r.value === roleValue);
    return role ? role.label : roleValue;
  }
}
