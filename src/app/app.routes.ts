import { Routes } from '@angular/router';
import { LayoutComponent } from './domains/shared/components/layout/layout.component';

export const routes: Routes = [
    {
       path: '',
       component: LayoutComponent,
       children:[
        {
            path: 'home',
            loadComponent: () => import('./domains/users/pages/user-list/user-list.component')
        },
        {
            path: '',
            loadComponent: () => import('./domains/home/home.component')
        }
       ]
    }
];
