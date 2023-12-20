import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { ItemsComponent } from './components/items/items.component';
import { ItemdetailComponent } from './components/itemdetail/itemdetail.component';
import { UploadComponent } from './components/upload/upload.component';

export const routes: Routes = [
    {path:'', component: LoginComponent},
    {path: 'items', component: ItemsComponent },
    {path: 'items/:id', component: ItemdetailComponent},
    {path: 'upload', component: UploadComponent}
];
