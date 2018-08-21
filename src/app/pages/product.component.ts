import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { HttpService } from '../service/httpservice';
import { ProductTblHeading } from '../model/product-th-model';


@Component({
    selector: 'product-component',
    templateUrl: 'product.component.html',
})
export class ProductComponent  { 
    constructor(private router: Router, private service: HttpService) {  
    }
    data = [];
    product: ProductTblHeading;
    columns = [
        {field: "ProductID", text: "Product ID"},
        {field: "ProductName", text: "Product Name"},
        {field: "SupplierID", text: "Supplier ID"},
        {field: "CategoryID", text: "Category ID"},
        {field: "QuantityPerUnit", text: "Quantity Per Unit"},
        {field: "UnitPrice", text: "Unit Price"},
        {field: "UnitsInStock", text: "Units In Stock"},
        {field: "UnitsOnOrder", text: "Units On Order"},
        {field: "ReorderLevel", text: "Reorder Level"},
        {field: "Discontinued", text: "Discontinued"}
    ];

    refresh = Function;
    ngAfterViewInit(){
        this.displayData();
        this.refresh = this.displayData.bind(this);
    }

    option = {
        page : 1,
        pageSize : 10,
        criteria : [],
        order : {column: "ProductID", direction: "ASC"}
    }

    rowCount = 0;
    pageCount = 0;
    state : string;

    private clone(x){
        let str = JSON.stringify(x);
        return JSON.parse(str);
    }

    view(x){
        this.product = this.clone(x);
        this.state="view";
        $("#product-modal").modal();
    }

    edit(x){
        this.product = this.clone(x);
        this.state="edit";
        $("#product-modal").modal();
    }

    delete(x:ProductTblHeading){
        this.service.delete("/products/"+ x.ProductID)
        .subscribe(
            res=>{
                if(res['meta'].success){
                    alert("deleted");
                    this.displayData();
                }else{
                    alert("cannot be deleted!");
                    console.log(res);
                }
            },
            err=>{
                alert("Cannot be deleted!!");
                console.log(err);
                
            }
        )
    }

    add(){
        this.state="new";
        $("#product-modal").modal();
    }

    next(){
        this.option.page++;
        this.displayData();
    }

    prev(){
        this.option.page--;
        this.displayData();
    }

    criteria='';
    searchVal='';

    remove(x){
        let i = this.option.criteria.indexOf(x);
        this.option.criteria.splice(i,1);
        this.displayData();
    }

    search(){
        if(this.criteria!='' && this.searchVal!=''){
            this.option.criteria.push({criteria:this.criteria, value:this.searchVal });
            this.displayData();
        }
    }

    displayData(){
        console.log("display product");
        this.service.post("/products/paging", this.option)
            .subscribe(
                res => {
                    this.data = res['data'].rows;
                    this.rowCount = res['data'].rowCount;
                    this.pageCount = res['data'].pageCount;
                },
                err => {},
                () => {}
            );
    }

    
}