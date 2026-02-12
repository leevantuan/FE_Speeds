import { CommonModule } from '@angular/common';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
type LanguageOption = { code: 'EN' | 'VN'; name: string; flag: string };

@Component({
  selector: 'app-admin-header',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class AdminHeaderComponent implements OnInit {
  @Output() openSidebarOnMobile = new EventEmitter<void>();

  userName = 'Alex Rivera';

  isLangOpen = false;
  isProfileOpen = false;

  languages: LanguageOption[] = [
    { code: 'EN', name: 'English', flag: 'https://flagcdn.com/w20/gb.png' },
    { code: 'VN', name: 'Vietnamese', flag: 'https://flagcdn.com/w20/vn.png' },
  ];

  selectedLang: LanguageOption = this.languages[0];

  ngOnInit(): void {
    // nếu bạn có SessionStorageService thì thay bằng đọc từ session
    const saved = (localStorage.getItem('lang') as 'EN' | 'VN' | null) ?? 'EN';
    this.selectedLang = this.languages.find((x) => x.code === saved) ?? this.languages[0];
  }

  toggleLangDropdown() {
    this.isLangOpen = !this.isLangOpen;
    if (this.isLangOpen) this.isProfileOpen = false;
  }

  selectLanguage(lang: LanguageOption) {
    this.selectedLang = lang;
    localStorage.setItem('lang', lang.code);
    this.isLangOpen = false;
    location.reload();
  }

  toggleProfileDropdown() {
    this.isProfileOpen = !this.isProfileOpen;
    if (this.isProfileOpen) this.isLangOpen = false;
  }

  logout() {
    // bạn thay bằng router navigate auth nếu cần
    this.isProfileOpen = false;
    alert('Logout');
  }
}
