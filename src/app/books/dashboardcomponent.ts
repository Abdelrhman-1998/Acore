import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable, map, startWith } from 'rxjs';
import { BookService } from '../services/book.service';
import { Book } from '../models/book.model';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponet implements OnInit {

  constructor(private bookService:BookService) { }
  
  search = new FormControl('');

  ngOnInit(): void {

    this.getBookByID()
  }

  addBook(book:Book){

    this.bookService.addBook(book).subscribe((res)=>{
      console.log(res)
    })
  }

  getBookByID(){
    this.bookService.getBookByID('-NTFXGOwvmTKsWMReeTD').subscribe((res)=>{
      console.log(res)
    })
  }

  searchBooks(value:string){
    this.bookService.searchBooks('title',value).subscribe((res)=>{
      if(res){
         console.log(res)
      }else{
       this.bookService.searchBooks('author',value).subscribe((res)=>{
          console.log(res)
       })
      }
   })
  }

}
