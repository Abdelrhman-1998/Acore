import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponet } from './books/dashboardcomponent';
import { AddBookComponent } from './books/add-book/add-book.component';
import { ViewBookComponent } from './books/view-book/view-book.component';
import { ListBooksComponent } from './books/list-books/list-books.component';
import { EditBookComponent } from './books/edit-book/edit-book.component';


const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:'login',component:LoginComponent},
  {path:'dashboard',component:DashboardComponet,canActivate:[AuthGuard],children:[
    {path:'',component:ListBooksComponent,pathMatch:'full'},
    {path:'books',component:ListBooksComponent},
    {path:'books/add',component:AddBookComponent},
    {path:'books/:id',component:ViewBookComponent},
    {path:'books/edit/:id',component:EditBookComponent}, 
  ]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
