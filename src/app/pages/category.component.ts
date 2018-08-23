import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpService } from '../service/httpservice';
import { CategoryTblHeading } from '../model/category-th-model';

@Component({
    selector: 'categoty-component',
    templateUrl: 'category.component.html',
})
export class CategoryComponent  { 
    constructor(private router:Router, private service:HttpService) {
        
    }
    data = [];
    category:CategoryTblHeading;
    columns = [
        {field: "CategoryID", text: "Category ID"},
        {field: "CategoryName", text: "Category Name"},
        {field: "Description", text: "Description"}
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
        order : {column: "CategoryID", direction: "ASC"}
    }

    private clone(x){
        let str = JSON.stringify(x);
        return JSON.parse(str);
    }

    direction = false;

    sort(col){
        let order = {
            column : col,
            direction : this.direction ? "ASC" : "DSC"
        };
        this.option.order=order;
        this.direction = !this.direction;
        this.displayData();
    }

    delete(x:CategoryTblHeading){
        if(window.confirm("Are you sure to delete this item?")){
            this.service.delete("/categories/"+x.CategoryID)
            .subscribe(
                res=> {
                    if (res['meta'].success){
                        alert('deleted!');
                        this.displayData();
                    }else{
                        alert("Sorry, the data cannot be deleted!");
                        console.log(res);
                    }
                },
                err=>{
                    alert("Sorry, the data cannot be deleted!");
                        console.log(err);
                }
            )
        }
    }

    add(){
        this.state="new";
        $("#category-modal").modal();
    }

    edit(x){
        this.category = this.clone(x);
        this.state = "edit";
        $("#category-modal").modal();
    }

    state: string;
    view(x){
        this.category = this.clone(x);
        this.state = "view";
        console.log(this.state);
        $("#category-modal").modal();
        console.log(x); //x is array
    }

    rowCount = 0;
    pageCount = 0;

    next(){
        this.option.page++;
        this.displayData();
    }

    prev(){
        this.option.page--;
        this.displayData();
    }

    criteria = '';
    searchVal = '';
    search(){
        if(this.criteria!='' && this.searchVal!=''){
            this.option.criteria.push({criteria:this.criteria, value:this.searchVal});
            this.displayData();
        }
    }

    remove(x){
        //find the index
        let i = this.option.criteria.indexOf(x);
        this.option.criteria.splice(i,1);
        this.displayData();
    }

    displayData(){
        this.service.post("/categories/paging", this.option)
        .subscribe(
            res=>{
                this.data = res['data'].rows;
                this.rowCount = res['data'].rowCount;
                this.pageCount = res['data'].pageCount;
                console.log(this.data);
                console.log("tryin to display data");
            },
            err=>{

            },
            ()=>{}
        )
    }

}