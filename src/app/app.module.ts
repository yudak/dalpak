import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule,MatDialogModule, } from '@angular/material';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
// Import HttpClientModule from @angular/common/http in AppModule
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
//test INTERCEPTOR
import { BringitInterceptor } from './bringit.interceptor';


import { AppComponent } from './app.component';
import { EditMenuComponent } from './edit-menu/edit-menu.component';
import { BordComponent } from './edit-menu/EditMenuComponents/bord/bord.component';
import { ButtonMenuComponent } from './edit-menu/EditMenuComponents/button-menu/button-menu.component';
import { ActionButtonsComponent } from './edit-menu/EditMenuComponents/action-buttons/action-buttons.component';
import { SetupFolderComponent } from './edit-menu/EditMenuComponents/setup-folder/setup-folder.component';
import { SetupItemComponent } from './edit-menu/EditMenuComponents/setup-item/setup-item.component';
import { SetupTosefetComponent } from './edit-menu/EditMenuComponents/setup-tosefet/setup-tosefet.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderBordComponent } from './orders/OrdersComponents/order-bord/order-bord.component';
import { OrderItemViewComponent } from './orders/OrdersComponents/order-item-view/order-item-view.component';
import { OrderSummeryComponent } from './orders/OrdersComponents/order-summery/order-summery.component';


@NgModule({
  declarations: [
    AppComponent,
    EditMenuComponent,
    BordComponent,
    ButtonMenuComponent,
    ActionButtonsComponent,
    SetupFolderComponent,
    SetupItemComponent,
    SetupTosefetComponent,
    OrdersComponent,
    OrderBordComponent,
    OrderItemViewComponent,
    OrderSummeryComponent,
    
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatDialogModule,
    NgbModule.forRoot(),
    HttpClientModule,
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: BringitInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent],
  entryComponents:[]
 
})
export class AppModule { }
