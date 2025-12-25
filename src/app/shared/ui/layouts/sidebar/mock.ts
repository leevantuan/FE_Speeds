import { MenuResponese } from './model';

export const MOCK_MENUS: MenuResponese[] = [
  {
    key: 'home',
    icon: 'fa-solid fa-house',
    path: '/home',
    orderNumber: 1,
    label: 'Home',
  },
  {
    key: 'users',
    icon: 'fa-solid fa-user',
    path: '/users',
    orderNumber: 2,
    label: 'Users',
  },
  {
    key: 'administrators',
    icon: 'fa-solid fa-users',
    path: '/administrators',
    orderNumber: 3,
    label: 'Administrators',
  },
  {
    key: 'settings',
    icon: 'fa-solid fa-gears',
    path: '/settings',
    orderNumber: 99,
    label: 'Settings',
  },
];
