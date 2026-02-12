import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from '../../../shared/ui/layouts/sidebar/sidebar';
import { RouterOutlet } from '@angular/router';
import { AdminHeaderComponent } from '../../../shared/ui/layouts/header/header';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, SidebarComponent, RouterOutlet, AdminHeaderComponent],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent {
  isCollapsed = signal(false);
  isMobileMenuOpen = signal(false);

  toggleSidebar() {
    // desktop: collapse, mobile: open overlay
    if (window.innerWidth < 1024) {
      this.isMobileMenuOpen.update((v) => !v);
    } else {
      this.isCollapsed.update((v) => !v);
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen.set(false);
  }
}
