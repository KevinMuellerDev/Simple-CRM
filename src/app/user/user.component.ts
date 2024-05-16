import { Component } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCardModule } from '@angular/material/card';
import { DialogAddUserComponent } from '../dialog-add-user/dialog-add-user.component';
import { User } from '../../models/user.class';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatDialogModule,
    MatCardModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {
  user = new User();
  allUsers:any[] =[];

  constructor(public dialog: MatDialog, private firebase: FirebaseService) {}

  liveUserData(){
    this.allUsers = this.firebase.users;
    return this.allUsers
  }

  openDialog() {
    this.dialog.open(DialogAddUserComponent);
  }
}
