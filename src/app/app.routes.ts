import { Routes } from '@angular/router';
import { Login } from './features/auth/login/login';
import { Home } from './features/home/home';
import { Register } from './features/auth/register/register';
import { AdminDashboard } from './features/dashboard/admin/admin';
import { ClientDashboard } from './features/dashboard/client/client';
import { WarehouseManagerDashboard } from './features/dashboard/warehouse-manager/warehouse-manager';

export const routes: Routes = [
    {
        path : '' , component : Home
    },
    {
        path : 'login' , component : Login
    },
    {
        path : 'dashboard/admin',
        component : AdminDashboard ,
        children : []
    },
    {
        path : 'dashboard/manager',
        component : WarehouseManagerDashboard,
        children : []
    },
    {
        path : 'dashboard/client',
        component : ClientDashboard,
        children : []
    },
    {
        path : 'register' , component : Register
    }
];
