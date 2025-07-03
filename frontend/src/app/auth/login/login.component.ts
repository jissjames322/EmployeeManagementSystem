import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/services/auth.service';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  //Declare variables
  loginForm!: FormGroup;
  isSubmitted: boolean = false;
  error: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    //Create Reactive Form
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }
  //Get all controls from LoginForm for Validations - Custom Method
  get formControls() {
    return this.loginForm.controls;
  }
  //Functionality
  loginCredentials(): void {
    this.isSubmitted = true;
    if (this.loginForm.invalid) {
      this.error = 'Please enter username and password';
      return;
    }
  
    this.authService.loginVerify(this.loginForm.value).subscribe({
      next: (response) => {
        if (!response || !response.role || !response.data?.Token) {
          this.error = 'Invalid server response';
          return;
        }
        
        // Save user data
        localStorage.setItem('USER_NAME', response.username || '');
        localStorage.setItem('ACCESS_ROLE', String(response.role));
        localStorage.setItem('JWT_TOKEN', response.data.Token);
  
        // Redirect
        if (response.role === 1) {
          this.router.navigate(['employees/list']);
        } else if (response.role === 2) {
          this.router.navigate(['auth/admin']);
        }
      },
      error: (err) => {
        this.error = err.error?.error || 'Login failed';
      }
    });
  }
}
