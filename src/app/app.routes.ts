import { Routes } from '@angular/router';
import { AdminComponent } from './core/layout/admin/admin';
import { HomeComponent } from './pages/home/home';
import { AdminPermissions } from './pages/admin-permissions/admin-permissions';

export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      { path: 'users', component: AdminComponent },
      { path: 'administrators', component: AdminComponent },
      { path: 'settings', component: AdminComponent },
      { path: 'permissions', component: AdminPermissions },
    ],
  },
  {
    path: 'admin',
    children: [],
  },
];
