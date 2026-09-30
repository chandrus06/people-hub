import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SidebarModule } from 'primeng/sidebar';
import { MenuModule } from 'primeng/menu';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-sidenavbar',
  standalone: true,
  imports: [SidebarModule, MenuModule],
  templateUrl: './sidenavbar.component.html',
  styleUrl: './sidenavbar.component.scss'
})
export class SidenavbarComponent {
  @Input() visible: boolean = false;
  @Output() visibleChange = new EventEmitter<boolean>();

  items: MenuItem[] = [
    { label: 'Login / Logout', icon: 'pi pi-clock', routerLink: '/attendance' },
    { separator: true },
    { label: 'Project Updates', icon: 'pi pi-briefcase', routerLink: '/projects' },
    { label: 'Leaves', icon: 'pi pi-calendar-times', routerLink: '/leaves' },
    { label: 'Technology Core Teams', icon: 'pi pi-users', routerLink: '/teams' }
  ];

  onVisibleChange(value: boolean) {
    this.visibleChange.emit(value);
  }
}
