import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormComponent } from './form/form.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'step1',
    children: [
      {
        path: '',
        component: FormComponent
      },
      {
        path: ':id',
        component: FormComponent
      }
    ]
  },
  {
    path: 'step2',
    children: [
      {
        path: '',
        component: FormComponent
      },
      {
        path: ':id',
        component: FormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
