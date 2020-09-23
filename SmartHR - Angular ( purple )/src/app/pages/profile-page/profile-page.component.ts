import { Component, OnInit, ElementRef } from '@angular/core';
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
  imgZoom: boolean = false;
  imgZoomUrl: string = '';
  imgRotation: number = 0;


  constructor(private api: ApiService, private _elementRef : ElementRef) { }

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

  process() {
    this.user.status = 'submitted';
    this.status = false;
    this.api.updateEmployee(this.user).subscribe(next => {

    });
  }

}
