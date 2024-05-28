import { Component, inject, input } from '@angular/core';
import { User } from '../../models/user.class';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FirebaseService } from '../shared/services/firebase.service';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { Storage, ref, uploadBytesResumable, getDownloadURL } from '@angular/fire/storage';

@Component({
  selector: 'app-dialog-edit-user',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    MatProgressBarModule,
    UserDetailComponent],
  templateUrl: './dialog-edit-user.component.html',
  styleUrl: './dialog-edit-user.component.scss'
})

export class DialogEditUserComponent {
  loading: boolean = false;
  user!: User;
  userId!: String;
  birthDate!: Date;
  files!: FileList;
  fileName!: string | undefined;
  firebaseService = inject(FirebaseService);
  private readonly storage: Storage = inject(Storage);


  async saveUser() {
    this.loading = true;
    await this.uploadFile().then(() => {
      this.birthDate == undefined ? '' : this.user.birthDate = this.birthDate.getTime();
      this.firebaseService.updateUser(this.userId, this.user.toJson());
      this.loading = false;
    });
  }

  onFileSelected(input: HTMLInputElement) {
    if (input.files?.item(0)?.size! > 1048576) {
      this.fileName = "This file exceeds the size of 1024kb !"
      return
    }
    if (!input.files || (input.files && !this.isValid(input))) return
    this.files = input.files;
    this.fileName = this.files.item(0)?.name
  }


  isValid(input: HTMLInputElement) {
    let dataType = input.files?.item(0)?.type
    dataType = dataType?.split('/').pop();
    console.log(input.files?.item(0)?.size!);

    return (dataType === 'jpeg' || dataType === 'jpg' || dataType === 'png' || dataType === 'gif')
  }


  async uploadFile() {
    if (this.files == undefined) return
    for (let i = 0; i < this.files.length; i++) {
      const file = this.files.item(i);
      if (file) {
        const storageRef = ref(this.storage, this.userId + '/' + 'profile');
        await uploadBytesResumable(storageRef, file);
        await getDownloadURL(storageRef).then((url) => {
          this.user.profilePicture = url;
          console.log(this.user.profilePicture);
        })
      }
    }
  }

}
