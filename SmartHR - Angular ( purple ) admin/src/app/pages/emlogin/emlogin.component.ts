import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/api.service';

@Component({
  selector: 'app-emlogin',
  templateUrl: './emlogin.component.html',
  styleUrls: ['./emlogin.component.css']
})
export class EmloginComponent implements OnInit {

  data: any = {};

  constructor(private api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  onSubmit() {
    this.api.emlogin(this.data.email, this.data.password).subscribe(
      next => {
        console.log(next);
        if (next.token != null){
          localStorage.setItem("token", next.token);
          localStorage.setItem("user", JSON.stringify(next.user));
          localStorage.setItem("type", "employee");
          this.router.navigate(['dashboard']);
        }
      }
    );
  }

}
