import { Component, OnInit, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  approved: boolean = false;

  status: boolean = true;

  imgZoom: boolean = false;
  imgZoomUrl: string = '';
  imgRotation: number = 0;

  constructor(private api: ApiService,private route:ActivatedRoute, private _elementRef : ElementRef) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      if(params.id){
        this.api.getEmployeesByID(params.id).subscribe(next => {

          if(next.status == 'submitted' ){
            this.approved = false;
          }else if(next.status == 'approved') {
            this.approved = true;
          }else{
            this.approved = true;
          }
          this.user = next;
        });

        this.api.getFilesAdmin(params.id).subscribe(next => {

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
    });



    let u = localStorage.getItem('user');

    let user = JSON.parse(u);

    // this.api.getEmployeesByID(user.id).subscribe(next => {
    //   console.log(next);

    //   if(next.status == 'submitted' || next.status == 'approved'){
    //     this.status = false;
    //   }
    //   this.user = next;
    // });

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

  approve() {
    this.api.approve(this.user.id).subscribe(next => {
      console.log(next);
      this.approved = true;
    });
  }

  move(direction) {
    console.log(this.user);
    this.api.MoveTo(this.user.id, direction, this.user.companyID).subscribe(next => {
      this.user = next;


      console.log(next);
      this.api.getFilesAdmin(this.user.id).subscribe(next => {

        this.images = [];
        this.doc = [];

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

    });
  }

}
