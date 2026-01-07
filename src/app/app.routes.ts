import { Routes } from '@angular/router';
import { Login } from './components/login/login';
import { Home } from './components/home/home';
import { Register } from './components/register/register';
import { AdminDashboard } from './components/dashboard/admin/admin';
import { ClientDashboard } from './components/dashboard/client/client';
import { WarehouseManagerDashboard } from './components/dashboard/warehouse-manager/warehouse-manager';

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
