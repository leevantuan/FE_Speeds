import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from '../../../shared/ui/layouts/header/header';
import { SidebarComponent } from '../../../shared/ui/layouts/sidebar/sidebar';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { SessionStorageService } from '../../http/session-storage/session-storage.service';

@Component({
  selector: 'app-admin',
  imports: [HeaderComponent, SidebarComponent, CommonModule, RouterModule],
  templateUrl: './admin.html',
  styleUrl: './admin.css',
})
export class AdminComponent implements OnInit {
  isCollapsed = false;
  isMobileMenuOpen = false;

  constructor(
    private sessionStorage: SessionStorageService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    const checkLogin = this.sessionStorage.getItem('accessToken');
    if (!checkLogin) {
      this.router.navigate(['/auth']);
    }
  }

  toggleMenu() {
    if (window.innerWidth < 1024) {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
      console.log('Menu state:', this.isMobileMenuOpen, 'width:', window.innerWidth);
    } else {
      this.isCollapsed = !this.isCollapsed;
    }
  }

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }

  clickSideBar() {
    if (window.innerWidth >= 768) {
      if (this.isCollapsed) this.isCollapsed = false;
    } else {
      this.closeMobileMenu();
    }
  }
}
