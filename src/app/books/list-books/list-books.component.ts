import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BookService } from 'src/app/services/book.service';
import { Book } from 'src/app/models/book.model';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faEye, faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationModalComponent } from 'src/app/shared/pop ups/confirmation-modal/confirmation-modal.component';
import { ModalService } from 'src/app/services/modal.service';
import { confirmationModal } from 'src/app/models/confirmation.modal';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormControl } from '@angular/forms';
import { Subscription, finalize, map } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-list-books',
  templateUrl: './list-books.component.html',
  styleUrls: ['./list-books.component.scss']
})
export class ListBooksComponent implements OnInit,OnDestroy {

  constructor(private http:HttpClient,private bookService:BookService,public dialog: MatDialog,private modalService:ModalService,private _snackBar: MatSnackBar,private storage:AngularFireStorage ) { }
  
  ngOnDestroy(): void {
    this.subscriptions$.forEach((ele)=>{
      ele.unsubscribe();
    })
  }

  books:Book[]=[];
  filteredBook:Book[]=[];
  bookNotFound:boolean=false;
  subscriptions$:Subscription[]=[];
  paginationOptions:{ itemsPerPage:number, currentPage: number,totalItems:number }={
    itemsPerPage:5,currentPage:1,totalItems:0
  }

  searchPaginationOptions:{itemsPerPage:number, currentPage: number,totalItems:number }={
    itemsPerPage:5,currentPage:1,totalItems:0
  }

  loadingSpinner:boolean=false;
  Icons:IconDefinition[]=[faEye,faPen,faTrash];

  searchValue:FormControl=new FormControl('');

  ngOnInit(): void {
      this.getAllBooks();
  const sub$1= this.searchValue.valueChanges.subscribe((res)=>{
        if(!res){
            this.filteredBook=[];
            this.loadingSpinner=false;
            this.bookNotFound=false;
            this.searchPaginationOptions.totalItems=0;
        }
      })
    this.subscriptions$.push(sub$1)
  } 

  getAllBooks(){
    this.books=[];
    this.bookService.getAllBooks().pipe(map((res) => {
      this.books=this.mapData(res);
    })).subscribe((res)=>{
        
    })
  }


  searchBook(){
    this.loadingSpinner=true;
    this.filteredBook=[];
    this.bookNotFound=false;
    this.searchPaginationOptions.totalItems=0;
    this.bookService.searchBooks('title',this.searchValue.value).pipe(map((res) => {
      const data= this.mapData(res);

      this.filteredBook.push(...data)

      this.searchPaginationOptions.totalItems=this.filteredBook.length      
    }),).subscribe(({
      complete:()=>{
        if(!this.filteredBook.length){
          this.bookService.searchBooks('author',this.searchValue.value).pipe(map((res) => {
            const data= this.mapData(res);
            this.filteredBook.push(...data)
  
          })).subscribe({
            complete:()=>{
              this.searchPaginationOptions.totalItems=this.filteredBook.length
              this.loadingSpinner=false;
      
              if(!this.filteredBook.length){
                this.bookNotFound=true;
              }
            }
          })

        }else{
          this.searchPaginationOptions.totalItems=this.filteredBook.length
          this.loadingSpinner=false;
        }
      }
    }))





  }

  openConfirmDelete(id:string | undefined,index:number,photoRef:string,filter?:string){
      const bookID=id;
      console.log(this.filteredBook,index)
      const ModalData: confirmationModal = {
        title: {
          value: 'Delete Book',
          class: 'text-gray-900 font-bold',
        },
        subtitle: {
          value: 'Are you sure you want to delete this book?',
          class: '',
        },
        actions: [
          {
            value: 'cancel',
            class: 'border-solid border font-bold text-black',
            onClickFn: () => {
              this.dialog.closeAll();

            },
          },
          {
            value: 'Delete',
            class: 'bg-red-700 text-white',
            onClickFn: () => {
                this.modalService.loadingSpinner.next(true);
                if(bookID){
                  this.bookService.deleteBookByID(bookID).subscribe((res)=>{
                      this.modalService.loadingSpinner.next(false);
                      const storageRef= this.storage.ref(photoRef);
                      const sub$2= storageRef.delete().subscribe((res)=>{
                        console.log("deleted form storage")
                      })
                      this.subscriptions$.push(sub$2)
                      
                      this.dialog.closeAll();
                      if(filter){
                        this.filteredBook.splice(index,1);
                        this.filteredBook=this.filteredBook;
                        this.getAllBooks();
                      }else{
                        this.books.splice(index,1);
                        this.books=this.books;
                      }
                    
                      this._snackBar.open('book has been delted','',{
                        panelClass:'loginFailed',
                        horizontalPosition:'right',
                        verticalPosition:'top',
                        duration:2000
                      
                      })
                  })
                }
            },
          },
        ],
      };

        this.dialog.open(ConfirmationModalComponent,{
          data: ModalData,
          panelClass: 'confirmationModal',
        })

     

  }

  onPageChange(e:number){
    // in case of backend pagination send request with page query params and update data
    this.paginationOptions.currentPage=e;
  }
  
  resetFilter(){
    this.bookNotFound=false;
    this.loadingSpinner=false;
    this.filteredBook=[];
    this.searchPaginationOptions.totalItems=0;
  }

  mapData(res:any){
    const data:any[]=[];
    
    if(res){
      const keys=Object.keys(res);
      const values= Object.values(res);
      values.forEach((ele:any,index)=>{
        data.push({
          id:keys[index],
          ...ele
        })
      })
      
    }

    return  data
  }
}
