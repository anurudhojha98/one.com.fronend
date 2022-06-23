import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Constants } from '../constants';
import { AuthService } from '../services/auth/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  form!: FormGroup;
  constructor(private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router) {
    this.loginForm();
  }

  loginForm() {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20), Validators.pattern('[a-zA-Z0-9]+')]]
    });
  }

  submit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.authService.userLogin(this.form.value).subscribe(
        (res) => {
          if (res.success === true) {
            localStorage.setItem('token', res.token);
            localStorage.setItem('role', res.role);
            this.snackBar.open('User login successfully.', Constants.SNACK_BAR_SUCCESS_MESSAGE_ACTION, {
              duration: Constants.SNACK_BAR_MESSAGE_DURATION,
            });
            this.router.navigate(['/dashboard']);
          }
        },
        (errors) => {
          console.log(errors)
          const err = errors.error.message || 'Invalid input.';
          this.snackBar.open(err, Constants.SNACK_BAR_ERR_MESSAGE_ACTION, {
            duration: Constants.SNACK_BAR_MESSAGE_DURATION,
          });
        },
      );
      // this.form.reset();
    }
  }
}
