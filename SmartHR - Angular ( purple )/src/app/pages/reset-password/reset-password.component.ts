import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
 
  data: any = {};

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }
 
  onSubmit() {
    /*this.api.updateEmployee(this.data.email).subscribe(
      next => {
        console.log(next);
        if (next.token != null){
          localStorage.setItem("type", "admin");
          localStorage.setItem("token", next.token);
          localStorage.setItem("user", JSON.stringify(next.user));

          this.router.navigate(['dashboard']);
        }
      }
    );*/
  }
}
