import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';
import { Admin } from 'src/app/Models/Admin';
import { AppService } from 'src/app/app.service';

declare const $: any;

@Component({
  selector: 'app-all-admin',
  templateUrl: './all-admin.component.html',
  styleUrls: ['./all-admin.component.css']
})
export class AllAdminComponent implements OnInit {

  public myDatePickerOptions: IMyDpOptions = {
    todayBtnTxt: 'Today',
    dateFormat: 'dd-mm-yyyy',
    firstDayOfWeek: 'su',
    sunHighlight: true,
    inline: false,
    height: '38px'
  };

  rows = [];
  public updateAdmin = [];
  public createAdmin:any = {};
  public addAdmin:any = {};

  public modules = [];

  public columns:Array<any> = [
    {title: 'FName', name: 'fname', sort: true},
    {title: 'MName', name: 'mname', sort: true},
    {title: 'LName', name: 'lname', sort: true},
    {title: 'ID', name: 'id', sort: true},
    {title: 'Email', name: 'email', sort: true},
    {title: 'Date', name: 'dob', sort: true},
    {title: 'Trn', name: 'trn', sort: true},
    {title: 'Nis', name: 'nis', sort: true},
    {title: 'Contact', name: 'contact', sort: true},
    {title: 'Type', name: 'type', sort: true},
    {title: 'Gender', name: 'gender', sort: true},
    {title: 'Phone', name: 'phone', sort: true},
    {title: 'Address', name: 'address', sort: true},
  ];

  public allAdmin:boolean = true;
  public date: Date = new Date();
  public model: any = {date: {year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate()}};
  public srch = [];

  addAdminValidation:boolean = false;

  constructor(private api: ApiService, private router: Router, private appService:AppService) {
    this.rows = appService.allAdmin;
    this.srch = [...this.rows];
    this.modules = appService.employee_modules;
  }

  ngOnInit() {

    $('.floating').on('focus blur', function (e) {
      $(this).parents('.form-focus').toggleClass('focused', (e.type === 'focus' || this.value.length > 0));
    }).trigger('blur');

  }

  public adminUpt = {};
  public vals = [];

  addReset(){
    this.router.navigate(['admin/new']);
    // let randomnumber = Math.floor(Math.random() * 99);
    // //this.createEmp = {'employeeID':randomnumber};
    // //console.log(randomnumber)
    // this.addAdmin = {
    //   fname: '',
    //   mname:  '',
    //   lname:  '',
    //   id: randomnumber,
    //   email: '',
    //   phone: '',
    //   gender: '',
    //   type: '',
    //   trn: '',
    //   nis: '',
    //   dob: '',
    //   address: '',
    // }
    // $('#add_admin').modal('show');
  }

  addSubmit(f)
  {
    if (f.invalid === true)
      this.addAdminValidation = true;
    else {
      this.addAdminValidation = false;
    //console.log(f.form.value);
    this.rows.unshift(f.form.value);
    this.srch.unshift(f.form.value);
    this.rows = this.rows;
    $('#add_admin').modal('hide');
    }
  }
  //
  onEdit(item){
    this.router.navigate(['admin/edit'], { queryParams: { 'id': item.id } });
  }

  onDelete(id){
    //console.log("="+id+"=");
    var index = this.rows.findIndex(function(item, i){
      return item.id === id
    });

    //console.log(index);
    if (index > -1) {
        this.rows.splice(index, 1);
        this.srch.splice(index, 1);
    }
    //console.log(this.rows);
    this.rows = this.rows;
  }

  searchID(val) {
    console.log(val);
    val = val.toString();
    //console.log(this.srch);
    this.rows.splice(0, this.rows.length);
    //console.log(this.rows);
    let temp = this.srch.filter(function(d) {
      //console.log(d.employeeID);
      d.id = d.id.toString();
      return d.id.toLowerCase().indexOf(val) !== -1 || !val;
    });
    //console.log(temp);
    this.rows.push(...temp);
    //console.log(this.rows);
  }

  searchFname(val) {
    console.log(val);
    //console.log(this.srch);
    this.rows.splice(0, this.rows.length);
    //console.log(this.rows);
    let temp = this.srch.filter(function(d) {
      //console.log(d.userName);
      val = val.toLowerCase();
      return d.fname.toLowerCase().indexOf(val) !== -1 || !val;
    });
    //console.log(temp);
    this.rows.push(...temp);
    //console.log(this.rows);
  }

  searchContact(val) {
    console.log(val);
    //console.log(this.srch);
    this.rows.splice(0, this.rows.length);
    //console.log(this.rows);
    let temp = this.srch.filter(function(d) {
      //console.log(d.userName);
      val = val.toLowerCase();
      return d.contact.toLowerCase().indexOf(val) !== -1 || !val;
    });
    //console.log(temp);
    this.rows.push(...temp);
    //console.log(this.rows);
  }

}
