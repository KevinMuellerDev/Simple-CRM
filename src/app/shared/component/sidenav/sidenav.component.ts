import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule, MatSidenavModule, MatToolbarModule, MatIconModule, MatButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {

}
