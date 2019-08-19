import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VaultEncryptComponent } from './components/vault-encrypt/vault-encrypt.component'
import { VaultPasswordManagementComponent } from './components/vault-password-management/vault-password-management.component'
import { AddApplicationComponent } from './components/add-application/add-application.component'
import { AlterApplicationComponent} from './components/alter-application/alter-application.component'
const routes: Routes = [
  {
    path: 'vaultEncrypt',
    component: VaultEncryptComponent,
    data: { title: 'Vault Encrypt' }
  },
  {
    path: 'vaultPassword',
    component: VaultPasswordManagementComponent,
    data: { title: 'Vault Password Management' }
  },
  {
    path: 'addApplication',
    component: AddApplicationComponent,
    data: { title: 'Add Application' }
  },
  {
    path: 'alterApplication',
    component: AlterApplicationComponent,
    data: { title: 'Alter Application' }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
