import { Routes } from '@angular/router';
import { App } from './app';

export const routes: Routes = [
    { path: '', component: App },
    { path: '**', loadComponent: () => import('./pages/not-found/not-found') }
];
