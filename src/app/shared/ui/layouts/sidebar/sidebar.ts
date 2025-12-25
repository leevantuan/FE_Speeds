import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { MenuResponese } from './model';
import { MOCK_MENUS } from './mock';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css',
})
export class SidebarComponent implements OnInit {
  @Input() isCollapsed = false;

  activeMenu = 'home';
  menus: MenuResponese[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.getMenus();
    this.router.events.subscribe(() => {
      this.updateActiveMenu(this.router.url);
    });
  }

  getMenus() {
    this.menus = MOCK_MENUS;
  }

  private updateActiveMenu(currentPath: string) {
    const matched = this.menus.find((menu) => '/' + menu.path === currentPath);
    if (matched) {
      this.activeMenu = matched.key;
    }
  }

  navigateTo(menu: MenuResponese) {
    this.activeMenu = menu.key;
    if (menu.path) {
      this.router.navigate(['/' + menu.path]);
    }
  }

  isMenuActive(menuKey: string): boolean {
    return this.activeMenu === menuKey;
  }
}
