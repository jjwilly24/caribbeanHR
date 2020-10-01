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
 

  ngOnInit() {

  }
  onSubmit() {

    this.api.getUserEmail(this.data.email).subscribe(
      next => {
        if (next.length > 0) {
         // send code to email;
        // this.data.email
        document.getElementById('openSuccessModal').click();
        } else {
          document.getElementById('openFailModal').click();
        }

      }
    );
  }
}

