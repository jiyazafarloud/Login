import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormsModule, ReactiveFormsModule, FormBuilder } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { HttpClient } from "@angular/common/http";
import { HttpClientModule } from '@angular/common/http';
import { LoginService } from "../login.service";
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { NgToastModule } from 'ng-angular-popup';
import { NgToastService } from 'ng-angular-popup';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [FormsModule, ReactiveFormsModule, CommonModule, HttpClientModule,NgToastModule]
})
export class LoginComponent {
  
  username: string = '';
  password: string = '';
   apiUrl = 'https://stcbase.securetech-consultancy.com/userservice/user/login';

  myForm: FormGroup;

  constructor(private http: HttpClient, 
    private loginService: LoginService, 
    private fb: FormBuilder, 
    private router: Router,
    private toast: NgToastService,
    ) 
  {
    this.myForm = new FormGroup({
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  
  onSubmit() {
    const name = this.myForm.get('username')?.value;
    const password = this.myForm.get('password')?.value;
    
    if (name && password) {
      this.http.post(this.apiUrl, {
        userName: name,
        password: password,
        applicationId: '310'
      }).subscribe({
      next: (responseData: any) => {
        console.log('API Response:', responseData);

        if (responseData.data && Array.isArray(responseData.data) && responseData.data.length > 0) {
          const user = responseData.data[0];
          const fullName = user.fullName;
          this.loginService.setFullName(fullName); 
          this.router.navigate(['/home']);
        }
        else{
          (this.username=='' && this.password=='')
          {
            this.toast.error({detail:"ERROR",summary:'Login Failed,Please retry.',sticky:true});
            // toast.error('please enter valid credential');         

          }
        }
      },
      
      });
    }
  }

}
