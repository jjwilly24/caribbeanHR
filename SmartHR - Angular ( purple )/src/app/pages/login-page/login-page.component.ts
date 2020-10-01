import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  data: any = {};

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.api.emlogin(this.data.email, this.data.password).subscribe(
      next => {
        console.log(next);
        if (next.token != null){
          localStorage.setItem("type", "admin");
          localStorage.setItem("token", next.token);
          localStorage.setItem("user", JSON.stringify(next.user));

          this.router.navigate(['dashboard']);
        }
      }
    );
  }

}
