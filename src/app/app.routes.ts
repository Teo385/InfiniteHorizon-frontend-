import { Routes } from '@angular/router';
import { LayoutComponent } from './domains/shared/components/layout/layout.component';

export const routes: Routes = [
    {
       path: '',
       component: LayoutComponent,
       children:[
        {
            path: '',
            loadComponent: () => import('./domains/business/home/home.component')
        },
        {
            path: 'user',
            loadComponent: () => import('./domains/business/users/pages/user-list/user-list.component')
        },
        {
            path: 'dashboard',
            loadComponent: () => import('./domains/business/dashboard/dashboard.component')
        },
        {
            path: 'profile',
            loadComponent: () => import('./domains/business/profile/profile.component')
        },
        {
            path: 'tables',
            loadComponent: () => import('./domains/business/profesores/tables.component')
        },
        {
            path: '',
            redirectTo: 'dashboard',
            pathMatch: 'full'
        }

    ]
},
{
    path: '**',
    redirectTo: 'dashboard'
}
];

  