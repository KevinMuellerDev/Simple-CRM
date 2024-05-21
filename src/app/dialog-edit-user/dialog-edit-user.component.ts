import { Component, inject } from '@angular/core';
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
import { timestamp } from 'rxjs';
import { UserDetailComponent } from '../user-detail/user-detail.component';
import { Router } from '@angular/router';

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
  firebaseService = inject(FirebaseService);

  ngOnInit(): void {}

  async saveUser() {
    this.loading = true;
    this.birthDate == undefined ? '' : this.user.birthDate = this.birthDate.getTime();
    await this.firebaseService.updateUser(this.userId, this.user.toJson());
    this.loading = false;
  }

}
