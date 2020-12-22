import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(private fb: FormBuilder, private router: Router
  ) { }

  ngOnInit() {

    this.formLogin = this.fb.group({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }


  login() {
    console.log(this.formLogin.controls);

    localStorage.setItem('email', this.formLogin.controls.email.value);
    this.router.navigate(["/homePage"]);

  }

}
