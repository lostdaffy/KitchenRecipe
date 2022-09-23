import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { UserService } from 'src/app/services/UserService/user.service';

import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private userService: UserService, private router: Router, private toast: NgToastService) { }

  loginForm = new FormGroup({
    email: new FormControl("", [Validators.required, Validators.email]),
    password: new FormControl("",[Validators.required,Validators.minLength(6)])
  });

  get email() {
    return this.loginForm.get('email')
  }
  get password() {
    return this.loginForm.get('password')
  }

  userLogin() {

    const data = this.loginForm.value;
    if (this.loginForm.valid) {

      this.userService.login(data).subscribe((res) => {
        if (res.success) {
          localStorage.setItem("token", res.token);
          this.loginForm.reset();
          this.toast.success({ detail: "LOGIN", summary: 'Login Successfuly', duration: 4000 });
          this.router.navigate(["Admin-Panel"]);
        }
        else {
          this.toast.error({ detail: "Please Enter Email & Password", duration: 4000 });
          this.loginForm.reset();
        }
      }, err => {
        this.toast.error({ detail: "Wrong Email / Password", duration: 4000 });
        this.loginForm.reset();
      })
    }
    else {
      this.toast.error({ detail: "Please Enter Email & Password", duration: 4000 });
    }
  }

  ngOnInit() {

  }

}
