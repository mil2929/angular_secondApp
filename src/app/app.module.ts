import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { AppComponent } from './app.component';
import { CustomerComponent } from './pages/customer.component';
import { RouterModule } from '@angular/router';         //1
import { routes } from './app.routes';                  //1
import { HttpService } from './service/httpservice';
import { HttpClientModule } from '@angular/common/http';
import { ProductComponent } from './pages/product.component';
import { CategoryComponent } from './pages/category.component';
import { CustomerModal } from './pages/customer.modal';
import { CategoryModal } from './pages/category.modal';
import { ProductModal } from './pages/product.modal';
import { LoginComponent } from './login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    //CustomerComponent,
    //ProductComponent,
    //CategoryComponent,
    //CustomerModal,
    //CategoryModal,
    //ProductModal,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes), //1
    HttpClientModule
    
  ],
  providers: [
    HttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



/*
1. first thing first setelah bikin app.router.ts
*/
