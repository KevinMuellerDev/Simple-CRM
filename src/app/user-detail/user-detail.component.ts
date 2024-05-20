import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../shared/services/firebase.service';
import { UserData } from '../interfaces/user.interface';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatButtonModule],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {

  userID: any = '';
  userProfile: UserData[] = [];
  

  constructor(private route: ActivatedRoute, private firebase: FirebaseService){}

  ngOnInit(){
    this.route.paramMap.subscribe( paramMap => {
      this.userID = paramMap.get('id');
      console.log('GOT ID:', this.userID);
    });
    this.firebase.getProfileData(this.userID);
  }

  liveProfileData(){
    this.userProfile = this.firebase.profileData
    return this.userProfile;
  }

}
