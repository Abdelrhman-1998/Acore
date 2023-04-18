import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  setKey(key:string,value:any){
    localStorage.setItem(key,JSON.stringify(value));

  }

  removeKey(key:string){
    localStorage.removeItem(key);
  }

  getKey(key:string){
    return JSON.parse( localStorage.getItem(key)!)
  }
  
}
