import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { StorageService } from './storage.service';
import { Book } from '../models/book.model';
@Injectable({
  providedIn: 'root'
})
export class BookService {
  host=environment.host;
  constructor(private http:HttpClient,private storageService:StorageService) {

   }

  addBook(book:Book){
    console.log(book)
    return  this.http.post(this.host+'/books.json',book,{
      params:{
        auth:this.storageService.getKey('admin')['idToken']
      }
    })
  }

  editBook(id:string,book:Book){

    return  this.http.put(this.host+'/books/'+id+'.json',book,{
      params:{
        auth:this.storageService.getKey('admin')['idToken']
      }
    })
  }

  getBookByID(id:string){
    return  this.http.get(this.host+'/books/'+id+'.json',{
      params:{
        auth:this.storageService.getKey('admin')['idToken']
      }
    })
  }

  deleteBookByID(id:string){
    return  this.http.delete(this.host+'/books/'+id+'.json',{
      params:{
        auth:this.storageService.getKey('admin')['idToken']
      }
    })
  }

  getAllBooks(){
    return  this.http.get(this.host+'/books.json',{
      params:{
        auth:this.storageService.getKey('admin')['idToken']
      }
    })
  }

  searchBooks(key:string,value:string){
    return  this.http.get(this.host+'/books.json?'+`orderBy="${key}"&equalTo="${value}"`,{
      params:{
        auth:this.storageService.getKey('admin')['idToken'],
      }
    })
  }


}
