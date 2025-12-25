import { Routes } from '@angular/router';
import { AdminComponent } from './core/layout/admin/admin';
import { HomeComponent } from './pages/home/home';

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
    ],
  },
  {
    path: 'admin',
    // component: AdminLayoutComponent,
    children: [
      //   { path: '', component: AdminDashboardComponent },
      //   { path: 'users', component: AdminUserComponent },
      //   { path: 'devices', component: AdminDevicesComponent },
      //   { path: 'departments', component: AdminDepartmentsComponent },
      //   { path: 'types', component: AdminTypesComponent },
      //   { path: 'suppliers', component: AdminSuppliersComponent },
      //   { path: 'scandevices', component: AdminScanDevicesComponent },
      //   { path: 'liquidate', component: AdminLiquidatesComponent },
      //   {
      //     path: 'administrators',
      //     component: AdminRoleComponent,
      //     canDeactivate: [PendingChangeGuard],
      //   },
    ],
  },
];
