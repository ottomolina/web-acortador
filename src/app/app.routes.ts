import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth-guard';

export const routes: Routes = [
    { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    { path: 'login', loadComponent: () => import('./pages/login/login') },
    { 
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard'),
        canActivate: [authGuard],
        children: [
            { path: '', redirectTo: 'links', pathMatch: 'full' },
            { path: 'links', loadComponent: () => import('./pages/links/links') },
        ]
    },
    { path: '**', loadComponent: () => import('./pages/not-found/not-found') }
];
