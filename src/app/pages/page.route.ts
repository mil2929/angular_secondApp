import { Route } from "@angular/router";
import { BaseComponent } from "./base-component";
import { CustomerComponent } from "./customer.component";
import { ProductComponent } from "./product.component";
import { CategoryComponent } from "./category.component";
import { AuthGuard } from "../service/auth.guard.service";

export const routes:Route[]=[
    {
        path: '',
        component: BaseComponent,
        children:[
            {
                path:'customers',
                component:CustomerComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'products',
                component: ProductComponent,
                canActivate: [AuthGuard]
            },
            {
                path: 'categories',
                component: CategoryComponent,
                canActivate: [AuthGuard]
            }
        ]
    }
]