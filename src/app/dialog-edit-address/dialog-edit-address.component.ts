import { Component, inject } from '@angular/core';
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
import { User } from '../../models/user.class';
import { FirebaseService } from '../shared/services/firebase.service';
import { UserData } from '../interfaces/user.interface';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
@Component({
  selector: 'app-dialog-edit-address',
  standalone: true,
  imports: [MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatDatepickerModule,
    MatProgressBarModule],
    providers: [
      provideNativeDateAdapter(),
      { provide: MAT_DATE_LOCALE, useValue: 'de' }
    ],
  templateUrl: './dialog-edit-address.component.html',
  styleUrl: './dialog-edit-address.component.scss'
})
export class DialogEditAddressComponent {
  loading: boolean = false;
  user!: User;
  userId!: String;
  birthDate!: Date;
  firebaseService = inject(FirebaseService);

  ngOnInit(): void {
    this.user.birthDate == undefined ? '' : this.birthDate = new Date(this.user.birthDate);
  }

  async saveUser() {
    this.loading = true;
    this.birthDate == undefined ? '' : this.user.birthDate = this.birthDate.getTime();
    await this.firebaseService.updateUser(this.userId, this.user.toJson());
    this.loading = false;
  }

}
