import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { AppComponent } from './app.component';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private fullName: string = '';
  
  setFullName(name: string) {
    this.fullName = name;
  }
  
  getFullName(): string {
    return this.fullName;
  }
}
