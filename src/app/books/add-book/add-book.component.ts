import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { BehaviorSubject } from 'rxjs';

import { BookService } from 'src/app/services/book.service';
import { UploadFileService } from 'src/app/services/upload-file.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit,OnDestroy {
  coverImage:string='';
  photoIsRequired:boolean=false;

  bookID:string='';
  fileRef:string='';
  startCategoryData:string[]=[];

  @Input()headerTitle:string='Add Book';
  @Input()edit:boolean=false;

  Icons:IconDefinition[]=[faBookmark]
  booksVersions:string[]=[
    'V1.2',
    'V2.4',
    'V3.4',
    'V5.6'
  ]

  constructor( private uploadFile:UploadFileService,private _snackbar:MatSnackBar,private bookService:BookService,private router:Router,private activeRoute:ActivatedRoute) { }
  ngOnDestroy(): void {

  }
  
  BookForm= new FormGroup({
    'title':new FormControl('',[Validators.required]),
    'author':new FormControl('',[Validators.required]),
    'category':new FormControl([],[Validators.required]),
    'price':new FormControl('',[Validators.required,Validators.pattern(/^[0-9]+$/),Validators.maxLength(2)]),
    'version':new FormControl('',[Validators.required]),
    'ISBN':new FormControl('',[Validators.required,Validators.pattern(/^[\d-]{10,13}$/)]),
    'photo':new FormControl('',Validators.required),
    'brief':new FormControl('',[Validators.required,Validators.maxLength(800)]),
    'olderVersions':new FormControl([]),
    'releaseDate':new FormControl(''),
    'edition':new FormControl('')
  })

  categories:string[]=[
    'Action and Adventure',
    'Classics',
    'Comic Book or Graphic Novel',
    'Detective and Mystery',
    'Fantasy',
    'Historical Fiction',
    'Horror',
    'Literary Fiction',
 ]

  ngOnInit(): void {
    const ID=this.activeRoute.snapshot.params['id'] 
    if(this.activeRoute.snapshot.params['id']){
        this.edit=true;
        this.bookID=ID;
        this.getBookdetails();
    }

  }

  onUploadFile(e:any){
    this.uploadFile.uploadFile(e.target.files[0]).then((res)=>{
      console.log(res)
        this.coverImage=res.downloadUrl;
        this.fileRef=res.filePath;
        this.BookForm.controls['photo'].setValue(this.coverImage);
        this._snackbar.open('file has been uploaded','',{duration:2000,horizontalPosition:'right',verticalPosition:'top'})
    }).catch((err)=>{
      this._snackbar.open('failed to upload File','',{duration:2000,horizontalPosition:'right',verticalPosition:'top'})
    })
    
  }

  createBook(){
    if(this.BookForm.controls['photo'].invalid){
      this.photoIsRequired=true;
    }

    if(this.BookForm.valid){
      // define add or edit 
      let  formValue:{[key:string]:any}={...this.BookForm.value};
      formValue={
        'photoRef':this.fileRef,
        ...formValue
      }
      if(this.edit){
          this.editBook(formValue)
     
      }else{
          this.addBook(formValue)
      }

    }
  }
  
  browsefile(ele:HTMLElement){
    ele.click();
  }


  storeCategory(e:any){
    this.BookForm.controls['category'].setValue(e)   
  }

  getBookdetails(){
    this.bookService.getBookByID(this.bookID).subscribe((res:any)=>{
      const keys= Object.keys(res);
      const controls = this.BookForm.controls as any
      keys.forEach((ele:any)=>{
        if(ele==='photoRef'){
          this.fileRef=res[ele];
        }
        if(ele==='category'){
          this.startCategoryData=res[ele]
        }
         controls[ele]?.setValue(res[ele]);
      })
      console.log(this.BookForm.value)
    })  
  }

  editBook(formValue:{[key:string]:any}){
    this.bookService.editBook(this.bookID,formValue as any).subscribe((res)=>{
      this._snackbar.open('book has been edited successfuly','',{
        duration:2000,
        horizontalPosition:"right",
        verticalPosition:"top",
      })
      this.router.navigate(['/dashboard/books',this.bookID]);
   })
  }

  addBook(formValue:{[key:string]:any}){
    this.bookService.addBook(formValue as any).subscribe((res)=>{
      this._snackbar.open('book has been added successfuly','',{
        duration:2000,
        horizontalPosition:"right",
        verticalPosition:"top"
      })
      this.router.navigate(['/dashboard/books']);
    })
  }
  
}
