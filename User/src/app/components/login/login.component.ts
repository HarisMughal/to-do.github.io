import { AuthService } from '../../services/auth/auth.service';
import { ApiService } from './../../services/api.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // model: Login = { userid: "hsmughal4@gmail.com", password: "12345678" }  
  loginForm: FormGroup;  
  message: string;  
  returnUrl: string; 
  
  constructor(private formBuilder : FormBuilder,  
    private router : Router,  
    private authService : AuthService ,
    private apiService : ApiService) { }

  ngOnInit() {
    this.returnUrl = '/Tasks';  
    if (localStorage.getItem('isLoggedIn') !== null && localStorage.getItem('isLoggedIn') ===  "true") { 
      
      this.router.navigate([this.returnUrl]);
    }else{
      
    
      this.authService.logout();
    }
    this.loginForm = this.formBuilder.group({  
      userid: ['', Validators.required],  
      password: ['', Validators.required] 
    });  
  }

  get f() { return this.loginForm.controls; }  
  login() {  
  
    // stop here if form is invalid  
    if (this.loginForm.invalid) {  
       return;  
    }  
    else {  
      if(this.f.userid.value === '' ||this.f.password.value === ''){
        this.message = "Please complete login credentials";
        alert(this.message);  
      }
       else{
        this.apiService.login({email: this.f.userid.value, password:this.f.password.value}).subscribe(
            (data:any) => {
              console.log(data);
              console.log("Login successful");  
              //this.authService.authLogin(this.model);  
              localStorage.setItem("id",data[0].id); 
              
              localStorage.setItem('isLoggedIn', "true"); 
              this.router.navigate([this.returnUrl]);
            },
            (err) => {
              alert("Invalid Credentials");
            }

        );

       } 
    }  
    }  

}
