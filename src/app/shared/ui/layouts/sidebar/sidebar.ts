import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type MenuItem = {
  key: string;
  label: string;
  icon: string; // emoji cho nhanh, bạn thay bằng fontawesome/lucide tùy
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent {
  @Input() collapsed = false;
  @Output() toggleCollapse = new EventEmitter<void>();

  activeKey = 'permissions';

  menus: MenuItem[] = [
    { key: 'dashboard', label: 'Dashboard', icon: '▦' },
    { key: 'customers', label: 'Customers', icon: '👥' },
    { key: 'permissions', label: 'Permissions', icon: '🛡️' },
    { key: 'reports', label: 'Reports', icon: '📊' },
    { key: 'settings', label: 'Settings', icon: '⚙️' },
  ];

  setActive(k: string) {
    this.activeKey = k;
  }
}
