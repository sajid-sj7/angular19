import { Component, inject } from '@angular/core';
import { IUserModel, User } from '../../model/user.model';
import { FormsModule } from '@angular/forms';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  loginObj : User = new User();

  userSrv = inject(UserService);
router = inject(Router);
  onLogin(){
    debugger;
      this.userSrv.loginUser(this.loginObj).subscribe((res:IUserModel)=>{
        alert("User Found... Navigating inside");
        localStorage.setItem('parkUser',JSON.stringify(res));
        this.userSrv.loggedUserData=res;
        this.router.navigateByUrl("/dashboard");
      },error=>{
        debugger
        alert("Wrong Crendiential.")
      })
  }
}
