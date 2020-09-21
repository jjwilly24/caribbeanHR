import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Client } from 'src/app/Models/Client';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {

  public user: Client = {} as any;
  images: Array<any> = [];
  doc: Array<any> = [];
  imageLoader: Array<string> = [];

  status: boolean = true;

  constructor(private api: ApiService) { }

  ngOnInit() {

    this.api.getFiles().subscribe(next => {

      next.forEach(im => {
        if (im.docType != 'docx' && im.docType != 'doc') {
          this.images.push(im);
        }
      });

      next.forEach(im => {
        if (im.docType == 'docx' || im.docType == 'doc') {
          this.doc.push(im);

        }
      });

    });

    let u = localStorage.getItem('user');

    let user = JSON.parse(u);

    this.api.getEmployeesByID(user.id).subscribe(next => {
      console.log(next);

      if(next.status == 'submitted' || next.status == 'approved'){
        this.status = false;
      }
      this.user = next;
    });

  }

  process() {
    this.user.status = 'submitted';
    this.status = false;
    this.api.updateEmployee(this.user).subscribe(next => {

    });
  }

}
