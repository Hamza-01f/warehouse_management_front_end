import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Home } from './features/home/home';
import { Register } from './features/auth/register/register';
import { AdminDashboard } from './features/dashboard/admin/admin';
import { ClientDashboard } from './features/dashboard/client/client';
import { WarehouseManagerDashboard } from './features/dashboard/warehouse-manager/warehouse-manager';
import { Logout } from './features/auth/logout/logout';

export const routes: Routes = [
    {
        path : '' , component : Home
    },
    {
        path : 'login' , component : Login
    },
    {
        path : 'dashboard/admin',
        loadChildren: () => 
            import('./features/dashboard/admin/admin.routes')
            .then(m => m.adminRoutes)
    },
    {
        path : 'dashboard/manager',
        component : WarehouseManagerDashboard,
    },
    {
        path : 'dashboard/client',
        component : ClientDashboard,
    },
    {
        path : 'register' , component : Register
    },
    {
        path : 'logout',
        component : Logout
    }
];
