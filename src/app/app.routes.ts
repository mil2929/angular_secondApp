import { Route } from "@angular/router";
import { CustomerComponent } from "./pages/customer.component";
import { ProductComponent } from "./pages/product.component";
import { CategoryComponent } from "./pages/category.component";

export  const routes:Route[]=[
    {
        path: 'customers',
        component: CustomerComponent
    },
    {
        path: '',
        component: CustomerComponent
    },
    {
        path: 'products',
        component: ProductComponent
    },
    {
        path: 'categories',
        component: CategoryComponent
    }
]