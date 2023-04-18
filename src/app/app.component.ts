import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Acore';
  
  constructor (private authService:AuthService,private router:Router,private http:HttpClient){

  }
  ngOnInit(): void {
   this.authService.autoLogin();
    this.authService.isLoggedIn.subscribe((res)=>{
      if(res){
        this.router.navigate(['/dashboard']);
      }
    })
  }

  selectFile(e:any){
    const formData= new FormData();
    console.log(e.target.files[0])
    formData.append("dd","dssdd");
    formData.append("cover",e.target.files[0]);
    this.http.post('http://127.0.0.1:8080/api/books/',formData).subscribe((res)=>{
      console.log(res)
    })
    return formData
  }


}
