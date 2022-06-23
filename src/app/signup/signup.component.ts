import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
interface Role {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  form!: FormGroup;
  roles: Role[] = [
    { value: 'admin', viewValue: 'Admin' },
    { value: 'customer', viewValue: 'Customer' },
    { value: 'seller', viewValue: 'Seller' },
    { value: 'supporter', viewValue: 'Supporter' }
  ];
  constructor(private fb: FormBuilder, 
    private authService: AuthService,
    private router:Router,
    private matSnackeBar:MatSnackBar) {
    this.createForm();
  }
  createForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]+')]],
      role: ['', [Validators.required]]
    });
  }
  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.registerUser(this.form.value).subscribe(res => {
        console.log(res)
        if (res.success) {
          // this.authService.setToken(res.res.token);
          this.router.navigate(['/login']);
          this.matSnackeBar.open("User registered successfully.", "Ok", {
            duration: 3000
          });
        } else {
          this.matSnackeBar.open("User failed to register.", "Ok", {
            duration: 3000
          });
        }
      });
    }
  }
}
