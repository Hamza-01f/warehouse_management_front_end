import { Routes } from "@angular/router";
import { AdminDashboard} from "./admin";
import { Products } from "./children/products/products";
import { Warehouse } from "./children/warehouse/warehouse";


export const adminRoutes: Routes = [
    {
     path : '' , 
     component : AdminDashboard,
     children : [
        {
          path : '',
          loadComponent : () => 
            import('./home/home')
            .then( m => m.AdminHome)
        },
        {
            path : 'products',
            loadComponent : () => 
                import('./children/products/products')
               .then(m => m.Products)
        },
        {
            path : 'warehouses',
            loadComponent : () => 
                import('./children/warehouse/warehouse')
                .then(m => m.Warehouse)
        }
     ]
    }
]