import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { AvatarUploadPage } from './avatar-upload.page';
import { UploadFormComponent } from './upload-form/upload-form.component';

const routes: Routes = [
  {
    path: '',
    component: AvatarUploadPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [AvatarUploadPage, UploadFormComponent]
})
export class AvatarUploadPageModule {}
