import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventoryComponent } from './inventory/inventory.component';
import { LogInComponent } from './log-in/log-in.component';
import { ManufacterComponent } from './manufacter/manufacter.component';
import { PurchaseOrderComponent } from './purchase-order/purchase-order.component';
import { RegistrationComponent } from './registration/registration.component';
import { ShipmentComponent } from './shipment/shipment.component';
import { UpdateStatusComponent } from './update-status/update-status.component';

const routes: Routes = [
  {path: 'register', component: RegistrationComponent},
  {path: 'log-in', component: LogInComponent},
  {path: 'purchase-order', component: PurchaseOrderComponent},
  {path: 'shipment', component: ShipmentComponent},
  {path: 'update-status', component: UpdateStatusComponent},
  {path: 'manufacter', component: ManufacterComponent},
  {path: 'distributor', component: PurchaseOrderComponent},
  {path: 'transporter', component: ShipmentComponent},
  {path: 'inventory', component: InventoryComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
