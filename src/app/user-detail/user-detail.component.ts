import { Component, SimpleChanges } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../shared/services/firebase.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DialogEditUserComponent } from '../dialog-edit-user/dialog-edit-user.component';
import { DialogEditAddressComponent } from '../dialog-edit-address/dialog-edit-address.component';
import { DialogAddProductComponent } from '../dialog-add-product/dialog-add-product.component';
import { User } from '../../models/user.class';


@Component({
  selector: 'app-user-detail',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    DialogEditUserComponent,
    DialogEditAddressComponent,
    DialogAddProductComponent,
    MatTooltipModule
  ],
  templateUrl: './user-detail.component.html',
  styleUrl: './user-detail.component.scss'
})
export class UserDetailComponent {
  birthDate!: Date;
  dateOfPurchase!:Date;
  fullDate!: string;
  fullPurchaseDate!: string;
  userId: any = '';
  userProfile!: User;
  products: any;
  dataLoaded: boolean = false;
  tempPicture: string = '/assets/img/profile.png';

  constructor(private route: ActivatedRoute, private firebase: FirebaseService, private dialog: MatDialog) { }

  async ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log('GOT ID:', this.userId);
    });
    await this.firebase.getProfileData(this.userId);
    this.liveProfileData();
    this.liveProductData();
    this.getBirthdate();
    this.dataLoaded = true;
  }

  liveProfileData() {
    this.userProfile = this.firebase.profileData[0]
  }

  async liveProductData() {
    await this.firebase.getProductData(this.userId)
    this.products = this.firebase.products;
    console.log(this.products)
    this.getPurchaseDate();
  }

  editUserDetail() {
    const dialog = this.dialog.open(DialogEditUserComponent);
    dialog.componentInstance.user = new User(this.userProfile);
    dialog.componentInstance.userId = this.userId;
    dialog.afterClosed()
      .subscribe(() => {
        setTimeout(() => {
          this.ngOnInit();
        }, 1100);
      });
  }

  editMenu() {
    const dialog = this.dialog.open(DialogEditAddressComponent);
    dialog.componentInstance.user = new User(this.userProfile);
    dialog.componentInstance.userId = this.userId;
    dialog.afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  editBoughtProducts(){
    const dialog = this.dialog.open(DialogAddProductComponent);
    dialog.componentInstance.userId = this.userId;
    dialog.afterClosed()
      .subscribe(() => {
        this.ngOnInit();
      });
  }

  getBirthdate() {
    this.userProfile.birthDate == undefined ? '' : this.birthDate = new Date(this.userProfile.birthDate);
    let dd = this.birthDate.getDate().toString();
    let mm = (this.birthDate.getMonth() + 1).toString();
    let yyyy = this.birthDate.getFullYear().toString();

    Number(dd) < 10 ? dd =  '0' + dd : dd = dd;
    Number(mm) < 10 ? mm =  '0' + mm : mm = mm;

    this.fullDate = dd + '.' + mm + '.' + yyyy;
  }

  getPurchaseDate() {
    this.products[0].dateOfPurchase == undefined ? '' : this.dateOfPurchase = new Date(this.products[0].dateOfPurchase);
    let dd = this.dateOfPurchase.getDate().toString();
    let mm = (this.dateOfPurchase.getMonth() + 1).toString();
    let yyyy = this.dateOfPurchase.getFullYear().toString();

    Number(dd) < 10 ? dd =  '0' + dd : dd = dd;
    Number(mm) < 10 ? mm =  '0' + mm : mm = mm;

    this.fullPurchaseDate = dd + '.' + mm + '.' + yyyy;
  }


  ngOnDestroy() {
    this.firebase.ngOnDestroy();
  }
}
