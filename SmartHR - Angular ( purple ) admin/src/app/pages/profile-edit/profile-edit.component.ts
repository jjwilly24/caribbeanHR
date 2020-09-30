import { Component, OnInit, ElementRef } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Address } from 'src/app/Models/Address';
import { Bank } from 'src/app/Models/Bank';
import { Client } from 'src/app/Models/Client';
import { DatePipe } from '@angular/common'


import { NgxGalleryOptions, NgxGalleryImage, NgxGalleryAnimation } from 'ngx-gallery';
import { Router } from '@angular/router';
import { isNumber } from 'util';
import { Econtact } from 'src/app/Models/Econtact';

declare const $:any;

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  em: Client = {} as any;
  bank: Bank = {} as any;
  econtact1: Econtact = {} as any;
  eaddress: Address = {} as any;
  econtact2: Econtact = {} as any;
  address: Address = {} as any;
  date: any;
  rotationAmount = 0;





  resume: boolean = false;
  trn: boolean = false;
  nis: boolean = false;
  bankDetails: boolean = false;
  id: boolean = false;
  photo: boolean = false;

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  images: Array<any> = [];
  doc: Array<any> = [];
  imageLoader: Array<string> = [];

  imgZoom: boolean = false;
  imgZoomUrl: string = '';
  imgRotation: number = 0;

  constructor(private api: ApiService, private router: Router, public datepipe: DatePipe, private _elementRef : ElementRef) {

  }

  ngOnInit() {



    let u = localStorage.getItem('user');

    let user = JSON.parse(u);

    this.api.getEmployeesByID(user.id).subscribe(next => {

      next.gender = next.gender.toLowerCase();
      this.date = this.datepipe.transform(next.dob, 'dd/MM/yyyy');

      this.em = next;
      this.address = next.address;
      this.bank = next.bank;
      this.econtact1 = next.emergencyContact[0];
      this.eaddress = next.emergencyContact[0].address;
      console.log(this.econtact1);
    });

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
  }

  addImage() {
    $('#upload').modal('show');
  }

  uploadFile(fileInput: any, type: any): void {

    if (fileInput.target.files) {
        var file: any = fileInput.target.files[0];
        this.api.uploadFile(file, type).subscribe(next => {

          console.log(next);
          console.log('uploadFile');

          switch (type) {
            case 'resume':
              this.resume = true;
              break;

            case 'trn':
              this.trn = true;
            break;

            case 'nis':
              this.nis = true;
            break;

            case 'bank':
              this.bankDetails = true;
            break;

            case 'id':
              this.id = true;
            break;

            case 'image':
              this.photo = true;
            break;

            default:
              break;
          }


        });

    }
}

addClient() {

}



saveUploads() {
  location.reload();
}

handleEvent(event: any) {
  console.log(`${event.name} has been clicked on img ${event.imageIndex + 1}`);

  switch (event.name) {
    case 'print':
      console.log('run print logic');
      break;
  }
}

updateProfile() {

  let contact = [];
  this.econtact1.address = this.eaddress;
  contact.push(this.econtact1);

  this.em.bank = this.bank;
  this.em.address = this.address;
  this.em.emergencyContact = contact;
  this.em.dob = this.date;

  if(isNumber(this.bank.accountNumber)) {
    this.api.updateEmployee(this.em).subscribe(next => {
      this.router.navigate(['profile']);
    });
  }else{
    $("#error").modal("show");
  }

}

onImageView(event) {
  if (!event) {
    this.imgZoom = !this.imgZoom;
    this.imgZoomUrl = '';
  } else {
    this.imgZoom = !this.imgZoom;
    this.imgZoomUrl = event.target.currentSrc;
  }
}
rotateImg(args) {
  if (args == 'r') {
    this.imgRotation += 90;
  } else {
    this.imgRotation -= 90;
  }
  this._elementRef.nativeElement.querySelector(`#zoomImg`).style.transform = `rotate(${this.imgRotation}deg)`

}

}
