import { Component, OnInit,ElementRef, ViewChild,Input,Output, EventEmitter } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {FormControl,FormGroup,Validators} from '@angular/forms';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import {MatChipInputEvent} from '@angular/material/chips';
import {BehaviorSubject, Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-multi-select-chips',
  templateUrl: './multi-select-chips.component.html',
  styleUrls: ['./multi-select-chips.component.scss']
})
export class MultiSelectChipsComponent implements OnInit {
  @Input()form!:FormGroup;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  @Input()dataCtrl = new FormControl('',Validators.required);
  filteredData!: Observable<string[]>;

  @Input()startData: string[] =[];
  @Input()allData: string[]=[];
  @Input()label:string='';
  @Input()panelClass:string='';
  @Input()chipPlaceholder: string='New data ...';
  @ViewChild('dataInput') dataInput!: ElementRef<HTMLInputElement>;
  @Output()onDataChanged:EventEmitter<string[]>= new EventEmitter<string[]>();
  constructor() { 
    this.filteredData = this.dataCtrl.valueChanges.pipe(
      startWith(null),
      map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allData.slice())),
    );
  }

  ngOnInit(): void {
    
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our fruit
    if (value && !this.startData.includes(value)) {
 
      this.startData.push(value);
    
      this.onDataChanged.emit(this.startData);
    }

    // Clear the input value
    event.chipInput!.clear();

    this.dataCtrl.setValue(null);
  }

  remove(fruit: string): void {
    const index = this.startData.indexOf(fruit);

    if (index >= 0) {
      this.startData.splice(index, 1);
   
      this.onDataChanged.emit(this.startData);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    if(!this.startData.includes(event.option.viewValue)){
      this.startData.push(event.option.viewValue);
      this.onDataChanged.emit(this.startData);

    }
 
    this.dataInput.nativeElement.value = '';
    this.dataCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allData.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }


}
