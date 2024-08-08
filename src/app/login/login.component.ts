import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})

export class LoginComponent {
  showLoginForm: boolean = true;

  signUpObj: SignUpModel = new SignUpModel();
  loginObj: LoginModel = new LoginModel();

  constructor(private router: Router){}

  toggleForm(): void {
    this.showLoginForm = !this.showLoginForm;
  }
  
  onRegister() {
    const localUser = localStorage.getItem('users')

    if(localUser != null) {
      const users = JSON.parse(localUser);
      users.push(this.signUpObj)
      localStorage.setItem('users', JSON.stringify(users))
    } else {
      const users = []
      users.push(this.signUpObj)
      localStorage.setItem('users', JSON.stringify(users))
    }
    alert('You successfully created your account!')
  }

  onLogin() {
    const localUsers = localStorage.getItem('users')

    if (localUsers != null) {
      const users = JSON.parse(localUsers)

      const isUserPresent = users.find( (user:SignUpModel) => user.email == this.loginObj.email && user.password == this.loginObj.password)
      if (isUserPresent != undefined) {
        alert("User Found!");
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        this.router.navigateByUrl('/dashboard');
      } else {
        alert('No User Found.')
      }
    }
  }
}

export class SignUpModel {
  name: string;
  email: string;
  password: string;

  constructor() {
    this.name = "";
    this.email = "";
    this.password = ""
  }
}

export class LoginModel {
  email: string;
  password: string;

  constructor() {
    this.email = "";
    this.password = ""
  }
}
