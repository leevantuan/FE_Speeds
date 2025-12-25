import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { LanguageOption } from './model';
import { SessionStorageService } from '../../../../core/http/session-storage/session-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent implements OnInit {
  @Output() toggleMenu = new EventEmitter<void>();
  @Output() toggleNotification = new EventEmitter<boolean>();

  userName = '';
  selectedLang: LanguageOption = {
    code: '',
    name: '',
    flag: '',
  };
  lang = 'EN';

  isToggleMenu = false;
  isToggleNotification = false;

  isLangOpen = false;
  isProfileOpen = false;

  languages: LanguageOption[] = [
    { code: 'EN', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
    { code: 'VN', name: 'Vietnamese', flag: 'https://flagcdn.com/w20/vn.png' },
  ];

  constructor(
    private sessionStorageService: SessionStorageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userName = this.sessionStorageService.getItem('userName')?.toString() ?? 'User';
    const selectCode = this.sessionStorageService.getItem('lang')?.toString() ?? 'EN';

    this.lang = selectCode;
    this.selectedLang = this.languages.find((x) => x.code == selectCode) ?? this.languages[0];
  }

  toggleMenuClick() {
    this.isToggleMenu = !this.isToggleMenu;
    this.toggleMenu.emit();
  }

  toggleLangDropdown() {
    this.isLangOpen = !this.isLangOpen;
  }

  selectLanguage(lang: LanguageOption) {
    this.selectedLang = lang;
    this.isLangOpen = false;
    this.lang = lang.code;
    this.sessionStorageService.setItem('lang', lang.code);
    location.reload();
  }

  toggleProfileDropdown() {
    this.isProfileOpen = !this.isProfileOpen;
  }

  logout() {
    // this.authService.logout();
    this.router.navigate(['/auth']);
    this.isProfileOpen = false;
  }
}
