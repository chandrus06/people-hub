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
    { label: 'Dashboard', icon: 'pi pi-home', routerLink: '/' },
    { separator: true },
    { label: 'People Directory', icon: 'pi pi-users', routerLink: '/directory' },
    { label: 'Departments', icon: 'pi pi-sitemap', routerLink: '/departments' },
    { label: 'Recruitment', icon: 'pi pi-user-plus', routerLink: '/recruitment' },
    { label: 'Performance', icon: 'pi pi-chart-line', routerLink: '/performance' },
    { separator: true },
    { label: 'Messages', icon: 'pi pi-envelope', routerLink: '/messages' },
    { label: 'Calendar', icon: 'pi pi-calendar', routerLink: '/calendar' },
    { separator: true },
    { label: 'Settings', icon: 'pi pi-cog', routerLink: '/settings' }
  ];

  onVisibleChange(value: boolean) {
    this.visibleChange.emit(value);
  }
}
