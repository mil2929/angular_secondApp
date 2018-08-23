import { Route } from "@angular/router";
import { CustomerComponent } from "./pages/customer.component";
import { ProductComponent } from "./pages/product.component";
import { CategoryComponent } from "./pages/category.component";
import { LoginComponent } from "./login/login.component";

export  const routes:Route[]=[
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'pages',
        loadChildren: 'src/app/pages/page.module#PagesModule'
    },
    {
        path:'',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: '**',                 //for the unavailable route
        redirectTo: '/login',
        pathMatch: 'full'
    }

]