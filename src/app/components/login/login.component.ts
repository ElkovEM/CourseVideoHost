import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TuiButtonModule } from '@taiga-ui/core';
import { TuiInputModule, TuiInputPasswordModule, TuiIslandModule } from '@taiga-ui/kit';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [TuiIslandModule, TuiButtonModule, ReactiveFormsModule, TuiInputModule, TuiInputPasswordModule, HttpClientModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.less'      
})                
export class LoginComponent {
    authForm: FormGroup;
    constructor(                                              
      private router: Router,                 
      private formBuilder: FormBuilder,
      private authService: AuthService
      ) {
        this.authForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
        });                       
    }
    
    loginSuccessful(token: string): void {
      this.authService.saveToken(token);
    }

    onSubmit() {
      if (this.authForm.valid) {
        const username = this.authForm.value.username;
        const password = this.authForm.value.password;
        
        const loginData = {
          username,
          password
        };
        
        this.authService.login(loginData).subscribe(
          (response) => {
            // Обработка успешной аутентификации
            console.log('Успешная аутентификация', response);
            this.loginSuccessful(response.token);
            this.router.navigate(['/items']); 
          },
          (error) => {
            // Обработка ошибки аутентификации
            console.error('Ошибка аутентификации', error);
            alert('НЕПРАВИЛЬНО')
          }
        );
      } else {
        console.log('Форма не валидна');
      }
    }
}