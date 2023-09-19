import { Component } from '@angular/core';
import { LoginService } from "../login.service";
import { NgbNavChangeEvent, NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalboxComponent } from '../modalbox/modalbox.component';
@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css'],
    standalone: true,
    imports:[ModalboxComponent,NgbNavModule,],

})
export class HomeComponent {
  fullName: string = '';
    
    constructor(private loginService: LoginService) {}
   
    ngOnInit() {
     this.fullName = this.loginService.getFullName();
   }

}
