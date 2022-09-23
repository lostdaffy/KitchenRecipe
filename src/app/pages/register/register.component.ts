import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { UserService } from 'src/app/services/UserService/user.service';
import { Router } from '@angular/router';

import { NgToastService } from 'ng-angular-popup';
import { CustomValidators } from 'src/app/validator/confirmed.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.compose([
      Validators.required,
      Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
    ])),
    cpassword: new FormControl('', Validators.required),

  },
    [CustomValidators.MatchValidator('password', 'cpassword')]
  )

  get passwordMatchError() {
    return (
      this.registerForm.getError('mismatch') &&
      this.registerForm.get('cpassword')?.touched
    );
  }

  get userName() {
    return this.registerForm.get('userName')
  }
  get email() {
    return this.registerForm.get('email')
  }
  get password() {
    return this.registerForm.get('password')
  }
  get cpassword() {
    return this.registerForm.get('cpassword')
  }



  constructor(private _router: Router, private _userService: UserService, private toast: NgToastService) { }

  ngOnInit(): void {
  }
  register() {
    if (!this.registerForm.valid) {

      this.toast.error({ detail: "ERROR", summary: 'Please Enter Your Details', duration: 4000 });
      return;
    }
    this._userService.register(JSON.stringify(this.registerForm.value))

      .subscribe(

        data => {

          this.toast.success({ detail: "REGISTER", summary: 'Register Successfuly', duration: 4000 });

          this._router.navigate(['/login'])
        },

        error => {
          this.toast.error({ detail: "ERROR", summary: 'Please Enter Correct Information', duration: 4000 });
        }
      )

    console.log(JSON.stringify(this.registerForm.value));

  }
}
