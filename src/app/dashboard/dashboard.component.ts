import { Component } from '@angular/core';
import { FirebaseService } from '../shared/services/firebase.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {


  constructor(private firebase: FirebaseService){}
}
