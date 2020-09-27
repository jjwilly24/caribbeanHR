import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Address } from 'src/app/Models/Address';
import { Bank } from 'src/app/Models/Bank';
import { Econtact } from 'src/app/Models/Econtact';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css']
})
export class NewAdminComponent implements OnInit {

  em: any = {};
  bank: Bank = {} as any;
  address: Address = {} as any;
  eaddress: Address = {} as any;
  econtact1: Econtact = {} as any;
  date: any;
  complete: boolean = false;
  newAdmin: any = {};

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {

  }

  addNewAdmin(addForm: NgForm) {
    console.log('1:',this.em);
    console.log('2:',this.address.street);

    // api request sucess return admin object, this.newAdmin = admin obj
    this.newAdmin.fname = this.em.fname;
    this.complete = true;
    addForm.reset();
  }

  close() {
    this.complete = false;
  }

}
