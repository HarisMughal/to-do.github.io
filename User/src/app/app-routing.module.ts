import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ToDoPageComponent } from './components/to-do-page/to-do-page.component';
import { AuthGuard } from './guards/auth/auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {path:'Tasks',component: ToDoPageComponent,canActivate : [AuthGuard]},
  
  {
    path: '',
    redirectTo: 'Tasks', 
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: 'Tasks'
  }  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
