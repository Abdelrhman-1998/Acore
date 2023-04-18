import { Component, OnInit,OnDestroy } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Subscription, take } from 'rxjs';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit,OnDestroy {

  hidePassword:boolean=true;
  showSpinner:boolean=false;
  subscriptions:Subscription[]=[];
  passswordValidations:string[]=[
    'Password must contain the following:',
    '-at least one lowercase letter',
    '-at least on upper case letter',
    '-at least one number',
    '-at least one special character',
    '-minimum length 8 chars',
    '-maximum length 16 chars'
  ]

  constructor(private authService:AuthService,private storageService:StorageService) { }
  ngOnDestroy(): void {
      this.subscriptions.forEach((ele)=>{
        ele.unsubscribe()
      })
  }

  loginForm:FormGroup=new FormGroup({
    'email':new FormControl(null,[Validators.required,Validators.email]),
    'password':new FormControl(null,[Validators.required,Validators.pattern(/^(?=.*[0-9])(?=.*[\p{Ll}\p{M}])(?=.*[\p{Lu}\p{M}])(?=.*\W)(?!.* ).{8,16}$/u)])
  })

  login(){
    if(this.loginForm.valid){
      this.authService.loginSpinner.next(true);
      this.authService.login(this.loginForm.controls['email'].value,this.loginForm.controls['password'].value);
    }
  }


  togglePassword(){
    this.hidePassword=!this.hidePassword;
  }

  ngOnInit(): void {
   const onLogin$=  this.authService.loginSpinner.subscribe((res)=>{
      this.showSpinner=res;
    })
    this.subscriptions.push(onLogin$)
  }



}
