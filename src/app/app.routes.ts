import { Routes } from '@angular/router';
import { authRoutes } from './auth/auth-routing.module';
import {mainRoutes} from './main/main-routing.module';
import { SiteLayoutComponent } from './layout/site-layout/site-layout.component';

export const routes: Routes = [
  {
    path: '',
    children: authRoutes,
  },
  {
    path: 'admin',
    component: SiteLayoutComponent,
    children: mainRoutes,
  },
];
