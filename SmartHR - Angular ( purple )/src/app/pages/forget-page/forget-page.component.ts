import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-forget-page',
  templateUrl: './forget-page.component.html',
  styleUrls: ['./forget-page.component.css']
})
export class ForgetPageComponent implements OnInit {

  constructor(private api: ApiService, private router: Router) { }

  data: any = {};
  successH; successB; failureH; failureB;

  ngOnInit() {

  }
  onSubmit() {

    this.api.getUserEmail(this.data.email).subscribe(
      next => {
        if (next.length > 0) {
         // send code to email;
        // this.data.email
        this.successH = true;
        this.successB = true;
        this.failureH = false;
        this.failureB = false;
        document.getElementById('openUpModal').click();
        } else {
          this.successH = false;
          this.successB = false;
          this.failureH = true;
          this.failureB = true;
          document.getElementById('openUpModal').click();
        }

      }
    );
  }
}

