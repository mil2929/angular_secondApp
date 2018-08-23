import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerTblHeading } from '../model/customer-th-model';
import { HttpService } from '../service/httpservice';
@Component({
    selector: 'customerlist',
    templateUrl: './customer.component.html',
})
export class CustomerComponent  { 
    constructor(private router: Router, private service: HttpService) {
    }
    data = [];
    customer:CustomerTblHeading;
    refresh = Function;

    columns = [
        {field: "CustomerID", text: "Customer ID"},
        {field: "CompanyName", text: "Company Name"},
        {field: "ContactName", text: "Contact Name"}
    ];

    ngAfterViewInit(){
        this.displayData();
        this.refresh = this.displayData.bind(this);
    }

    rowCount = 0;
    pageCount = 0;

    option = {
        page : 1,
        pageSize : 10,
        criteria : [],
        order : {column: "CustomerID", direction: "ASC"}
    }

    next(){
        this.option.page++
        this.displayData();
    }

    prev(){
        this.option.page--;
        this.displayData();
    }

    direction = false;

    sort(x){
        let order = {
            column : x,
            direction : this.direction ? "ASC" : "DSC"
        };
        this.option.order=order;
        this.direction = !this.direction;
        this.displayData();
    }

    criteria='';
    searchVal='';

    add(){
        this.state="new";
        this.customer = new CustomerTblHeading;
        $("#customer-modal").modal();
    }

    remove(x){
        let i = this.option.criteria.indexOf(x);
        //remove by splicing it
        this.option.criteria.splice(i,1);
        this.displayData();
    }

    search(){
        if(this.criteria!='' && this.searchVal!=''){
            console.log(this.criteria);
            console.log(this.searchVal);
            this.option.criteria.push({criteria : this.criteria, value: this.searchVal});
            this.displayData();
        }
    }

    displayData(){
        this.service.post("/customers/paging", this.option)
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

    state:string;

    private clone(x){
        let str = JSON.stringify(x);
        return JSON.parse(str);
    }

    view(x){
        this.customer = this.clone(x);
        this.state = "view";
        console.log(this.state);
        $("#customer-modal").modal();
        console.log(x); //x is array
        
    }

    edit(x){
        this.customer = this.clone(x);
        this.state = "edit";
        $("#customer-modal").modal();
    }

    delete(x:CustomerTblHeading){
        if(window.confirm("Are you sure to delete this item?")){
            this.service.delete("/customers/"+ x.CustomerID)
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
    }


}