import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { LeavesComponent } from './pages/leaves/leaves.component';
import { LoginComponent } from './pages/login/login.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { SignupComponent } from './pages/sign-up/sign-up.component';


import { AuthGuard } from './core/guards/auth.guard';
import { UserCreateComponent } from './pages/user-create/user-create.component';

export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'user-list',
    component: UserCreateComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'attendance',
    component: AttendanceComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'projects',
    component: ProjectsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'leaves',
    component: LeavesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'teams',
    component: TeamsComponent,
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];
