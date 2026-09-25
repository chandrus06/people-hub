import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ToolbarModule } from 'primeng/toolbar';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ToolbarModule, ButtonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  @Input() title: string = '';
  @Output() toggleSidebar = new EventEmitter<void>();
}
