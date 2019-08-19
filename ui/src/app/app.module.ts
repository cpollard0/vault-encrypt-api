import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { VaultEncryptComponent } from './components/vault-encrypt/vault-encrypt.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NavigationComponent } from './components/navigation/navigation.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared.module';
import { VaultPasswordManagementComponent } from './components/vault-password-management/vault-password-management.component';

import { GetApplicationEnvironmentsComponent } from './components/get-application-environments/get-application-environments.component';
import { GetApplicationListComponent } from './components/get-application-list/get-application-list.component';
import { AddApplicationComponent } from './components/add-application/add-application.component';
import { AlterApplicationComponent } from './components/alter-application/alter-application.component';
import { GenerateVaultedIamKeysComponent } from './generate-vaulted-iam-keys/generate-vaulted-iam-keys.component';


@NgModule({
  declarations: [
    AppComponent,
    VaultEncryptComponent,
    GetApplicationListComponent,
    NavigationComponent,
    VaultPasswordManagementComponent,
    GetApplicationEnvironmentsComponent,
    AddApplicationComponent,
    AlterApplicationComponent,
    GenerateVaultedIamKeysComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
