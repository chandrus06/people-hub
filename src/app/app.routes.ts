import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { AttendanceComponent } from './pages/attendance/attendance.component';
import { ProjectsComponent } from './pages/projects/projects.component';
import { LeavesComponent } from './pages/leaves/leaves.component';
import { LoginComponent } from './pages/login/login.component';
import { TeamsComponent } from './pages/teams/teams.component';
import { SignupComponent } from './pages/sign-up/sign-up.component';


export const routes: Routes = [
  { path: '', redirectTo: 'signup', pathMatch: 'full' },
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'attendance', component: AttendanceComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'leaves', component: LeavesComponent },
  { path: 'teams', component: TeamsComponent },
];
