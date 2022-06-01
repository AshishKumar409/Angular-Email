import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from './auth/auth.guard'

let inboxModule = async ()=>{
  let m = await import('./inbox/inbox.module')
  return m.InboxModule
}


const routes: Routes = [{
  path:'inbox',
  canLoad:[AuthGuard],
  loadChildren:inboxModule
}];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
