import { Component, inject } from '@angular/core';
import {
  MatDialog,
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MAT_DATE_LOCALE, provideNativeDateAdapter } from '@angular/material/core';
import { Product } from '../../models/product.class';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FirebaseService } from '../shared/services/firebase.service';
import { CurrencyMaskModule } from 'ng2-currency-mask';

@Component({
  selector: 'app-dialog-add-product',
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
    CurrencyMaskModule],
  providers: [
    provideNativeDateAdapter(),
    { provide: MAT_DATE_LOCALE, useValue: 'de' }
  ],
  templateUrl: './dialog-add-product.component.html',
  styleUrl: './dialog-add-product.component.scss'
})
export class DialogAddProductComponent {
  loading: boolean = false;
  product = new Product();
  userId!: any;
  dateOfPurchase!:Date;
  firebaseService = inject(FirebaseService);


  saveUserProduct() {
    this.loading = true;
    this.dateOfPurchase == undefined ? '' : this.product.dateOfPurchase = this.dateOfPurchase.getTime();
    this.firebaseService.addProduct(this.userId, this.product.toJson());
    this.loading = false;
  }

}
