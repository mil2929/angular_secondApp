import { CustomerTblHeading } from '../model/customer-th-model';
import { Component, Input } from '@angular/core';
import { HttpService } from '../service/httpservice';

@Component({
    selector: 'customer-modal',
    templateUrl: './customer.modal.html',
})
export class CustomerModal  { 

    constructor(private service: HttpService) {}

    @Input() customer:CustomerTblHeading;
    @Input() state:string;
    @Input() displayData: Function = () => {};

    ngOnInit(){
        this.customer = new CustomerTblHeading();
    }

    back(){
        $("#customer-modal").modal("hide");
    }

    save(){
        if(this.state!="new"){
            this.service.put("/customers", this.customer)
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
            $("#customer-modal").modal("hide");
        } else {
            this.service.post("/customers", this.customer)
            .subscribe(
                res => {
                    if (res["meta"].success){
                        alert("Data Inserted");
                        this.displayData();
                    }
                },
                err => {
                    alert("Insert data failed");
                }
            );
            $("#customer-modal").modal("hide");
        }
    }
    
}