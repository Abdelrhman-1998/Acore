import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';
import{IconDefinition} from '@fortawesome/fontawesome-common-types'
import { faAngleLeft, faBook } from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  Icons:IconDefinition[]=[faAngleLeft,faBook]
  constructor(private storageService:StorageService,private authService:AuthService) { }
  isOpened:boolean=true;
  addMargin:boolean=false;
  email:string='';
  ngOnInit(): void {
    const admin=this.storageService.getKey('admin')
    if( admin ){
      if(admin.email){
        this.email=admin.email
      }
    }
  
  }

  toggleSideNav(){
    if(!this.isOpened){
      this.addMargin=false;
    }
    this.isOpened=!this.isOpened
  }

  closeSideNav(){
  this.addMargin=true;
  this.isOpened=false;
  }

  logout(){
    this.authService.logout()
  }
}
