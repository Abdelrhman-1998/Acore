import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login/login.component';
import{HttpClientModule} from '@angular/common/http'
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { DashboardComponet } from './books/dashboardcomponent';
import { SidenavComponent } from './shared/sidenav/sidenav.component';
import { AddBookComponent } from './books/add-book/add-book.component';
import {NgxPaginationModule} from 'ngx-pagination'; // <-- import the module
import { ViewBookComponent } from './books/view-book/view-book.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore/'; 
import { ListBooksComponent } from './books/list-books/list-books.component';
import { ConfirmationModalComponent } from './shared/pop ups/confirmation-modal/confirmation-modal.component';
import { MultiSelectChipsComponent } from './shared/multi-select-chips/multi-select-chips.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponet,
    SidenavComponent,
    AddBookComponent,
    ViewBookComponent,
    ListBooksComponent,
    ConfirmationModalComponent,
    MultiSelectChipsComponent,
    EditBookComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
