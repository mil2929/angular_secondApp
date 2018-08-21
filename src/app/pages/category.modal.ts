import { Component, Input } from '@angular/core';
import { CategoryTblHeading } from '../model/category-th-model';
import { HttpService } from '../service/httpservice';

@Component({
    selector: 'category-modal',
    templateUrl: './category.modal.html',
})
export class CategoryModal  { 
    constructor(private service: HttpService) {}
    @Input() state: string;
    @Input() category:CategoryTblHeading;
    @Input() displayData: Function = () => {};

    ngOnInit(){
        this.category = new CategoryTblHeading();
    }

    save(){
        if(this.state!="new"){
            this.service.put("/categories", this.category)
            .subscribe(
                res => {
                    if (res["meta"].success){
                        alert("Data Updated");
                        this.displayData();
                    }
                },
                err => {
                    alert("Sorry, but the data cannot be updated");
                    console.log(err);
                    
                }
            );
            $("#category-modal").modal("hide");
        }else{
            this.service.post("/categories", this.category)
            .subscribe(
                res => {
                    if (res["meta"].success){
                        alert("New category is inserted");
                        this.displayData();
                    }
                },
                err => {
                    alert("Sorry, insert data is failed");
                    console.log(err);
                    
                }
            );
            $("#category-modal").modal("hide");
        }
    }

    back(){
        $("#category-modal").modal("hide");
    }
}