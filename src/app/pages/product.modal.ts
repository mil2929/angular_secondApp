import { Component, Input } from '@angular/core';
import { HttpService } from '../service/httpservice';
import { ProductTblHeading } from '../model/product-th-model';

@Component({
    selector: 'product-modal',
    templateUrl: './product.modal.html',
})
export class ProductModal { 
    constructor(private service: HttpService) {
        
    }
    @Input() product:ProductTblHeading;
    @Input() state:string;
    @Input() displayData: Function = () => {};

    ngOnInit(){
        this.product = new ProductTblHeading();
    }

    back(){
        $("#product-modal").modal("hide");
    }

    save(){
        if(this.state!="new"){
            this.service.put("/products", this.product)
            .subscribe(
                res => {
                    if (res["meta"].success){
                        alert("Data Updated");
                        this.displayData();
                    }
                },
                err => {
                    alert("Update data failed");
                }
            );
            $("#product-modal").modal("hide");
    
        } else {
            console.log(this.state);
            this.service.post("/products", this.product)
            .subscribe(
                res => {
                    //console.log(res["meta"]);
                    if (res["meta"].success){
                        alert("New Product is inserted");
                        this.displayData();
                    } else {
                        alert("Sorry, the data is not acceptable")
                    }
                },
                err => {
                    alert("Insert data is failed");
                    console.log(err);
                }
            );
            
           // $("#product-modal").modal("hide");
    
        }
    }

}