import { Component, OnInit,OnDestroy } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { Book } from 'src/app/models/book.model';
import { confirmationModal } from 'src/app/models/confirmation.modal';
import { BookService } from 'src/app/services/book.service';
import { ModalService } from 'src/app/services/modal.service';
import { ConfirmationModalComponent } from 'src/app/shared/pop ups/confirmation-modal/confirmation-modal.component';
@Component({
  selector: 'app-view-book',
  templateUrl: './view-book.component.html',
  styleUrls: ['./view-book.component.scss']
})
export class ViewBookComponent implements OnInit,OnDestroy {
  bookDetails:Book | null =null;
  bookID:string | undefined='';
  photoRef:string | undefined ='';
  Icons:IconDefinition[]=[faBookmark];
  subscriptions$:Subscription[]=[];
  constructor(private storage:AngularFireStorage,private activatedRoute:ActivatedRoute,private bookService:BookService,private dialog:MatDialog,private _snackBar:MatSnackBar,private modalService:ModalService,private router:Router) { }
  ngOnDestroy(): void {
    this.subscriptions$.forEach((ele)=>{
      ele.unsubscribe()
    })
  }

  ngOnInit(): void {
  this.bookID =this.activatedRoute.snapshot.params['id'];

    if( this.bookID){
      this.bookService.getBookByID(this.bookID).subscribe((res:any)=>{
        this.bookDetails=res;
        this.photoRef=this.bookDetails?this.bookDetails['photoRef']:'';
      })
    }
  }
  openConfirmDelete(id:string | undefined,photoRef:string | undefined){
    console.log(id,photoRef)

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
            console.log(id,photoRef)
              this.modalService.loadingSpinner.next(true);
              if(id&&photoRef){
                this.bookService.deleteBookByID(id).subscribe((res)=>{
                    this.modalService.loadingSpinner.next(false);
                    const storageRef= this.storage.ref(photoRef);
                    const sub$2= storageRef.delete().subscribe((res)=>{
                      console.log("deleted form storage")
                    })
                    this.subscriptions$.push(sub$2)
                    
                    this.dialog.closeAll();

                    this._snackBar.open('book has been delted','',{
                      panelClass:'loginFailed',
                      horizontalPosition:'right',
                      verticalPosition:'top',
                      duration:2000
                    })
                    this.router.navigate(['/dashboard/books'])
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

}
