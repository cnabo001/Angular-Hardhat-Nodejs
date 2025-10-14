import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HeaderComponent } from './header/header.component';
import { LogInComponent } from './log-in/log-in.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { UpdateStatusComponent } from './update-status/update-status.component';
import {HttpClientModule} from '@angular/common/http';
import { ManufacterComponent } from './manufacter/manufacter.component';
import { InventoryComponent } from './inventory/inventory.component';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HeaderComponent,
    LogInComponent,
    PurchaseOrderComponent,
    ShipmentComponent,
    UpdateStatusComponent,
    ManufacterComponent,
    InventoryComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
