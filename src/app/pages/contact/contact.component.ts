import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/UserService/user.service';

import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})

export class ContactComponent implements OnInit {

  contactForm: FormGroup = new FormGroup({
    contactName: new FormControl(null, [Validators.required]),
    contactEmail: new FormControl(null, [Validators.email, Validators.required]),
    query: new FormControl(null, [Validators.required]),
  })


  get contactName() {
    return this.contactForm.get('contactName')
  }


  constructor(private _router: Router, private _userService: UserService, private toast: NgToastService) { }

  ngOnInit(): void {
  }

  contact() {
    if (!this.contactForm.valid) {

      this.toast.error({ detail: "ERROR", summary: 'Please Enter Correct Information', sticky: true });
      console.log('Invalid Details');

      return;
    }
    this._userService.contact(JSON.stringify(this.contactForm.value))

      .subscribe(
        data => {
          this.toast.success({ detail: "SUCCESS", summary: 'Submitted Your Query', duration: 4000 });
          this._router.navigate(['/home'])
        },
        error => {
          this.toast.error({ detail: "ERROR", summary: 'Technical Error Try Again After Some Time', sticky: true });
          console.log(error);
        })

    console.log(JSON.stringify(this.contactForm.value));

  }

}
