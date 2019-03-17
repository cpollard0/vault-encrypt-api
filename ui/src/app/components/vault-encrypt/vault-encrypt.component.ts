import { Component, OnInit } from '@angular/core';
import { APIService } from './../../services/api.service'
import { FormControl } from '@angular/forms';
import { GetApplicationListComponent } from '../get-application-list/get-application-list.component'
import { GetApplicationEnvironmentsComponent } from '../get-application-environments/get-application-environments.component'

@Component({
  selector: 'app-vault-encrypt',
  templateUrl: './vault-encrypt.component.html',
  styleUrls: ['./vault-encrypt.component.css']
})
export class VaultEncryptComponent implements OnInit {
  encryptSecretControl = new FormControl('');

  vault_secret: string;
  constructor(private apiService: APIService) { }

  ngOnInit() {
  }

  async vaultEncryptSecret(){
    const api_results = this.apiService.VaultEncryptSecret(this.encryptSecretControl.value).subscribe
    (
      data=> {
        console.log(data);
        this.vault_secret = atob(data.body.secret);
      }
    );
  }
}
