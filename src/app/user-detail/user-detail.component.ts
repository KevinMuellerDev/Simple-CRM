import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../shared/services/firebase.service';
import { UserData } from '../interfaces/user.interface';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { User } from '../../models/user.class';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule, MatMenuModule, DialogEditUserComponent, DialogEditAddressComponent],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userID: any = '';
  userProfile!: User;
  dataLoaded:boolean = false;

  constructor(private route: ActivatedRoute, private firebase: FirebaseService, private dialog: MatDialog) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userID = paramMap.get('id');
      console.log('GOT ID:', this.userID);
    });
    await this.firebase.getProfileData(this.userID);
    this.liveProfileData();
    this.dataLoaded = true;
  }

  liveProfileData() {
    this.userProfile = this.firebase.profileData[0]
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = this.userProfile
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = this.userProfile
  }

}
