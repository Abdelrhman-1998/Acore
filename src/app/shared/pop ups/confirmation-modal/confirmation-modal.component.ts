import { Component,OnInit,Inject,ViewEncapsulation, OnDestroy  } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import{MAT_DIALOG_DATA }from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { confirmationModal } from 'src/app/models/confirmation.modal';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-confirmation-modal',
  templateUrl: './confirmation-modal.component.html',
  styleUrls: ['./confirmation-modal.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ConfirmationModalComponent implements OnInit,OnDestroy {
    
    constructor(  @Inject(MAT_DIALOG_DATA) public ModalData: confirmationModal,public dialogRef: MatDialogRef<ConfirmationModalComponent>,private modalService:ModalService ){

    }

    loadingSpinnerStatus:boolean=false;

    ngOnDestroy(): void {
      this.modalService.loadingSpinner.next(false);
    }

    ngOnInit(): void {
      this.modalService.loadingSpinner.subscribe((res)=>{
            this.loadingSpinnerStatus=res;
      })
    }
 
   

}
