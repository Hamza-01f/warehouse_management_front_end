import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Dashboard } from './components/dashboard/dashboard';

export const routes: Routes = [
    {
        path : '' , component : Home
    },
    {
        path : 'login' , component : Login
    },
    {
        path : 'dashboard' , component : Dashboard
    }
];
