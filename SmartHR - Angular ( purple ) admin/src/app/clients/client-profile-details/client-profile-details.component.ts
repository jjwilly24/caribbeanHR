import { Component, OnInit } from '@angular/core';
import { AppService } from 'src/app/app.service';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from 'src/app/api.service';
import { Client } from 'src/app/Models/Client';
import { IMyDpOptions } from 'mydatepicker';
import * as XLSX from 'xlsx';

declare const $: any;

@Component({
  selector: 'app-client-profile-details',
  templateUrl: './client-profile-details.component.html',
  styleUrls: ['./client-profile-details.component.css']
})
export class ClientProfileDetailsComponent implements OnInit {

  public srch = [];
  public updateEmp = [];
  public allEmployees:boolean = true;
  public addEmp:any = {};
  addEmployeeValidation:boolean = false;
  public modules = [];
  public data: any = {};
  public employees: any = [];

  public clientID: number;

  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '38px'
  };

  public viewP:Client;

  constructor(private api: ApiService, private clientService:AppService,private router:Router,private route:ActivatedRoute) {
    //this.rows = clientService.clients;
    //this.srch = [...this.rows];
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {

      if(params.id)
      {

        this.clientID = Number(params.id);

        this.api.getClient(params.id).subscribe(
          next => {
            this.viewP = next;
          }
        );

        this.api.getEmployees(this.clientID).subscribe(next => {
          console.log(next);
          console.log('getEmployees');
          this.employees = next;
        });


        // var id = params.id;
        // const arr = this.rows.find(function(item, i){
        //   return item.clientID == id;
        // });
        // if(!arr)
        // {
        // this.viewP = {};
        // this.router.navigate(['clients/profile/details']);
        // }
        // else
        // {
        // this.viewP.push(arr);
        // this.viewP = this.viewP[0];
        // //console.log(this.viewP);
        // }
      }
      else{
        this.router.navigate(['clients/profile/details']);
      }
   });
  }

  // onEdit(id){
  //   this.router.navigate(['clients/profile/edit'], { queryParams: { 'id': id } });
  // }

  viewEmployee(id){
    console.log(id);
    console.log('viewEmployee');
    this.api.getEmployeesByID(id).subscribe(next => {
      this.router.navigate(['profile']);
      console.log(next);
    });
  };

  onFileChange(evt: any) {
    /* wire up file reader */
    const target: DataTransfer = <DataTransfer>(evt.target);
    if (target.files.length !== 1) throw new Error('Cannot use multiple files');
    const reader: FileReader = new FileReader();

    let workbookkk;
    let XL_row_object;
    let json_object;
    reader.readAsBinaryString(target.files[0]);
    new Promise((resolve, reject) => {
      reader.onload = function(){
        //  alert(reader.result);
        let data = reader.result;
         workbookkk=XLSX.read(data,{type: 'binary'});
         console.log(workbookkk);
         workbookkk.SheetNames.forEach(function(sheetName) {
          // Here is your object
           XL_row_object = XLSX.utils.sheet_to_json(workbookkk.Sheets[sheetName]);

           json_object = JSON.stringify(XL_row_object);

        //  console.log(XL_row_object);
            resolve(json_object);
        });
        };

    }).then((json_object: string) => {

      let data: any = {};
      data.Employee = JSON.parse(json_object);
      data.CompanyID = this.clientID;

      console.log(JSON.stringify(data));
      console.log('onFileChange');

      this.api.batchUpdate(data).subscribe(next => {
        console.log(next);
        console.log("batchUpdate");

        this.employees = next;
      });

      //location.reload();
    });
  }


  addReset(){
    let randomnumber = Math.floor(Math.random() * 99);
    //this.createEmp = {'employeeID':randomnumber};
    //console.log(randomnumber)
    this.addEmp = {
      firstName: '',
      lastName:  '',
      employeeID: randomnumber,
      email: '',
      phone:'',
      company:'',
      designation:'',
      userName:'',
      password:'',
      cPassword:'',
      joinDate:{formatted : ""}
    }
    $('#add_employee').modal('show');
  }

  addSubmit(f)
  {
    if (f.invalid === true)
      this.addEmployeeValidation = true;
    else {
      this.addEmployeeValidation = false;
    //console.log(f.form.value);
    this.employees.unshift(f.form.value);
    this.srch.unshift(f.form.value);
    this.employees = this.employees;
    $('#add_employee').modal('hide');
    }
  }

  onEdit(item){
    this.router.navigate(['employees/all-employees/edit'], { queryParams: { 'id': item.employeeID } });
  }

  onDelete(id){
    //console.log("="+id+"=");
    var index = this.employees.findIndex(function(item, i){
      return item.employeeID === id
    });

    //console.log(index);
    if (index > -1) {
        this.employees.splice(index, 1);
        this.srch.splice(index, 1);
    }
    //console.log(this.rows);
    this.employees = this.employees;
  }

  searchID(val) {
    //console.log(val);
    val = val.toString();
    //console.log(this.srch);
    this.employees.splice(0, this.employees.length);
    //console.log(this.rows);
    let temp = this.srch.filter(function(d) {
      //console.log(d.employeeID);
      d.employeeID = d.employeeID.toString();
      return d.employeeID.toLowerCase().indexOf(val) !== -1 || !val;
    });
    //console.log(temp);
    this.employees.push(...temp);
    //console.log(this.rows);
  }

  searchName(val) {
    //console.log(val);
    //console.log(this.srch);
    this.employees.splice(0, this.employees.length);
    //console.log(this.rows);
    let temp = this.srch.filter(function(d) {
      //console.log(d.userName);
      val = val.toLowerCase();
      return d.userName.toLowerCase().indexOf(val) !== -1 || !val;
    });
    //console.log(temp);
    this.employees.push(...temp);
    //console.log(this.rows);
  }

  searchDesg(val) {
    //console.log(val);
    //console.log(this.srch);
    this.employees.splice(0, this.employees.length);
    //console.log(this.rows);
    let temp = this.srch.filter(function(d) {
      //console.log(d.designation);
      val = val.toLowerCase();
      return d.designation.toLowerCase().indexOf(val) !== -1 || !val;
    });
    //console.log(temp);
    this.employees.push(...temp);
    //console.log(this.rows);
  }

}
