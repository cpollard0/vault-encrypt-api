import { Component, OnInit } from '@angular/core';
import { APIService } from './../../services/api.service'
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-get-application-list',
  templateUrl: './get-application-list.component.html',
  styleUrls: ['./get-application-list.component.css']
})
export class GetApplicationListComponent implements OnInit {

  application_list: any;
  environment_list: any;
  applicationControl = new FormControl('');
  environmentControl = new FormControl('');

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
         console.log(data);
         this.environment_list = data.body;
       }
    );
   }

   applicationChanged()
   {
     console.log(this.applicationControl.value);
     this.GetEnvironmentsForApplication(this.applicationControl.value);
   }
}
