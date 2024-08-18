import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { jwtDecode } from 'jwt-decode'; 
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

  getDecodedToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (Error) {
      return null;
    }
  }
  // Gets token from local storage, I'll generate one for the demo and seed it into localStorage
  isAdmin(): boolean {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkFkbWluIFVzZXIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MjM5ODk4NzUsImV4cCI6MTcyMzk5MzQ3NX0.dBHr9amVPE9SDexosQxnllV5Ux_WKNkl9kDEYZ48XaM"// localStorage.getItem('authToken');
    if (token) {
      const decodedToken = this.getDecodedToken(token);
      // Ensures the token exists and has an admin role
      return decodedToken && decodedToken.role === 'admin';
    }
    return false;
  }

  onLogin() {
    const localUsers = localStorage.getItem('users')

    if (localUsers != null) {
      const users = JSON.parse(localUsers)
      
      const isUserPresent = users.find( (user:SignUpModel) => user.email == this.loginObj.email && user.password == this.loginObj.password)
      if (isUserPresent != undefined) {
        alert("User Found!");
        localStorage.setItem('loggedUser', JSON.stringify(isUserPresent));
        if(this.isAdmin()) {
          this.router.navigateByUrl('/dashboard');
        } else {
          alert("You are not an admin!");
        }
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
