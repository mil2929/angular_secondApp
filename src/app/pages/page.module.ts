import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '../../../node_modules/@angular/forms';
import { RouterModule, Router } from '../../../node_modules/@angular/router';
import { HttpClientModule } from '../../../node_modules/@angular/common/http';
import { BaseComponent } from './base-component';
import { CategoryComponent } from './category.component';
import { CustomerComponent } from './customer.component';
import { ProductComponent } from './product.component';
import { CategoryModal } from './category.modal';
import { CustomerModal } from './customer.modal';
import { ProductModal } from './product.modal';
import { HttpService } from '../service/httpservice';
import { AuthGuard } from '../service/auth.guard.service';
import { routes } from './page.route';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule,
        RouterModule.forChild(routes),
        HttpClientModule        
    ],
    declarations: [
        BaseComponent,
        CategoryComponent,
        CustomerComponent,
        ProductComponent,
        CategoryModal,
        CustomerModal,
        ProductModal
    ],
    providers: [
        HttpService,
        AuthGuard
    ]
})
export class PagesModule {  }