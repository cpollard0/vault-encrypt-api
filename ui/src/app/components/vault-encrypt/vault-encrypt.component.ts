import { Component, OnInit } from '@angular/core';
import { APIService } from './../../services/api.service'
import { FormControl, FormGroup } from '@angular/forms';
import { GetApplicationListComponent } from '../get-application-list/get-application-list.component'
import { GetApplicationEnvironmentsComponent } from '../get-application-environments/get-application-environments.component'

@Component({
  selector: 'app-vault-encrypt',
  templateUrl: './vault-encrypt.component.html',
  styleUrls: ['./vault-encrypt.component.css']
})
export class VaultEncryptComponent implements OnInit {
  applicationControl = new FormControl('');
  environmentControl = new FormControl('');
  encryptSecretControl = new FormControl('');
  encryptSecretConfirmControl = new FormControl('');
  componentControl = new FormControl('');

  vault_secret: string;
  application_list: any;
  environment_list: any;
  constructor(private apiService: APIService) { }

  ngOnInit() {
    this.getApplicationList();
  }

  async getApplicationList(){
    const api_results = this.apiService.GetApplicationList().subscribe
    (
      data=> {
        console.log(data);
        this.application_list = data.body;
      }
    );
  }

  async GetEnvironmentsForApplication(application_name)
  {
     this.apiService.GetEnvironmentsForApplication(application_name).subscribe
     (
       data=> {
         this.environment_list = data.body;
       }
    );
   }

   applicationChanged()
   {
     this.GetEnvironmentsForApplication(this.applicationControl.value);
   }

  async vaultEncryptSecret(){
    if (this.validateSecretMatch())
    {
      this.apiService.VaultEncryptSecret(this.encryptSecretControl.value, this.applicationControl.value, this.environmentControl.value).subscribe
      (
        data=> {
          this.vault_secret = atob(data.body.secret);
        }
      );
    }
  }

  validateSecretMatch()
  {
    if (this.encryptSecretControl.value == this.encryptSecretConfirmControl.value){
      return true;
    }
    else{
      alert("Secrets don't match");
      return false;
    }
  }

}
