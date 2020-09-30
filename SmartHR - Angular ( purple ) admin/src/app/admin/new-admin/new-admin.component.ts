import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Address } from 'src/app/Models/Address';
import { Router } from '@angular/router';
import {NgForm} from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Admin } from 'src/app/Models/Admin';

@Component({
  selector: 'app-new-admin',
  templateUrl: './new-admin.component.html',
  styleUrls: ['./new-admin.component.css']
})
export class NewAdminComponent implements OnInit {

  em: Admin = {} as any;
  test: any
  address: Address = {} as any;
  date: any;
  complete: boolean = false;

  constructor(private api: ApiService, private router: Router, public datepipe: DatePipe) { }

  ngOnInit() {

  }

  addNewAdmin() {
    this.em.address = this.address;
    console.log('foo',this.em);

    // this.api.createAdmin(this.em).subscribe(next => {
    //   console.log('api response',next);
    // });

    this.complete = true;

    this.router.navigate(['admin/all']);
  }

  close() {
    this.complete = false;
  }

}
